'use client';

import { useState } from 'react';
import HomeIcon from '../icons/HomeIcon';
import { NavItem, Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import ChallengesIcon from '../icons/ChallengesIcon';
import AthletesIcon from '../icons/AthletesIcon';
import QuotationIcon from '../icons/QuotationIcon';
import SupportIcon from '../icons/SupportIcon';
import SettingIcon from '../icons/SettingIcon';
import ChatIcon from '../icons/ChatIcon';
import HandShakeIcon from '../icons/HandShakeIcon';

const NAV_ITEMS: NavItem[] = [
  { id: 1, label: 'Home', href: '/', icon: HomeIcon },
  { id: 2, label: 'Athletes Management', href: '/athletes', icon: AthletesIcon },
  {
    id: 3, label: 'Challenges', href: '/challenges', icon: ChallengesIcon, children: [
      { id: 31, label: 'All Challenges', href: '/challenges/all', icon: ChallengesIcon },
      { id: 32, label: 'Monthly Challenges', href: '/challenges/monthly', icon: ChallengesIcon },
      { id: 33, label: 'Virtual Challenges', href: '/challenges/virtual', icon: ChallengesIcon },
      { id: 34, label: 'Community Challenges', href: '/challenges/community', icon: ChallengesIcon },
      { id: 35, label: 'Elite Challenges', href: '/challenges/elite', icon: ChallengesIcon },
    ],
  },
  { id: 4, label: 'Quotation Request', href: '/quotations-request', icon: QuotationIcon },
  { id: 5, label: 'Support', href: '/support', icon: SupportIcon },
  { id: 6, label: 'Sponsorship Hub', href: '/sponsorship-hub', icon: HandShakeIcon },
  { id: 7, label: 'Chat', href: '/chat', icon: ChatIcon },
  { id: 8, label: 'Settings', href: '/settings', icon: SettingIcon },
  // { id: 7, label: 'Logout', href: '/logout', icon: LogOut },
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
        onLogout={() => { }}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <Topbar
          name={name}
          onMenuClick={() => setSidebarOpen(prev => !prev)}
        />

        <main className="flex-1 overflow-y-auto md:px-6 px-4 pt-4 md:pt-6 bg-black ">
          {children}
        </main>


        {/* <main className="flex-1 overflow-y-auto md:p-6 p-4 bg-black">
          {children}
        </main> */}
      </div>
    </div>
  );
}