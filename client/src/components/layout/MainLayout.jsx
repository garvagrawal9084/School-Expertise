import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="min-h-[80vh] px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t">
        © 2026 School Expertise System
      </footer>
    </div>
  );
};

export default MainLayout;