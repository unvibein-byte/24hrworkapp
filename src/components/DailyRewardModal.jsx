import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Gift, Zap, Disc, Type, Box, CheckCircle2 } from 'lucide-react';

export const DailyRewardModal = () => {
  const { isDailyModalOpen, setIsDailyModalOpen, claimDailyBenefits } = useAppContext();
  const [claiming, setClaiming] = useState(false);

  const handleClaim = () => {
    setClaiming(true);
    setTimeout(() => {
        claimDailyBenefits();
        setIsDailyModalOpen(false);
        setClaiming(false);
    }, 1500);
  };

  const RewardItem = ({ icon: Icon, title, value, color }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        backgroundColor: `${color}08`,
        borderRadius: '20px',
        border: `1.5px solid ${color}15`,
        marginBottom: '12px'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ 
                width: '40px', 
                height: '40px', 
                backgroundColor: color, 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#fff',
                boxShadow: `0 8px 16px ${color}30`
            }}>
                <Icon size={20} />
            </div>
            <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>{title}</div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Daily Benefit Claimed</div>
            </div>
        </div>
        <div style={{ fontSize: '16px', fontWeight: 950, color: color }}>{value}</div>
    </div>
  );

  return (
    <AnimatePresence>
      {isDailyModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(13, 27, 62, 0.9)',
            backdropFilter: 'blur(10px)',
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              maxWidth: '380px',
              borderRadius: '40px',
              padding: '40px 24px 32px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Animated Crown Icon */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                width: '84px',
                height: '84px',
                backgroundColor: '#f59e0b',
                color: '#fff',
                borderRadius: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 15px 35px rgba(245, 158, 11, 0.3)'
              }}>
              <Gift size={42} fill="#fff" />
            </motion.div>

            <h2 style={{ fontSize: '28px', fontWeight: 950, color: '#0d1b3e', marginBottom: '8px' }}>Daily Reward!</h2>
            <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 700, marginBottom: '32px' }}>
                Your daily benefits have been credited.
            </p>

            {/* Benefit List */}
            <div style={{ marginBottom: '40px' }}>
                <RewardItem icon={Zap} title="Cash Bonus" value="+₹500" color="#10b981" />
                <RewardItem icon={Disc} title="Lucky Spins" value="10 Free" color="#3b82f6" />
                <RewardItem icon={Box} title="Scratch Cards" value="5 Free" color="#ec4899" />
                <RewardItem icon={Type} title="Captcha Tasks" value="20 Free" color="#8b5cf6" />
            </div>

            <button 
              disabled={claiming}
              onClick={handleClaim}
              style={{
                width: '100%',
                backgroundColor: '#0d1b3e',
                color: '#fff',
                padding: '22px',
                borderRadius: '24px',
                fontSize: '18px',
                fontWeight: 900,
                border: 'none',
                boxShadow: '0 12px 24px rgba(13, 27, 62, 0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
            >
              {claiming ? 'Claiming Bonuses...' : (
                  <>Claim Daily Rewards <CheckCircle2 size={24} /></>
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
