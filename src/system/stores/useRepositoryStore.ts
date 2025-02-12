import {create} from "zustand";
import { Repository } from "../types/Types";

// Define the state and actions
interface RepositoryStore {
  repositories: Repository[];
  starredRepos: Set<string>;
  setRepositories: (repos: Repository[]) => void;
  toggleStar: (repo: Repository) => void;
}

// Create the store
export const useRepoStore = create<RepositoryStore>((set) => ({
  repositories: [],
  starredRepos: new Set(),
  setRepositories: (repos: Repository[]) => set({ repositories: repos }),
  toggleStar: (repo: Repository) =>
    set((state) => {
      const newStarredRepos = new Set(state.starredRepos);
      const repoFullName = `${repo.owner.login}/${repo.name}`;

      if (newStarredRepos.has(repoFullName)) {
        newStarredRepos.delete(repoFullName); // Remove from starred if already starred
      } else {
        newStarredRepos.add(repoFullName); // Add to starred if not starred
      }

      return { starredRepos: newStarredRepos };
    }),
}));
