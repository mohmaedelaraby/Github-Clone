import RepositoriesContainer from "../../Components/RepositoriesContainer/RepositoriesContainer";
import "./styles.css";
import DescriptionIcon from "@mui/icons-material/Description";

function RepositoriesPage() {
  return (
    <>
      <div className="repos">
        <div className="repos_header">
          <div className="repos_header_title">
            <div className="repos_header_title_icon"><DescriptionIcon/></div>
            <div className="repos_header_title_text"> Repositories</div>
          </div>
        </div>
        <div className="repos_body">
          <RepositoriesContainer />
        </div>
      </div>
    </>
  );
}

export default RepositoriesPage;
