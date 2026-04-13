import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { ShieldCheck, X, Crown, Zap } from 'lucide-react';

export const UnlockModal = () => {
  const { isUnlockModalOpen, setIsUnlockModalOpen, setUser } = useAppContext();

  const handlePay = () => {
    // Mock payment success
    setUser(prev => ({ ...prev, hasPaidUnlock: true }));
    setIsUnlockModalOpen(false);
    alert('Congratulations! Your account is now unlocked.');
  };

  if (!isUnlockModalOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            maxWidth: '360px',
            borderRadius: '36px',
            padding: '40px 24px 32px',
            position: 'relative',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <button 
            onClick={() => setIsUnlockModalOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              border: 'none',
              background: '#f1f5f9',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <X size={18} />
          </button>

          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#eff6ff',
            color: '#3b82f6',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 10px 20px rgba(59, 130, 246, 0.1)'
          }}>
            <Crown size={40} fill="#3b82f6" style={{ opacity: 0.8 }} />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>Unlock Everything</h2>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px', fontWeight: 600 }}>
            Unlock instant withdrawals and premium tasks for a special price.
          </p>

          <div style={{
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '24px',
            marginBottom: '32px',
            border: '1px dashed #cbd5e1'
          }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>ONE-TIME PAYMENT</div>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#3b82f6' }}>₹99</div>
          </div>

          <button 
            onClick={handlePay}
            style={{
              width: '100%',
              backgroundColor: '#0d1b3e',
              color: '#fff',
              padding: '20px',
              borderRadius: '20px',
              fontSize: '17px',
              fontWeight: 800,
              border: 'none',
              boxShadow: '0 8px 25px rgba(13, 27, 62, 0.25)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <Zap size={20} fill="#fff" /> Pay ₹99 & Unlock
          </button>

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.6 }}>
            <ShieldCheck size={16} color="#10b981" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>100% Secure Transaction</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
