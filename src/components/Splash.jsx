import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

export const Splash = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onFinish, 800); // Wait for exit animation
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#0d1b3e',
            color: '#fff',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px'
          }}
        >
          <motion.div 
            initial={{ scale: 0.8, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, duration: 1.2 }}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#fff',
              borderRadius: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              color: '#0d1b3e'
            }}
          >
            <Zap size={56} fill="#0d1b3e" />
          </motion.div>

          <div style={{ textAlign: 'center' }}>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ fontSize: '32px', fontWeight: 950, letterSpacing: '-0.04em', margin: 0 }}
            >
              24hrwork
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: 800, marginTop: '8px', textTransform: 'uppercase', letterSpacing: '2px' }}
            >
              Easy Work • Instant Pay
            </motion.p>
          </div>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            style={{ 
              height: '3px', 
              backgroundColor: '#3b82f6', 
              borderRadius: '2px', 
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
              marginTop: '20px'
            }} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
