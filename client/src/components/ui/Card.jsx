const Card = ({ children }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow
                    transition-all duration-200
                    hover:shadow-lg hover:-translate-y-1">
      {children}
    </div>
  );
};

export default Card;