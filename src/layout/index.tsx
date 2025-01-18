import { AppSidebar } from '@/components/AppSidebar';
import Navbar from '@/components/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

interface LayoutInterface {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutInterface> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen bg-slate-200 p-4 flex flex-col gap-4">
        <div className="relative">
          <Navbar />
        </div>
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
