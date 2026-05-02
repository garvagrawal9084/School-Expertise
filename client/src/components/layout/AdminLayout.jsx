import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">

      {}
      <Sidebar />

      {}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">

        {}
        <Navbar isAdmin={true} />

        {}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;