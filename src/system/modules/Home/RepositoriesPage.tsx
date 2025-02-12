import { useState, useCallback, useMemo } from "react";
import SearchField from "../../shared/SearchField/SearchField";
import { Repository } from "../../types/Types";
import RepoCard from "./components/RepoCard/RepoCard";
import useGetRepos from "./services/useGetRepos";
import "./styles.css";
import EmptyRepositories from "./components/EmptyRepositories/EmptyRepositories";
import LoadingStatePage from "../../shared/LoadingState/LoadingState";
import ErrorStatePage from "../../shared/ErrorState/ErrorState";

function RepositoriesPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Custom hook to get repositories, loading state, and error state
  const { reposData, isLoading, isError, handleStar } = useGetRepos(searchQuery);

  // Handle search query changes
  const handleSearchChange = useCallback((newSearchValue: string) => {
    setSearchQuery(newSearchValue);
  }, []);

  // Set custom message based on the search query
  const emptyText = useMemo(() => {
    return searchQuery
      ? "No repositories found with this name."
      : "No repositories found.. please search for one.";
  }, [searchQuery]);

  return (
    <div className="repos_page">
      <div className="repos_page_container">
        <div className="repos_page_container__header">
          <SearchField onChange={handleSearchChange} />
        </div>
        <div className="repos_page_container__body">
          {isLoading && <LoadingStatePage />}

          {isError && <ErrorStatePage />}

          {(reposData.length <= 0 || !searchQuery) && !isLoading && !isError && (
            <EmptyRepositories text={emptyText} key={"handleEmpty"} />
          )}

          {!isLoading && !isError && searchQuery && reposData.length > 0 && 
            reposData.map((repo: Repository) => (
              <RepoCard key={repo.id} repo={repo} handleStar={handleStar} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default RepositoriesPage;
