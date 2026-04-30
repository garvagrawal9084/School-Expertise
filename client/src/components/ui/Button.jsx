const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg
                 transition-all duration-200
                 hover:bg-indigo-700 active:scale-95"
    >
      {children}
    </button>
  );
};