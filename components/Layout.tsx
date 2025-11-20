import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
  isNight: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, toggleTheme, isNight }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Overview', icon: Icons.Dashboard },
    { path: '/phase/phase0', label: 'Phase 0: Vision', icon: Icons.Layers },
    { path: '/phase/phase1', label: 'Phase 1: Arch', icon: Icons.Layers },
    { path: '/phase/phase2', label: 'Phase 2: Roadmap', icon: Icons.Layers },
    { path: '/phase/phase3', label: 'Phase 3: QA', icon: Icons.Layers },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <header className="md:hidden h-16 border-b border-border flex items-center justify-between px-4 bg-surface">
        <h1 className="font-bold tracking-widest text-accent">NORTHSTAR</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <Icons.Close /> : <Icons.Menu />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 w-64 bg-surface border-r border-border z-40 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col justify-between
      `}>
        <div>
          <div className="h-16 flex items-center justify-center border-b border-border">
             <span className="text-xl font-black tracking-[0.2em] text-accent drop-shadow-md">
                NORTHSTAR
             </span>
          </div>
          
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider border
                    ${isActive 
                      ? 'bg-accent/10 border-accent text-accent' 
                      : 'border-transparent text-secondary hover:border-border hover:bg-background'}
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-secondary uppercase">System Status</span>
            <span className="w-2 h-2 bg-status-success animate-pulse rounded-full" />
          </div>
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 p-2 border border-border hover:bg-background text-xs uppercase font-bold"
          >
            {isNight ? <Icons.Sun size={14} /> : <Icons.Moon size={14} />}
            {isNight ? 'Day Mode' : 'Night Mode'}
          </button>
          <Link to="/login" className="mt-2 w-full flex items-center justify-center gap-2 p-2 border border-transparent text-status-error hover:bg-status-error/10 text-xs uppercase font-bold">
            <Icons.LogOut size={14} /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] md:h-screen bg-background p-4 md:p-8 relative">
         {/* Cyberpunk grid overlay */}
         <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         
         <div className="relative z-10 max-w-7xl mx-auto">
           {children}
         </div>
      </main>
    </div>
  );
};