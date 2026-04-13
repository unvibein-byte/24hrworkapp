import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { ShieldCheck, ArrowRight, UserCheck, ShieldAlert, CreditCard } from 'lucide-react';

export const KycModal = () => {
  const { isKycModalOpen, setIsKycModalOpen, setIsKycVerified, openPurchaseModal } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handlePayKyc = () => {
    setLoading(true);
    // Simulation logic for KYC payment trigger
    setTimeout(() => {
        openPurchaseModal('kyc');
        setIsKycModalOpen(false);
        setLoading(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isKycModalOpen && (
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
            backgroundColor: 'rgba(13, 27, 62, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 10002,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setIsKycModalOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            onClick={(e) => e.stopPropagation()}
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
            {/* Pulsing Shield Icon */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              style={{
                width: '84px',
                height: '84px',
                backgroundColor: '#eff6ff',
                color: '#3b82f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                border: '4px solid #fff',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)'
              }}>
              <ShieldCheck size={42} />
            </motion.div>

            <h2 style={{ fontSize: '28px', fontWeight: 950, color: '#0d1b3e', marginBottom: '8px' }}>Security Check!</h2>
            <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 700, marginBottom: '32px' }}>
                Verify your identity to unlock ultra-fast withdrawals.
            </p>

            {/* Benefits Box */}
            <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '24px',
                padding: '20px',
                textAlign: 'left',
                marginBottom: '32px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <UserCheck size={20} color="#10b981" />
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>One-time Identification</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <ShieldAlert size={20} color="#3b82f6" />
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>Anti-Fraud Protection</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CreditCard size={20} color="#8b5cf6" />
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>Verified UPI Access</span>
                </div>
            </div>

            <p style={{ fontSize: '14px', color: '#10b981', fontWeight: 900, marginBottom: '24px' }}>
                KYC Verification Fee: ₹199 only
            </p>

            <button 
              disabled={loading}
              onClick={handlePayKyc}
              style={{
                width: '100%',
                backgroundColor: '#3b82f6',
                color: '#fff',
                padding: '22px',
                borderRadius: '24px',
                fontSize: '18px',
                fontWeight: 900,
                border: 'none',
                boxShadow: '0 12px 24px rgba(59, 130, 246, 0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
            >
              {loading ? 'Processing...' : (
                  <>Complete KYC Now <ArrowRight size={22} /></>
              )}
            </button>

            <button 
              onClick={() => setIsKycModalOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
                marginTop: '16px'
              }}
            >Skip for now</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
