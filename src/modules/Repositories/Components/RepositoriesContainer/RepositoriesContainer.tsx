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
import DataObjectIcon from "@mui/icons-material/DataObject";
import SearchIcon from '@mui/icons-material/Search';

function RepositoriesContainer() {
  const { searchQuery, handleSearchChange } = useSearchValue();
  const {
    reposData,
    isLoading,
    isError,
    isCheckReq,
    setIsCheckReq,
    loadingRepoId,
    handleStar,
  } = useRepositoriesAction(searchQuery);

  const emptyRepositoriesText = useMemo(() => {
    return searchQuery
      ? "No repositories found with this name."
      : " please search for repositories";
  }, [searchQuery]);

  const emptyRepositoriesIcon = useMemo(() => {
    return searchQuery
      ? <DataObjectIcon className="empty_Repositories__container_header_icon" />
      : <SearchIcon className="empty_Repositories__container_header_icon" />
  }, [searchQuery]);


  return (
    <div className="repos_page">
      <div className="repos_page_container">
        <div
          onClick={() => {
            setIsCheckReq(true);
          }}
          className="repos_page_container__header"
        >
          <SearchField onChange={handleSearchChange} />
        </div>
        <div className="repos_page_container__body">
          {searchQuery ? (
            <>
              {isLoading && <LoadingStatePage />}

              {isError && <ErrorStatePage />}

              {!isLoading &&
                !isError &&
                !isCheckReq &&
                searchQuery &&
                reposData.length === 0 && (
                  <EmptyRepositories
                    text={emptyRepositoriesText}
                    key={"handleEmptySearchQuery"}
                    Icon={emptyRepositoriesIcon}
                  />
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
            </>
          ) : (
            <EmptyRepositories
              text={emptyRepositoriesText}
              key={"handleEmptySearchQuery"}
              Icon={emptyRepositoriesIcon}

            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RepositoriesContainer;
