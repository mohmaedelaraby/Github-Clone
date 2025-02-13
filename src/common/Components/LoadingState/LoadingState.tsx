import { CircularProgress } from "@mui/material";
import "./styles.css"; 

const LoadingStatePage = () => {
  return (
    <div className="loading">
      <CircularProgress size={150}  className="loading_icon"/>
    </div>
  );
};

export default LoadingStatePage;
