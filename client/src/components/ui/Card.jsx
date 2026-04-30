const Card = ({ children }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded shadow hover:shadow-lg transition">
      {children}
    </div>
  );
};

export default Card;