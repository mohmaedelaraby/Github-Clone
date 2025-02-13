import GithubLogo from "../../../assets/images/github_logo.png";
import './styles.css'
function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar_Container">
        <div className="topbar_Container_logo">
          <div className="topbar_Container_logo_icon">
            <img src={GithubLogo} alt="logo" />
          </div>
          <div className="topbar_Container_logo_text" onClick={()=>{
             window.open('https://github.com/mohmaedelaraby/Github-Clone', '_blank');
          }}>Github Repositories</div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
