import { ReactNode } from "react";
import TopBar from "./TopBar";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const MainLayout = ({ children, showSidebar = false }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {showSidebar ? (
          <div className="flex gap-6">
            <div className="hidden lg:block">
              <Sidebar />
            </div>
            <div className="flex-1 min-w-0">
              {children}
            </div>
          </div>
        ) : (
          children
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
