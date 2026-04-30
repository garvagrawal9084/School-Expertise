import { useEffect } from "react";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    setTimeout(onClose, 2000);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded">
      {message}
    </div>
  );
};

export default Toast;