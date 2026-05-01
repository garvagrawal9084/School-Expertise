import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="pt-16">
        {children}
      </main>

    </div>
  );
};

export default Layout;