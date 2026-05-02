import Navbar from "./Navbar";
import { GraduationCap } from "lucide-react";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] transition-colors duration-300 flex flex-col overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 w-full max-w-full">
        {children}
      </main>
      
      {}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="w-full flex flex-col md:flex-row items-center justify-between" style={{ paddingLeft: '48px', paddingRight: '48px', paddingTop: '32px', paddingBottom: '32px', gap: '24px' }}>
          
          <div className="flex items-center gap-2 shrink-0">
            <GraduationCap size={18} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
              School Expertise System
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
             <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Contact Support</a>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 shrink-0 text-center md:text-right">
            © 2026 School Expertise System.<br className="md:hidden" /> All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;