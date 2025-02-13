import { Repository } from "../../../../types/Types";
import { useRepoStore } from "../../../../stores/useRepositoryStore";
import StarIcon from "@mui/icons-material/Star";
import "./styles.css";
import useRepositoryCard from "../../Hooks/useRepositoryCard";
import { CircularProgress } from "@mui/material";

interface Props {
  repo: Repository;
  isStarUnstarLoading: boolean;
  handleStar: (repo: Repository) => void; // Receive handleStar as a prop
}

function RepositoryCard(props: Props) {
  const { repo, isStarUnstarLoading, handleStar } = props;
  const { starredRepos } = useRepoStore();
  const { handleStarClick, isStarred, starCount } = useRepositoryCard(
    repo,
    starredRepos,
    handleStar
  );

  return (
    <div className="repo_card">
      <div className="repo_card_header">
        <h2 className="repo_card_header_name">{repo.name}</h2>
        {isStarUnstarLoading ? (
          <CircularProgress size={25} sx={{color:'black'}}/>
        ) : (
          <button
            className={`repo_card_star_btn ${isStarred ? "starred" : ""}`}
            onClick={handleStarClick}
          >
            {isStarred ? (
              <StarIcon sx={{ color: "gold" }} />
            ) : (
              <StarIcon sx={{ color: "white" }} />
            )}
          </button>
        )}
      </div>

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
      <p className="repo_card_description">{repo.description}</p>
      <div className="repo_card_stats">
        <span className="repo_card_stats_stars">
          Stars: <span id="repo_card_stats_stars_count">{starCount}</span>
        </span>
        <span className="repo_card_stats_forks">Forks: {repo.forks_count}</span>
      </div>
    </div>
  );
}

export default RepositoryCard;
