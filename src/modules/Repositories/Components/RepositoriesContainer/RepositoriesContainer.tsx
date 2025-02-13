import { useMemo } from "react";

import "./styles.css";
import SearchField from "../../../../common/Components/SearchField/SearchField";
import LoadingStatePage from "../../../../common/Components/LoadingState/LoadingState";
import ErrorStatePage from "../../../../common/Components/ErrorState/ErrorState";
import EmptyRepositories from "../../Components/EmptyRepositories/EmptyRepositories";
import { Repository } from "../../../../types/Types";
import RepositoryCard from "../../Components/RepositoryCard/RepositoryCard";
import useSearchValue from "../../../../common/Hooks/useSeachValue";
import useRepositoriesAction from "../../Hooks/useRepostioriesAction";

function RepositoriesContainer() {
  const { searchQuery, handleSearchChange } = useSearchValue();
  const { reposData, isLoading, isError ,loadingRepoId,handleStar } =
    useRepositoriesAction(searchQuery);

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
          {isLoading &&  <LoadingStatePage />}

          {isError && <ErrorStatePage />}

          {!searchQuery && !isLoading && !isError && (
            <EmptyRepositories text={emptyText} key={"handleEmptySearchQuery"} />
          )}

          {reposData.length <= 0 && searchQuery && !isLoading && !isError && (
            <EmptyRepositories text={emptyText} key={"handleEmptyData"} />
          )}

          

          {!isLoading &&
            !isError &&
            searchQuery &&
            reposData.length > 0 &&
            reposData.map((repo: Repository) => (
              <RepositoryCard
                key={repo.id}
                repo={repo}
                isStarUnstarLoading={loadingRepoId === repo.id}
                handleStar={handleStar}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default RepositoriesContainer;
