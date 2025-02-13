import { useQuery, UseQueryResult } from "react-query";
import { Repository } from "../../../types/Types";
import { useRepoStore } from "../../../stores/useRepositoryStore";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import {
  searchRepositories,
  starRepository,
  unstarRepository,
} from "../Services/reposApis";

const fetchRepos = async (keyword: string) => {
  if (keyword) {
    return await searchRepositories(keyword); 
  }
  return []; 
};

const useRepositoriesAction = (keyword: string = "", limit = 10) => {
  const { repositories, setRepositories, toggleStar, starredRepos } =
    useRepoStore();
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  const debouncedSearch = debounce((search: string) => {
    setDebouncedKeyword(search);
  }, 200); 

  useEffect(() => {
    debouncedSearch(keyword);
    return () => {
      debouncedSearch.cancel(); // Cleanup debounce on unmount
    };
  }, [keyword, debouncedSearch]);

  const { data, isLoading, isError }: UseQueryResult<Repository[], Error> =
    useQuery<Repository[], Error>(
      ["repos", { debouncedKeyword, limit }],
      () => fetchRepos(debouncedKeyword), 
      {
        enabled: !!debouncedKeyword, 
        onSuccess: (data) => {
          setRepositories(data); 
        },
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        staleTime: 2000,
        retry: false,
      }
    );

  const handleStar = async (repo: Repository) => {
    const isRepoStarred = starredRepos.has(repo.full_name);

    try {
      if (isRepoStarred) {
        await unstarRepository(repo.owner.login, repo.name); 
      } else {
        await starRepository(repo.owner.login, repo.name); 
      }

      toggleStar(repo);

    } catch (error) {
      console.error("Error handling star/unstar:", error);
    }
  };

  return {
    reposData: repositories || data,
    isLoading,
    isError,
    handleStar, 
  };
};

export default useRepositoriesAction;
