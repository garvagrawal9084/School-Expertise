import { useEffect } from "react";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    setTimeout(onClose, 2000);
  }, []);

  return <div className="toast">{message}</div>;
};

export default Toast;