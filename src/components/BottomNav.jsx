import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, Wallet, User as UserIcon } from 'lucide-react';

export const BottomNav = () => {
  const navItems = [
    { icon: <Home size={24} />, label: "Home", path: "/" },
    { icon: <ClipboardList size={24} />, label: "Tasks", path: "/tasks" },
    { icon: <Wallet size={24} />, label: "Wallet", path: "/wallet" },
    { icon: <UserIcon size={24} />, label: "Profile", path: "/profile" },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 'max(0px, calc(50% - 240px))',
      width: 'min(100%, 480px)',
      padding: '12px 0 calc(12px + var(--safe-area-inset-bottom))',
      background: '#ffffff',
      borderTop: '1px solid #f1f5f9',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 1000,
      boxShadow: '0 -4px 12px rgba(0,0,0,0.03)'
    }}>
      {navItems.map((item) => (
        <NavLink 
          key={item.label}
          to={item.path}
          style={{ textDecoration: 'none', flex: 1 }}
        >
          {({ isActive }) => (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              color: isActive ? '#3b82f6' : '#94a3b8',
              transition: 'all 0.3s ease'
            }}>
              {item.icon}
              <span style={{ fontSize: '11px', fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
