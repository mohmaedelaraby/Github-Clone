import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "../common/Layouts/MainLayout/MainLayout";
import NotFound from "../common/Components/NotFound/NotFound";
import RepositoriesPage from "../modules/Repositories/Pages/RepositoriesPage/RepositoriesPage";

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
        <Route path="/repos" index element={<RepositoriesPage/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
