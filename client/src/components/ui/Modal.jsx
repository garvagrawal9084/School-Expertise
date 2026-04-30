const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white dark:bg-slate-800 p-6 rounded w-[400px]">
        {children}
        <button onClick={onClose} className="mt-4 text-sm">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;