import { useState, useCallback, useMemo } from "react";

import "./styles.css";
import useGetRepos from "../../Hooks/useGetRepos";
import SearchField from "../../../../common/Components/SearchField/SearchField";
import LoadingStatePage from "../../../../common/Components/LoadingState/LoadingState";
import ErrorStatePage from "../../../../common/Components/ErrorState/ErrorState";
import EmptyRepositories from "../../Components/EmptyRepositories/EmptyRepositories";
import { Repository } from "../../../../types/Types";
import RepositoryCard from "../../Components/RepositoryCard/RepositoryCard";


function RepositoriesContainer() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Custom hook to get repositories, loading state, and error state
  const { reposData, isLoading, isError, handleStar } =
    useGetRepos(searchQuery);

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

          {(reposData.length <= 0 || !searchQuery) &&
            !isLoading &&
            !isError && (
              <EmptyRepositories text={emptyText} key={"handleEmpty"} />
            )}

          {!isLoading &&
            !isError &&
            searchQuery &&
            reposData.length > 0 &&
            reposData.map((repo: Repository) => (
              <RepositoryCard
                key={repo.id}
                repo={repo}
                handleStar={handleStar}
              />
            ))}

            
        </div>
      </div>
    </div>
  );
}

export default RepositoriesContainer;
