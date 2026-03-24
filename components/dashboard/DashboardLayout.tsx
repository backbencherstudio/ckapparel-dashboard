'use client';

import { useState } from 'react';
import { LayoutDashboard, BarChart2, Users } from 'lucide-react';
import { NavItem, Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

const NAV_ITEMS: NavItem[] = [
  { id: 1, label: 'Home', href: '/', icon: LayoutDashboard },
  { id: 2, label: 'Analytics', href: '/analytics', icon: BarChart2 },
  { id: 3, label: 'Users', href: '/users', icon: Users },
];

export default function DashboardLayoutComp({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const name = 'Admin';
  const panelLabel = 'Admin Panel';

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navItems={NAV_ITEMS}
        panelLabel={panelLabel}
        onLogout={() => {}}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <Topbar
          name={name}
          onMenuClick={() => setSidebarOpen(prev => !prev)}
        />

        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}