import { Outlet } from "react-router-dom";
import "./style.css";
import "../../../assets/styles/generic.css";
import Topbar from "../../Components/Topbar/Topbar";
import Footer from "../../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="mainLayout">
        <div>
          <Topbar />
        </div>
        <div className="mainLayout_container">
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
