import { useState, useCallback } from "react";
import SearchField from "../../shared/SearchField/SearchField";
import { Repository } from "../../types/Types";
import RepoCard from "./components/RepoCard/RepoCard";
import useGetRepos from "./services/useGetRepos";
import "./styles.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { reposData, isLoading, isError, handleStar } = useGetRepos(searchQuery);

  const handleSearchChange = useCallback((newSearchValue: string) => {
    setSearchQuery(newSearchValue);
  }, []);

  return (
    <div className="home">
      <div className="home_container">
        <div className="home_container__header">
          <SearchField onChange={handleSearchChange} />
        </div>
        <div className="home_container__body">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error fetching repositories</div>
          ) : reposData.length > 0 ? (
            reposData.map((repo: Repository) => (
              <RepoCard key={repo.id} repo={repo} handleStar={handleStar} />
            ))
          ) : (
            <div>No repositories found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
