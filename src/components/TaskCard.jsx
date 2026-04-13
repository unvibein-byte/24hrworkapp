import React from 'react';
import { MousePointer2, Zap, PlayCircle, Hash, ChevronRight, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export const TaskCard = ({ task, onClick }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'ads': return <PlayCircle size={22} />;
      case 'captcha': return <Hash size={22} />;
      case 'spin': return <Zap size={22} />;
      default: return <MousePointer2 size={22} />;
    }
  };

  const getColor = (type) => {
    switch(type) {
      case 'ads': return '#f43f5e';
      case 'captcha': return '#3b82f6';
      case 'spin': return '#8b5cf6';
      default: return '#5c62f1';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        backgroundColor: '#fff',
        padding: '16px',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        border: '1px solid #f1f5f9',
        position: 'relative',
        marginBottom: '4px'
      }}
    >
      {/* Icon Box */}
      <div style={{
        backgroundColor: `${getColor(task.type)}10`,
        width: '56px',
        height: '56px',
        minWidth: '56px',
        borderRadius: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: getColor(task.type),
      }}>
        {getIcon(task.type)}
      </div>

      {/* Text Info */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>{task.title}</h3>
          {task.isPremium && (
            <div style={{
              backgroundColor: '#fffbeb',
              color: '#f59e0b',
              padding: '2px 6px',
              borderRadius: '6px',
              fontSize: '9px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              border: '1px solid #fde68a'
            }}>
              <Crown size={10} fill="#f59e0b" /> PREMIUM
            </div>
          )}
        </div>
        <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4', fontWeight: 500 }}>{task.description}</p>
      </div>

      {/* Reward & Arrow */}
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
        <div style={{
          backgroundColor: '#f0fdf4',
          color: '#22c55e',
          padding: '4px 10px',
          borderRadius: '100px',
          fontSize: '13px',
          fontWeight: 800,
          border: '1px solid #dcfce7'
        }}>
          +₹{task.reward}
        </div>
        <ChevronRight size={18} color="#cbd5e1" />
      </div>
    </motion.div>
  );
};
