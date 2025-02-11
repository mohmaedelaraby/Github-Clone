import { Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import { useEffect } from "react";
import GithubHome from "../pages/GithubHome/GithubHome";
import NotFound from "../pages/NotFound/NotFound";
// Assuming this is your 404 page component

export const RootRoutes = () => {
  const navigate = useNavigate();

  // Check if the current location is the root path ("/")
  useEffect(() => {
    if (window.location.pathname === "/") {
      // Redirect to "/seasons" if the path is "/"
      navigate("/repos");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/repos" index element={<GithubHome/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
