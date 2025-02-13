import RepositoriesContainer from "../../Components/RepositoriesContainer/RepositoriesContainer";
import RepositoriesHeader from "../../Components/RepositoriesHeader/RepositoriesHeader";
import "./styles.css";

function RepositoriesPage() {
  return (
    <>
      <div className="repos">
        <RepositoriesHeader/>
        <div className="repos_body">
          <RepositoriesContainer />
        </div>
      </div>
    </>
  );
}

export default RepositoriesPage;
