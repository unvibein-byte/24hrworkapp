import React from 'react';
import { User, Bell, Search, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Header = () => {
  const { points } = useAppContext();
  
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 20px 10px',
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid #f1f5f9'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)'
        }}>
          <User size={24} />
        </div>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 500 }}>Good Morning!</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)' }}>User</div>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{
          backgroundColor: '#fffbeb',
          padding: '6px 14px',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          border: '1px solid #fde68a'
        }}>
          <Star size={16} fill="#f59e0b" color="#f59e0b" />
          <span style={{ color: '#92400e', fontSize: '14px', fontWeight: 800 }}>{points}</span>
        </div>
        <div style={{
          backgroundColor: '#f8fafc',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-dim)',
          border: '1px solid #f1f5f9'
        }}>
          <Bell size={22} />
        </div>
      </div>
    </header>
  );
};
