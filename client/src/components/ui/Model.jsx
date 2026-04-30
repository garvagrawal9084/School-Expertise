const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-[500px] max-h-[80vh] overflow-y-auto">
        {children}
        <button onClick={onClose} className="mt-4 text-sm text-gray-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;