import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Player from "../components/Player";
import ScrollToTop from "../components/ScrollToTop";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-base">
      <ScrollToTop />

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Application Area */}
      <div className="flex min-h-screen w-full flex-col lg:ml-[260px] lg:w-[calc(100%-260px)]">
        
        {/* Topbar */}
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <main
          className="
            min-w-0
            flex-1
            w-full
            px-4
            sm:px-6
            lg:px-8
            xl:px-10
            pt-6
            pb-32
          "
        >
          <Outlet />
        </main>
      </div>

      {/* Music Player */}
      <Player />
    </div>
  );
}