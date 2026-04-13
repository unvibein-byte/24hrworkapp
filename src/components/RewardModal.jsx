import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Star, CheckCircle2, AlertCircle } from 'lucide-react';

export const RewardModal = () => {
  const { isRewardOpen, rewardAmount, closeReward } = useAppContext();

  return (
    <AnimatePresence>
      {isRewardOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '360px',
              padding: '40px 24px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
              border: `2px solid ${rewardAmount < 0 ? '#f43f5e' : 'var(--secondary)'}`
            }}
          >
            {/* Background Particles/Glow */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255, 157, 0, 0.15) 0%, transparent 60%)',
              animation: 'spin 20s linear infinite'
            }} />

            <motion.div
              animate={{ rotate: rewardAmount < 0 ? [0, 10, -10, 0] : 360 }}
              transition={{ repeat: Infinity, duration: rewardAmount < 0 ? 0.5 : 20, ease: 'linear' }}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: rewardAmount < 0 ? 'linear-gradient(45deg, #f43f5e, #9f1239)' : 'linear-gradient(45deg, var(--secondary), #ffd700)',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: rewardAmount < 0 ? '0 0 40px rgba(244, 63, 94, 0.4)' : '0 0 40px var(--secondary-glow)',
                position: 'relative',
                zIndex: 1
              }}
            >
              {rewardAmount < 0 ? <AlertCircle size={48} color="#fff" /> : <Star size={48} color="#000" fill="#000" />}
            </motion.div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                {rewardAmount < 0 ? 'Oh No!' : 'Congratulations!'}
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '24px' }}>
                {rewardAmount < 0 ? 'Tough luck, you lost some!' : 'You have successfully claimed your reward.'}
              </p>
              
              <div style={{ 
                fontSize: '48px', 
                fontWeight: 900, 
                color: rewardAmount < 0 ? '#f43f5e' : 'var(--secondary)', 
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '32px' }}>{rewardAmount < 0 ? '-' : '+'}</span> ₹ {Math.abs(rewardAmount)}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeReward}
                style={{
                  width: '100%',
                  backgroundColor: rewardAmount < 0 ? '#f43f5e' : 'var(--secondary)',
                  color: rewardAmount < 0 ? '#fff' : '#000',
                  padding: '18px',
                  borderRadius: '16px',
                  fontSize: '18px',
                  fontWeight: 800,
                  boxShadow: rewardAmount < 0 ? '0 8px 16px rgba(244, 63, 94, 0.3)' : '0 8px 16px rgba(255, 157, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {rewardAmount < 0 ? 'Try Again' : 'Collect Reward'}
              </motion.button>
            </div>
            
            <style>
              {`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}
            </style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
