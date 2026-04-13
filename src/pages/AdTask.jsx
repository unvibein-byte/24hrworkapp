import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { PlayCircle, CheckCircle2, ArrowLeft, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdTask = () => {
  const navigate = useNavigate();
  const { showReward } = useAppContext();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isFinished) {
      setIsFinished(true);
      showReward(20);
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, isFinished, showReward]);

  const startAd = () => {
    setIsPlaying(true);
    setTimeLeft(30);
    setIsFinished(false);
  };

  return (
    <div style={{ padding: '0 20px 24px' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: 'transparent',
          color: 'var(--text-dim)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
          fontSize: '14px',
          fontWeight: 600
        }}
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Watch & Earn</h2>
        <p style={{ fontSize: '14px', color: 'var(--text-dim)' }}>Watch a 30s video to earn ₹20</p>
      </div>

      <div className="glass-card" style={{
        padding: '32px 24px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, var(--surface) 0%, #020617 100%)',
        border: '1px solid var(--border)',
        borderRadius: '32px',
        marginBottom: '24px',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <AnimatePresence mode="wait">
          {!isPlaying && !isFinished && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(244, 63, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f43f5e'
              }}>
                <PlayCircle size={48} />
              </div>
              <button 
                onClick={startAd}
                style={{
                  backgroundColor: '#f43f5e',
                  color: '#fff',
                  padding: '16px 32px',
                  borderRadius: '16px',
                  fontWeight: 800,
                  fontSize: '16px',
                  boxShadow: '0 8px 16px rgba(244, 63, 94, 0.3)'
                }}
              >
                Watch Video Now
              </button>
            </motion.div>
          )}

          {isPlaying && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
            >
              <div style={{
                width: '100%',
                height: '180px',
                borderRadius: '20px',
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-dim)',
                fontSize: '13px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                [ AD VIDEO PLACEHOLDER ]
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '4px solid rgba(244, 63, 94, 0.2)',
                  borderTopColor: '#f43f5e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#f43f5e',
                  animation: 'spin 2s linear infinite'
                }}>
                  {timeLeft}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Don't close!</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Reward will be added after countdown.</p>
                </div>
              </div>
            </motion.div>
          )}

          {isFinished && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#22c55e'
              }}>
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>Ad Completed!</h3>
                <p style={{ fontSize: '14px', color: '#22c55e', fontWeight: 700 }}>+₹20 added to wallet</p>
              </div>
              <button 
                onClick={() => navigate(-1)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  border: '1px solid var(--border)'
                }}
              >
                Go Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>

      <div style={{ backgroundColor: 'rgba(244, 63, 94, 0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(244, 63, 94, 0.1)' }}>
        <p style={{ fontSize: '12px', color: '#f43f5e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={14} /> Tip: Watch 10 ads today to unlock ₹50 bonus!
        </p>
      </div>
    </div>
  );
};
