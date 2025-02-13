import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useCallback } from "react";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="not_found">
      <div className="not_found_content">
        <h1 className="not_found_title">404</h1>
        <p className="not_found_message">Page Not Found</p>
        <div className="not_found_actions">
          <button className="not_found_btn" onClick={goHome}>
            Go Repositories
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
