import { useQuery, UseQueryResult } from "react-query";
import { Repository } from "../../../types/Types";
import { searchRepositories, starRepository, unstarRepository } from "../apis/reposApis";
import { useRepoStore } from "../../../stores/useRepositoryStore";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

// Debounced API call function
const fetchRepos = async (keyword: string) => {
  if (keyword) {
    return await searchRepositories(keyword); // Call API to search repositories
  }
  return []; // Return an empty array if there is no keyword
};

const useGetRepos = (keyword: string = "", limit = 10) => {
  const { repositories, setRepositories, toggleStar, starredRepos } = useRepoStore();
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  // Update debounced keyword after user stops typing
  const debouncedSearch = debounce((search: string) => {
    setDebouncedKeyword(search);
  }, 200); // Debounce time set to 200ms (0.5 second)

  // Update state only after a delay
  useEffect(() => {
    debouncedSearch(keyword);
    return () => {
      debouncedSearch.cancel(); // Cleanup debounce on unmount
    };
  }, [keyword, debouncedSearch]);

  const {
    data,
    isLoading,
    isError,
  }: UseQueryResult<Repository[], Error> = useQuery<Repository[], Error>(
    ["repos", { debouncedKeyword, limit }],
    () => fetchRepos(debouncedKeyword),  // Use debounced keyword for API call
    {
      enabled: !!debouncedKeyword, // Only enable the query if there is a keyword
      onSuccess: (data) => {
        setRepositories(data); // Update Zustand state with fetched repositories
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 2000,
      retry: false, // Disable retry on error
    }
  );

  // Handle star/unstar for a repository
  const handleStar = async (repo: Repository) => {
    const isRepoStarred = starredRepos.has(repo.full_name);

    try {
      if (isRepoStarred) {
        await unstarRepository(repo.owner.login, repo.name); // Unstar repo if already starred
      } else {
        await starRepository(repo.owner.login, repo.name); // Star the repo if not starred
      }

      // Toggle the local starred state using Zustand
      toggleStar(repo);

      // Optionally update local star count (if needed)
    } catch (error) {
      console.error("Error handling star/unstar:", error);
    }
  };

  return {
    reposData: repositories || data,
    isLoading,
    isError,
    handleStar,  // Function to toggle star status
  };
};

export default useGetRepos;
