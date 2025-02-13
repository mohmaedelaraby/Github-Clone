import { useCallback, useEffect, useState } from "react";
import { Repository } from "../../../types/Types";

const useRepositoryCard = (
  repo: Repository,
  starredRepos: Set<string>,
  handleStar: (repo: Repository) => void
) => {
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [starCount, setStarCount] = useState<number>(repo.stargazers_count);

  useEffect(() => {
    // Check if the repository is in the starred repos list from the store
    const repoFullName = `${repo.owner.login}/${repo.name}`;
    setIsStarred(starredRepos.has(repoFullName));
  }, [repo, starredRepos]);

  const handleStarClick = useCallback(() => {
    handleStar(repo); 
    setStarCount((prevState) => (isStarred ? prevState - 1 : prevState + 1)); 
  }, [handleStar, isStarred, repo]);

  return {
    isStarred,
    starCount,
    handleStarClick,
  };
};

export default useRepositoryCard;
