import RepositoriesPage from "../../modules/Home/RepositoriesPage";
import "./styles.css";
import DescriptionIcon from "@mui/icons-material/Description";

function GithubHome() {
  return (
    <>
      <div className="homePage">
        <div className="homePage_header">
          <div className="homePage_header_title">
            <div className="homePage_header_title_icon"><DescriptionIcon/></div>
            <div className="homePage_header_title_text"> Repositories</div>
          </div>
        </div>
        <div className="homePage_body">
          <RepositoriesPage />
        </div>
      </div>
    </>
  );
}

export default GithubHome;
