import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { HelpCircle, ArrowRight, ShieldCheck, Info, Zap, Gamepad2, CreditCard, History, XCircle, Gift, Lock, Trophy, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ActionButton = ({ label, color, icon: Icon, onClick, isLocked = false, fullWidth = false }) => (
  <motion.button
    whileTap={isLocked ? { scale: 0.98, x: [0, -4, 4, -4, 4, 0] } : { scale: 0.94, y: 1 }}
    onClick={onClick}
    style={{
      backgroundColor: isLocked ? '#eef2ff' : color,
      color: isLocked ? '#94a3b8' : '#fff',
      padding: '18px 24px',
      borderRadius: '100px',
      fontSize: '13px',
      fontWeight: 800,
      border: isLocked ? '1.5px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.2)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      width: fullWidth ? '100%' : '100%',
      // High-End 3D Shadows
      boxShadow: isLocked ? 'none' : `
        0 8px 24px ${color}40, 
        inset 0 2px 3px rgba(255,255,255,0.4), 
        inset 0 -3px 4px rgba(0,0,0,0.2)
      `,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {/* Diagonal Glossy Highlight */}
    {!isLocked && (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
        zIndex: 1
      }} />
    )}

    {/* Elegant Moving Shimmer */}
    {!isLocked && (
      <motion.div
        animate={{ x: ['-250%', '250%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transform: 'skewX(-20deg)',
          zIndex: 2
        }}
      />
    )}

    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 3
    }}>
      {isLocked ? <Lock size={20} fill="#94a3b8" stroke="none" /> : Icon && <Icon size={20} strokeWidth={3} fill="#fff" />}
    </div>
    
    <span style={{ 
      whiteSpace: 'nowrap', 
      textTransform: 'uppercase',
      letterSpacing: '1px',
      position: 'relative',
      zIndex: 3,
      textShadow: '0 2px 4px rgba(0,0,0,0.15)'
    }}>{label}</span>
  </motion.button>
);

export const Tasks = () => {
  const navigate = useNavigate();
  const { showReward, totalSpinsDone, captchasDone, completeCaptcha } = useAppContext();
  const isScratchUnlocked = totalSpinsDone >= 10 && captchasDone >= 20;
  
  const [data, setData] = useState({ name: '', marks: '', status: '' });
  const [userInput, setUserInput] = useState({ name: '', marks: '', status: '' });
  const [status, setStatus] = useState('idle');
  const [showError, setShowError] = useState(false);
  
  const handleRefer = async () => {
    const shareData = {
      title: 'Join 24hrwork & Earn ₹100!',
      text: 'I just earned ₹4450 by completing simple tasks on 24hrwork! Join now using my link and get ₹100 instantly. Start earning today!',
      url: 'https://24hrwork.app/join?ref=user' + Math.floor(Math.random() * 1000)
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Referral link copied to clipboard!');
    }
  };

  const studentNames = ['Avasa', 'Vikas', 'Amit', 'Rahul', 'Priya', 'Anjali', 'Sameer', 'Rajesh', 'Saanvi'];
  
  const generateNewData = () => {
    const name = studentNames[Math.floor(Math.random() * studentNames.length)];
    const marks = Math.floor(Math.random() * 500) + 100;
    const passStatus = marks >= 225 ? 'Pass' : 'Fail';
    
    setData({ name, marks: marks.toString(), status: passStatus });
    setUserInput({ name: '', marks: '', status: '' });
    setStatus('idle');
  };

  useEffect(() => {
    generateNewData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.name || !userInput.marks || !userInput.status) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    const isCorrect = 
      userInput.name.trim().toLowerCase() === data.name.toLowerCase() &&
      parseInt(userInput.marks.trim()) === parseInt(data.marks) &&
      userInput.status.trim().toLowerCase() === data.status.toLowerCase();

    if (isCorrect) {
      setStatus('verified');
      handleClaim();
    } else {
      setStatus('error');
      setShowError(true);
      setTimeout(() => {
        setStatus('idle');
        setShowError(false);
      }, 2500);
    }
  };

  const handleClaim = () => {
    setStatus('success');
    completeCaptcha();
    showReward(5);
    setTimeout(() => {
      generateNewData();
    }, 1000);
  };

  const [showMissionModal, setShowMissionModal] = useState(false);

  const MissionModal = () => (
    <AnimatePresence>
      {showMissionModal && (
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
            backgroundColor: 'rgba(13, 27, 62, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setShowMissionModal(false)}
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
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Top Icon Block */}
            <div style={{
              width: '84px',
              height: '84px',
              backgroundColor: '#fffbeb',
              color: '#f59e0b',
              borderRadius: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 10px 20px rgba(245, 158, 11, 0.15)'
            }}>
              <Lock size={42} />
            </div>

            <h2 style={{ fontSize: '26px', fontWeight: 950, color: '#0d1b3e', marginBottom: '12px' }}>Feature Locked</h2>
            <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 700, marginBottom: '32px', lineHeight: '1.6' }}>
              To unlock Scratch Cards, you must complete the following missions:
            </p>

            {/* Mission List */}
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              {/* Mission 1: Spins */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>Lucky Spins</span>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: totalSpinsDone >= 10 ? '#10b981' : '#3b82f6' }}>{Math.min(10, totalSpinsDone)}/10</span>
                </div>
                <div style={{ height: '8px', width: '100%', backgroundColor: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(Math.min(10, totalSpinsDone) / 10) * 100}%` }}
                    style={{ height: '100%', backgroundColor: totalSpinsDone >= 10 ? '#10b981' : '#3b82f6', borderRadius: '10px' }} />
                </div>
              </div>

              {/* Mission 2: Captchas */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>Captcha Tasks</span>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: captchasDone >= 20 ? '#10b981' : '#8b5cf6' }}>{Math.min(20, captchasDone)}/20</span>
                </div>
                <div style={{ height: '8px', width: '100%', backgroundColor: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(Math.min(20, captchasDone) / 20) * 100}%` }}
                    style={{ height: '100%', backgroundColor: captchasDone >= 20 ? '#10b981' : '#8b5cf6', borderRadius: '10px' }} />
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowMissionModal(false)}
              style={{
                width: '100%',
                backgroundColor: '#0d1b3e',
                color: '#fff',
                padding: '20px',
                borderRadius: '24px',
                fontSize: '17px',
                fontWeight: 900,
                border: 'none',
                boxShadow: '0 8px 25px rgba(13, 27, 62, 0.3)',
                cursor: 'pointer'
              }}
            >
              Start Mission
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div style={{ 
      padding: '0 16px 120px', 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh',
      color: '#0d1b3e',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <MissionModal />
      
      {/* How to Use Banner - Redesigned for better look */}
      <div 
        onClick={() => navigate('/how-to-use')}
        style={{ 
          background: 'linear-gradient(135deg, #0d1b3e 0%, #1e293b 100%)',
          borderRadius: '24px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: '0 10px 20px rgba(13, 27, 62, 0.15)',
          marginTop: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '36px', 
            height: '36px', 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#fff' 
          }}>
            <HelpCircle size={20} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>New to 24hrwork?</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Learn how to earn ₹5,000 daily</div>
          </div>
        </div>
        <div style={{ color: '#3b82f6', fontWeight: 900, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          GUIDE <ArrowRight size={14} />
        </div>
      </div>

      {/* Top Source Card - Blue Bordered */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '35px',
        border: '3px solid #3b82f6',
        padding: '30px 20px',
        textAlign: 'center',
        marginBottom: '20px',
        boxShadow: '0 10px 30px rgba(13, 27, 62, 0.05)'
      }}>
        <div style={{ display: 'grid', gap: '12px', fontSize: '20px', fontWeight: 600 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <span style={{ color: '#0d1b3e' }}>Student Name</span> <span style={{ color: '#0d1b3e' }}>=</span> <span style={{ fontWeight: 800, color: '#0d1b3e' }}>{data.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <span style={{ color: '#0d1b3e' }}>Obtained Marks</span> <span style={{ color: '#0d1b3e' }}>=</span> <span style={{ fontWeight: 800, color: '#0d1b3e' }}>{data.marks}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <span style={{ color: '#0d1b3e' }}>Fail/Pass</span> <span style={{ color: '#0d1b3e' }}>=</span> <span style={{ fontWeight: 800, color: '#0d1b3e' }}>{data.status}</span>
          </div>
        </div>
      </div>

      {/* Income Banner & Form - Always Unlocked */}
      <div style={{
        backgroundColor: '#0d1b3e',
        color: '#fff',
        padding: '16px',
        borderRadius: '16px',
        textAlign: 'center',
        fontWeight: 800,
        fontSize: '22px',
        marginBottom: '20px',
        boxShadow: '0 8px 20px rgba(13, 27, 62, 0.2)'
      }}>
        Income : ₹5/Form
      </div>

      <div style={{
        backgroundColor: '#fff',
        borderRadius: '35px',
        border: '3px solid #3b82f6',
        padding: '32px 20px',
        marginBottom: '40px',
        boxShadow: '0 10px 30px rgba(13, 27, 62, 0.05)'
      }}>
        <h3 style={{
          textAlign: 'center',
          color: '#0d1b3e',
          fontWeight: 800,
          fontSize: '22px',
          marginBottom: '35px'
        }}>Enter Above Data</h3>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, minWidth: '150px', color: '#0d1b3e' }}>Student Name :</span>
            <input 
              type="text" 
              placeholder="Enter here"
              value={userInput.name}
              onChange={(e) => setUserInput({...userInput, name: e.target.value})}
              style={{
                flex: 1,
                border: 'none',
                borderBottom: '2px solid #cbd5e1',
                padding: '4px 0',
                fontSize: '18px',
                outline: 'none',
                color: '#0d1b3e',
                fontWeight: 600,
                backgroundColor: 'transparent'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, minWidth: '150px', color: '#0d1b3e' }}>Obtained Marks :</span>
            <input 
              type="number" 
              placeholder="Enter here"
              value={userInput.marks}
              onChange={(e) => setUserInput({...userInput, marks: e.target.value})}
              style={{
                flex: 1,
                border: 'none',
                borderBottom: '2px solid #cbd5e1',
                padding: '4px 0',
                fontSize: '18px',
                outline: 'none',
                color: '#0d1b3e',
                fontWeight: 600,
                backgroundColor: 'transparent'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, minWidth: '150px', color: '#0d1b3e' }}>Fail/Pass :</span>
            <input 
              type="text" 
              placeholder="Enter here"
              value={userInput.status}
              onChange={(e) => setUserInput({...userInput, status: e.target.value})}
              style={{
                flex: 1,
                border: 'none',
                borderBottom: '2px solid #cbd5e1',
                padding: '4px 0',
                fontSize: '18px',
                outline: 'none',
                color: '#0d1b3e',
                fontWeight: 600,
                backgroundColor: 'transparent'
              }}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              animate={status === 'error' ? { x: [0, -10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              type="submit"
              disabled={status === 'verified'}
              style={{
                backgroundColor: status === 'error' ? '#f44336' : (status === 'verified' ? '#10b981' : '#0d1b3e'),
                color: '#fff',
                padding: '14px 60px',
                borderRadius: '100px',
                fontSize: '22px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(13, 27, 62, 0.3)'
              }}
            >
              {status === 'verified' ? 'Accepted!' : 'Submit'}
            </motion.button>
          </div>
        </form>
      </div>

      {/* Task Shortcuts Grid - All Unlocked */}
      <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '20px', marginLeft: '4px' }}>Task Shortcuts</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <ActionButton 
          label="Upgrade Now" 
          color="#f59e0b" 
          icon={ShieldCheck} 
          onClick={() => navigate('/premium')} 
        />
        <ActionButton 
          label="Spin Now" 
          color="#3b82f6" 
          icon={Gamepad2} 
          onClick={() => navigate('/spin')} 
        />
        <ActionButton 
          label="Scratch Now" 
          color="#ec4899" 
          icon={Gift} 
          isLocked={!isScratchUnlocked}
          onClick={() => {
            if (!isScratchUnlocked) {
               setShowMissionModal(true);
            } else {
               navigate('/scratch');
            }
          }} 
        />
        <ActionButton 
          label="View Proof" 
          color="#10b981" 
          icon={CreditCard} 
          onClick={() => window.open('https://sites.google.com/view/24hrwork', '_blank')} 
        />
      </div>

      {/* Refer & Earn Banner - Match Image Design */}
      <motion.div 
        onClick={() => navigate('/referral')}
        whileTap={{ scale: 0.98 }}
        style={{
          marginTop: '32px',
          background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
          borderRadius: '28px',
          padding: '24px',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(239, 68, 68, 0.25)',
          cursor: 'pointer'
        }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ 
            fontSize: '14px', 
            fontWeight: 900, 
            color: '#fef08a', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            marginBottom: '8px' 
          }}>
            HOT OFFER
          </div>
          <h3 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '2px', letterSpacing: '-0.02em' }}>Refer & Earn</h3>
          <div style={{ fontSize: '32px', fontWeight: 950, color: '#fef08a', marginBottom: '16px' }}>₹100</div>
          <p style={{ fontSize: '14px', fontWeight: 700, opacity: 0.9 }}>Invite friends to 24hrwork</p>
        </div>
        
        {/* Tilted Gift Icon Decor */}
        <div style={{
          position: 'absolute',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%) rotate(-15deg)',
          opacity: 0.9
        }}>
           <Gift size={76} strokeWidth={1.5} color="#fff" />
        </div>
        
        {/* Glow Effect */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '120px',
          height: '120px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }} />
      </motion.div>

      <AnimatePresence>
        {showError && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              width: '85%',
              backgroundColor: '#fff',
              borderRadius: '30px',
              padding: '40px 24px',
              textAlign: 'center',
              boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
              border: '2px solid #ef4444'
            }}>
            <XCircle size={60} color="#ef4444" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>Wrong Entry!</h3>
            <p style={{ color: '#64748b', fontWeight: 600, marginBottom: '24px' }}>Please double check the source data and try again.</p>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowError(false)}
              style={{
                backgroundColor: '#ef4444',
                color: '#fff',
                padding: '16px 30px',
                borderRadius: '100px',
                fontSize: '18px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                boxShadow: '0 10px 20px rgba(239, 68, 68, 0.3)'
              }}
            >
              TRY AGAIN
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
