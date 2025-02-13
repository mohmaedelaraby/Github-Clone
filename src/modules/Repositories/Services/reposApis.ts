import axios from "axios";

const getAuthToken = () => {
  const token = import.meta.env.VITE_GITHUB_API_TOKEN; 
  console.log("Token:", token); 
  if (!token) {
    throw new Error("GitHub API token is missing.");
  }
  return token;
};

export const searchRepositories = async (keyword: string) => {
  const token = getAuthToken();
  const apiUrl = import.meta.env.VITE_API_URL; 

  try {
    const response = await axios.get(
      `${apiUrl}/search/repositories`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: keyword,
          per_page: 10,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
};

export const starRepository = async (owner: string, repo: string) => {
  const token = getAuthToken();
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.put(
      `${apiUrl}/user/starred/${owner}/${repo}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error starring repository:", error);
    throw error;
  }
};

export const unstarRepository = async (owner: string, repo: string) => {
  const token = getAuthToken();
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.delete(
      `${apiUrl}/user/starred/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error unstarring repository:", error);
    throw error;
  }
};
