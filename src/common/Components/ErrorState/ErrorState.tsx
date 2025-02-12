// ErrorPage.tsx
import { WarningAmber } from '@mui/icons-material'; 
import './styles.css'; 

const ErrorStatePage = () => {
  return (
    <div className="error_container">
      <WarningAmber className="error_icon" />
      <div className="error_message">
        Something went wrong. Please try again later.
      </div>
    </div>
  );
};

export default ErrorStatePage;
