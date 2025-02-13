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
  //this hook responsible for reposirories action (search , star & unstar) 
  const { repositories, setRepositories, toggleStar, starredRepos } =
    useRepoStore();
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const [loadingRepoId, setLoadingRepoId] = useState<number | null>(null);
  //check req here only for ui purpose to made sure user excute call after the debounce 
  const[isCheckReq , setIsCheckReq]=useState(true)

  //debounce for search value
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
    //reset the value when user empty the search
    if (!debouncedKeyword) {
      //reset the check req
      setIsCheckReq(true)
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
          //confirm the req is finished
          setIsCheckReq(false)
        },
      }
    );


  const handleStar = async (repo: Repository) => {
    const isRepoStarred = starredRepos.has(repo.full_name);
    //to target the repo tha user star/unstar with
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
    isCheckReq , 
    setIsCheckReq,
    handleStar,
  };
};

export default useRepositoriesAction;
