import { useEffect, useState } from "react";
import { Repository } from "../../../../types/Types";
import { useRepoStore } from "../../../../stores/useRepositoryStore";
import "./styles.css";

interface Props {
  repo: Repository;
  handleStar: (repo: Repository) => void; // Receive handleStar as a prop
}

function RepoCard({ repo, handleStar }: Props) {
  const { starredRepos } = useRepoStore();
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [starCount, setStarCount] = useState<number>(repo.stargazers_count);

  useEffect(() => {
    // Check if the repository is in the starred repos list from the store
    const repoFullName = `${repo.owner.login}/${repo.name}`;
    setIsStarred(starredRepos.has(repoFullName));
  }, [repo, starredRepos]);

  const handleStarClick = () => {
    handleStar(repo); // Call handleStar to toggle star status in the store
    setStarCount((prevState) => (isStarred ? prevState - 1 : prevState + 1)); // Update the local star count
  };

  return (
    <div className="repo_card">
      <div className="repo_card_header">
        <h2 className="repo_card_header_name">{repo.name}</h2>
        <p className="repo_card_header_owner">
          by
          <a
            href={repo.owner.html_url}
            target="_blank"
            className="repo_card_header_owner_link"
          >
            {repo.owner.login}
          </a>
        </p>
      </div>
      <p className="repo_card_description">{repo.description}</p>
      <div className="repo_card_stats">
        <span className="repo_card_stats_stars">
          Stars: <span id="repo_card_stats_stars_count">{starCount}</span>
        </span>
        <span className="repo_card_stats_forks">
          Forks: {repo.forks_count}
        </span>
      </div>
      <button
        className={`repo_card_star_btn ${isStarred ? "starred" : ""}`}
        onClick={handleStarClick}
      >
        {isStarred ? "★ Unstar" : "⭐ Star"}
      </button>
    </div>
  );
}

export default RepoCard;
