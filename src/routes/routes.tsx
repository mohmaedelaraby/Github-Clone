import { Route, Routes, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import MainLayout from "../common/Layouts/MainLayout/MainLayout";
import NotFound from "../common/Components/NotFound/NotFound";
import LoadingStatePage from "../common/Components/LoadingState/LoadingState";

export const RootRoutes = () => {
  const navigate = useNavigate();

  //lazy load pages
  const RepositoriesPage = lazy(
    () =>
      import("../modules/Repositories/Pages/RepositoriesPage/RepositoriesPage")
  );

  //setDefault
  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/repos");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/repos"
          index
          element={
            <Suspense fallback={ <LoadingStatePage/>}>
              <RepositoriesPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
