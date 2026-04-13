import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Send, FileText, ArrowRight, X } from 'lucide-react';

export const TelegramModal = () => {
  const { isTelegramModalOpen, setIsTelegramModalOpen, setIsDailyModalOpen } = useAppContext();

  return (
    <AnimatePresence>
      {isTelegramModalOpen && (
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
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setIsTelegramModalOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              maxWidth: '380px',
              borderRadius: '35px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
              textAlign: 'center'
            }}
          >
            {/* Header / Gradient Top */}
            <div style={{
              background: 'linear-gradient(180deg, #4338ca 0%, #3b82f6 100%)',
              padding: '40px 20px 30px',
              color: '#fff',
              position: 'relative'
            }}>
               {/* Floating Icon Base */}
               <div style={{
                 width: '76px',
                 height: '76px',
                 backgroundColor: '#fff',
                 borderRadius: '50%',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 margin: '0 auto 20px',
                 color: '#3b82f6',
                 boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
               }}>
                  <FileText size={40} fill="#3b82f6" strokeWidth={1.5} style={{ color: '#fff' }} />
                  <div style={{ position: 'absolute', color: '#fff', top: '56px', fontWeight: 900, fontSize: '18px' }}>$</div>
               </div>

               <h2 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '8px' }}>Payment Proofs</h2>
               <p style={{ fontSize: '14px', fontWeight: 600, opacity: 0.8 }}>Verified Withdrawals Daily</p>
            </div>

            {/* Content Body */}
            <div style={{ padding: '24px 20px 32px' }}>
               <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.6', fontWeight: 600, marginBottom: '24px' }}>
                  Don't miss out! Join our official Telegram channel to see thousands of <span style={{ color: '#3b82f6', fontWeight: 900 }}>Withdrawal Proofs</span> and get <span style={{
                    backgroundColor: '#f0fdf4',
                    color: '#16a34a',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontWeight: 900
                  }}>₹10 Bonus</span>!
               </p>

               {/* Channel Info Box */}
               <div style={{
                 backgroundColor: '#f8fafc',
                 border: '1px solid #e2e8f0',
                 borderRadius: '24px',
                 padding: '16px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'space-between',
                 marginBottom: '32px'
               }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: '#3b82f6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }}>
                      <Send size={20} fill="#fff" style={{ transform: 'rotate(-10deg)', marginLeft: '-2px' }} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                       <div style={{ fontSize: '15px', fontWeight: 950, color: '#1e293b' }}>FD Premier Official</div>
                       <div style={{ fontSize: '13px', color: '#3b82f6', fontWeight: 800 }}>Join 15,000+ Members</div>
                    </div>
                  </div>
                  <div style={{
                    backgroundColor: '#10b981',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '100px',
                    fontSize: '13px',
                    fontWeight: 900
                  }}>+₹10</div>
               </div>

               {/* Join Button */}
               <button 
                 onClick={() => {
                    window.open('https://t.me/fdpremier', '_blank');
                    setIsTelegramModalOpen(false);
                    setIsDailyModalOpen(true);
                 }}
                 style={{
                   width: '100%',
                   backgroundColor: '#4f46e5',
                   color: '#fff',
                   padding: '20px',
                   borderRadius: '20px',
                   fontSize: '18px',
                   fontWeight: 900,
                   border: 'none',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   gap: '12px',
                   boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)',
                   cursor: 'pointer',
                   marginBottom: '16px'
                 }}
               >
                 Join & See Proofs <ArrowRight size={22} />
               </button>

               <button 
                 onClick={() => {
                    setIsTelegramModalOpen(false);
                    setIsDailyModalOpen(true);
                 }}
                 style={{
                   background: 'none',
                   border: 'none',
                   color: '#94a3b8',
                   fontSize: '14px',
                   fontWeight: 800,
                   cursor: 'pointer'
                 }}
               >Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
