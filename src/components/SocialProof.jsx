import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SocialProof = () => {
  const { notifications } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [notifications.length]);

  const current = notifications[currentIndex];

  return (
    <div style={{ padding: '0 20px', marginBottom: '16px', height: '36px', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '100px',
            padding: '6px 16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#22c55e'
          }}
        >
          <CheckCircle2 size={14} />
          <span>{current.user} just withdrew <strong>₹{current.amount}</strong></span>
          <span style={{ fontSize: '11px', color: 'rgba(34, 197, 94, 0.6)' }}>• {current.time}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
