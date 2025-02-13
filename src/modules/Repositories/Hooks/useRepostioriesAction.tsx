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
  const [loadingRepoId, setLoadingRepoId] = useState<number | null>(null);
  const debouncedSearch = debounce((search: string) => {
    setDebouncedKeyword(search);
  }, 200);

  useEffect(() => {
    debouncedSearch(keyword);
    return () => {
      debouncedSearch.cancel(); 
    };
  }, [keyword, debouncedSearch]);

  useEffect(() => {
    if (!debouncedKeyword) {
      setRepositories([]); 
    }
  }, [debouncedKeyword, setRepositories]);

  // This handles the data fetching part and its loading state.
  const { data, isLoading: isQueryLoading, isError, isFetching }: UseQueryResult<Repository[], Error> =
    useQuery<Repository[], Error>(
      ["repos", { debouncedKeyword, limit }],
      () => fetchRepos(debouncedKeyword),
      {
        enabled: !!debouncedKeyword, 
        onSuccess: (data) => {
          if (debouncedKeyword) {
            setRepositories(data); 
          }
        },
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        staleTime: 2000,
        retry: false,
        onSettled: () => {
        },
      }
    );

  const handleStar = async (repo: Repository) => {
    const isRepoStarred = starredRepos.has(repo.full_name);
    setLoadingRepoId(repo.id)
    try {
      if (isRepoStarred) {
        await unstarRepository(repo.owner.login, repo.name);
      } else {
        await starRepository(repo.owner.login, repo.name);
      }

      toggleStar(repo); 
    } catch (error) {
      console.error("Error handling star/unstar:", error);
    } finally {
      setLoadingRepoId(null);
    }
  };


  return {
    reposData: repositories || data, 
    isLoading: isQueryLoading || isFetching, 
    loadingRepoId, 
    isError,
    handleStar,
  };
};

export default useRepositoriesAction;
