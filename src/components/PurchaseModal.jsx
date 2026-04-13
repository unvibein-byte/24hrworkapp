import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Zap, ShoppingBag, X, CheckCircle2 } from 'lucide-react';

export const PurchaseModal = () => {
  const { isPurchaseModalOpen, setIsPurchaseModalOpen, purchaseType } = useAppContext();
  const [selectedOption, setSelectedOption] = useState(0);

  const options = [
    { id: 0, price: 100, amount: 3, label: 'Standard Pack' },
    { id: 1, price: 275, amount: 10, label: 'Pro Pack', popular: true }
  ];

  if (!isPurchaseModalOpen) return null;

  const handlePayNow = () => {
    alert(`Processing payment of ₹${options[selectedOption].price} for ${options[selectedOption].amount} ${purchaseType}...`);
    setIsPurchaseModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isPurchaseModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(13, 27, 62, 0.4)',
          backdropFilter: 'blur(10px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              maxWidth: '380px',
              borderRadius: '36px',
              padding: '30px 24px',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden'
            }}
          >
            {/* Header with Close Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '16px', 
                backgroundColor: '#eff6ff', 
                color: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShoppingBag size={24} />
              </div>
              <button 
                onClick={() => setIsPurchaseModalOpen(false)}
                style={{ 
                  backgroundColor: '#f8fafc', 
                  border: 'none', 
                  color: '#94a3b8', 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0d1b3e', marginBottom: '8px' }}>
                Buy {purchaseType === 'spins' ? 'Spins' : 'Scratches'}
              </h2>
              <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>Get instant {purchaseType} and keep winning rewards!</p>
            </div>

            {/* Options List */}
            <div style={{ display: 'grid', gap: '16px', marginBottom: '36px' }}>
              {options.map((option) => (
                <motion.div 
                  key={option.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedOption(option.id)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px',
                    padding: '16px 20px',
                    borderRadius: '24px',
                    border: `2px solid ${selectedOption === option.id ? '#3b82f6' : '#f1f5f9'}`,
                    backgroundColor: selectedOption === option.id ? '#eff6ff' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative'
                  }}
                >
                  {option.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      right: '20px',
                      backgroundColor: '#3b82f6',
                      color: '#fff',
                      padding: '4px 12px',
                      fontSize: '10px',
                      fontWeight: 800,
                      borderRadius: '0 0 8px 8px',
                      textTransform: 'uppercase'
                    }}>Best Value</div>
                  )}
                  
                  <div style={{
                    minWidth: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: `2px solid ${selectedOption === option.id ? '#3b82f6' : '#cbd5e1'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    backgroundColor: '#fff'
                  }}>
                    {selectedOption === option.id && (
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
                    )}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{option.label}</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#0d1b3e' }}>
                      ₹{option.price} = {option.amount} {purchaseType === 'spins' ? 'Spins' : 'Scratches'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={handlePayNow}
                style={{ 
                    flex: 1,
                    backgroundColor: '#0d1b3e', 
                    color: '#fff', 
                    border: 'none', 
                    padding: '18px', 
                    borderRadius: '20px', 
                    fontSize: '16px', 
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 10px 25px rgba(13, 27, 62, 0.2)'
                }}
              >
                <Zap size={20} fill="#fff" /> Pay Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
