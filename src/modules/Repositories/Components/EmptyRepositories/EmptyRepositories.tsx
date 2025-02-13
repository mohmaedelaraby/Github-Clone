import { ReactNode } from "react";
import "./styles.css";
import DataObjectIcon from "@mui/icons-material/DataObject";

interface Props {
  text: string;
  Icon?: ReactNode;
}

function EmptyRepositories(props: Props) {
  const { text, Icon } = props;

  return (
    <div className="empty_Repositories">
      <div className="empty_Repositories__container">
        <div className="empty_Repositories__container_header">
          {/* Render the passed icon or use a default one */}
          {Icon ? (
            Icon
          ) : (
            <DataObjectIcon className="empty_Repositories__container_header_icon" />
          )}
        </div>
        <div className="empty_Repositories__container_body">{text}</div>
      </div>
    </div>
  );
}

export default EmptyRepositories;
