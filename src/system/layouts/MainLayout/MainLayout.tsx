import { Outlet } from "react-router-dom";
import "./style.css";
import '../../../assets/styles/generic.css'

const MainLayout = () => {
  return (
    <>
      <div className="mainLayout">
          <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
