import {create} from "zustand";
import { Repository } from "../types/Types";

interface RepositoryStore {
  repositories: Repository[];
  starredRepos: Set<string>;
  setRepositories: (repos: Repository[]) => void;
  toggleStar: (repo: Repository) => void;
}

export const useRepoStore = create<RepositoryStore>((set) => ({
  repositories: [],
  starredRepos: new Set(),
  setRepositories: (repos: Repository[]) => set({ repositories: repos }),
  toggleStar: (repo: Repository) =>
    set((state) => {
      const newStarredRepos = new Set(state.starredRepos);
      const repoFullName = `${repo.owner.login}/${repo.name}`;

      if (newStarredRepos.has(repoFullName)) {
        newStarredRepos.delete(repoFullName); 
      } else {
        newStarredRepos.add(repoFullName);
      }

      return { starredRepos: newStarredRepos };
    }),
}));
