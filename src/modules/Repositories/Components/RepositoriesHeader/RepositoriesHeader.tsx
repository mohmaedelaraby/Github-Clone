import "./styles.css";
import DescriptionIcon from "@mui/icons-material/Description";

function RepositoriesHeader() {
  return (
    <div className="repos_header">
      <div className="repos_header_title">
        <div className="repos_header_title_icon">
          <DescriptionIcon />
        </div>
        <div className="repos_header_title_text"> Repositories</div>
      </div>
    </div>
  );
}

export default RepositoriesHeader;
