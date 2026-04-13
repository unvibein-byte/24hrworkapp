import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Coins, Star, Zap, RefreshCw, ArrowLeft, Trophy, History, ShieldCheck, Play } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const SpinWheel = () => {
  const navigate = useNavigate();
  const { showReward, points, balance, openPurchaseModal, incrementSpins, totalSpinsDone, spinsAvailable } = useAppContext();
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [tick, setTick] = useState(0);

  const rewards = [
    // ... (rewards array - I'll keep it as is, just replacing the functions)
    { value: 460, c1: '#f43f5e', c2: '#9f1239' },
    { value: 410, c1: '#10b981', c2: '#064e3b' },
    { value: 560, c1: '#6366f1', c2: '#312e81' },
    { value: 100, c1: '#1e293b', c2: '#0f172a' },
    { value: 510, c1: '#f59e0b', c2: '#92400e' },
    { value: 480, c1: '#8b5cf6', c2: '#4c1d95' },
    { value: 710, c1: '#ef4444', c2: '#7f1d1d' },
    { value: 440, c1: '#22c55e', c2: '#14532d' },
    { value: 800, c1: '#d946ef', c2: '#701a75' },
    { value: 400, c1: '#fbbf24', c2: '#b45309' },
    { value: 580, c1: '#eab308', c2: '#854d0e' },
    { value: 490, c1: '#ec4899', c2: '#831843' },
    { value: 100, c1: '#475569', c2: '#1e293b' },
    { value: 430, c1: '#fb923c', c2: '#9a3412' },
    { value: 560, c1: '#4f46e5', c2: '#3730a3' },
    { value: 490, c1: '#06b6d4', c2: '#164e63' },
    { value: 520, c1: '#a855f7', c2: '#581c87' },
    { value: 100, c1: '#14b8a6', c2: '#134e4a' },
  ];

  const sessionTarget = useRef(Math.floor(Math.random() * 201) + 4300); // Unique 4300-4500 range
  
  const spin = () => {
    if (isSpinning) return;
    
    // Check if user has available spins (free or bought)
    if (spinsAvailable <= 0) return;
    
    setIsSpinning(true);

    const segmentsCount = rewards.length;
    const degreePerSegment = 360 / segmentsCount;
    const isFreePhase = totalSpinsDone < 10;
    
    let randomIndex;
    
    if (isFreePhase) {
        // Dynamic Target Math for lucky first 10
        const spinsRemaining = 10 - totalSpinsDone;
        const gap = sessionTarget.current - balance;
        const variance = totalSpinsDone < 5 ? 350 : (spinsRemaining > 1 ? 100 : 0);
        const nextTarget = (gap / spinsRemaining) + (Math.random() * (variance * 2) - variance);
        
        // Find closest reward segment
        let closestIndex = 0;
        let minDiff = Infinity;
        rewards.forEach((r, idx) => {
            const valDiff = Math.abs(r.value - nextTarget);
            if (valDiff < minDiff) {
                minDiff = valDiff;
                closestIndex = idx;
            }
        });
        randomIndex = closestIndex;
    } else {
        // Random rewards after free phase
        randomIndex = Math.floor(Math.random() * segmentsCount);
    }
    
    const extraSpins = 15 * 360; 
    const currentRotMod = rotation % 360;
    const targetCenter = (randomIndex * degreePerSegment) + (degreePerSegment / 2);
    const rotationNeeded = (360 - targetCenter - currentRotMod + 360) % 360;
    
    const newRotation = rotation + extraSpins + rotationNeeded;
    setRotation(newRotation);

    let tickInterval = setInterval(() => {
        setTick(prev => prev + 1);
    }, 120);

    setTimeout(() => {
      clearInterval(tickInterval);
      setIsSpinning(false);
      const winValue = rewards[randomIndex].value;
      showReward(winValue);
      incrementSpins();
    }, 5500);
  };

  return (
    <div style={{ 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh', 
      color: '#0d1b3e', 
      paddingBottom: '40px', 
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* Header */}
      <div style={{ padding: '20px 20px 0px', display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={() => navigate('/tasks')}
          style={{
            backgroundColor: '#efefef',
            border: 'none',
            color: '#0d1b3e',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={20} strokeWidth={3} />
        </button>
      </div>

      {/* Hero Stats Card - Image Match Layout */}
      <div style={{ padding: '10px 20px 20px' }}>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ 
            backgroundColor: '#0d1b3e', 
            borderRadius: '44px', 
            padding: '30px 24px', 
            color: '#fff',
            textAlign: 'center',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.2)', // Clean Shadow
            position: 'relative',
            overflow: 'hidden'
          }}>
          <h3 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '28px', color: '#fff', letterSpacing: '1.5px', textTransform: 'uppercase' }}>LUCKY REWARDS</h3>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '28px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '44px', fontWeight: 950, color: '#fff', lineHeight: 1 }}>{spinsAvailable}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: 800, marginTop: '8px' }}>Spins Left</div>
            </div>
            <div style={{ width: '1.5px', height: '50px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '0 10px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '44px', fontWeight: 950, color: '#fff', lineHeight: 1 }}>
                 <span style={{ color: '#ffb800' }}>₹</span>{points}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: 800, marginTop: '8px' }}>Total Won</div>
            </div>
          </div>
          
          {/* No direct Purchase button as work should have no initial pay barrier */}
        </motion.div>
      </div>

      {/* Extreme Realistic Spin Wheel */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        position: 'relative',
        padding: '20px'
      }}>
        
        {/* Physical Pointer Hub at Top */}
        <div style={{
            position: 'absolute',
            top: '0px',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <motion.div 
               animate={isSpinning ? { 
                   rotate: [0, -20, 10, -15, 0],
               } : {}}
               transition={{ duration: 0.1, repeat: Infinity }}
               style={{
                width: '38px',
                height: '56px',
                backgroundColor: '#f43f5e',
                clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
                borderRadius: '4px',
                position: 'relative',
                zIndex: 2
             }} />
             <div style={{ width: '12px', height: '12px', backgroundColor: '#fff', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.3)', position: 'relative', top: '-52px', zIndex: 3 }} />
        </div>

        {/* Wheel Assembly - Simplified Premium Finish */}
        <div style={{ 
          width: '330px', 
          height: '330px', 
          borderRadius: '50%', 
          backgroundColor: '#0d1b3e', 
          padding: '8px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
          border: '10px solid #1e293b',
          outline: '1px solid rgba(255,255,255,0.05)'
        }}>
          {/* Mechanical Pins */}
          {[...Array(18)].map((_, i) => (
            <div 
              key={i} 
              style={{
                position: 'absolute',
                width: '5px',
                height: '5px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 20}deg) translateY(-158px)`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                zIndex: 4
              }} 
            />
          ))}

          {/* The Spinning Disk */}
          <div style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: '50%', 
            transition: 'transform 5.5s cubic-bezier(0.1, 0, 0, 1)',
            transform: `rotate(${rotation}deg)`,
            overflow: 'hidden',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.7)',
            zIndex: 2,
            position: 'relative'
          }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              <defs>
                {rewards.map((reward, i) => (
                  <linearGradient id={`grad-${i}`} key={i} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={reward.c1} />
                    <stop offset="100%" stopColor={reward.c2} />
                  </linearGradient>
                ))}
              </defs>
              {rewards.map((reward, i) => {
                const angle = (360 / rewards.length) * i;
                const nextAngle = (360 / rewards.length) * (i + 1);
                const x1 = 50 + 50 * Math.cos((angle - 90) * Math.PI / 180);
                const y1 = 50 + 50 * Math.sin((angle - 90) * Math.PI / 180);
                const x2 = 50 + 50 * Math.cos((nextAngle - 90) * Math.PI / 180);
                const y2 = 50 + 50 * Math.sin((nextAngle - 90) * Math.PI / 180);
                return (
                  <g key={i}>
                    <path d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`} fill={`url(#grad-${i})`} stroke="rgba(255,255,255,0.05)" strokeWidth="0.1" />
                    <text 
                        x="50" y="14" 
                        transform={`rotate(${angle + (360 / rewards.length) / 2} 50 50)`} 
                        fill="#fff" 
                        fontSize="3.8" 
                        fontWeight="950" 
                        textAnchor="middle"
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}
                    >
                        ₹{reward.value}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Cap */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
            border: '4px solid #1e293b',
            boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20
          }}>
             <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
             }}>
                <Star size={18} fill="#ffb800" stroke="none" />
             </div>
          </div>
        </div>
      </div>

      {/* Action Button - Large Pill Shape */}
      <div style={{ padding: '30px 20px', textAlign: 'center' }}>
        <motion.button 
          onClick={spin}
          disabled={isSpinning || spinsAvailable <= 0}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '100%',
            maxWidth: '280px',
            height: '64px',
            background: isSpinning ? '#1e293b' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: '#fff',
            borderRadius: '100px',
            border: 'none',
            fontSize: '18px',
            fontWeight: 950,
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: isSpinning ? 'none' : '0 12px 24px rgba(37, 99, 235, 0.3)',
            cursor: 'pointer',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {isSpinning ? (
              <RefreshCw className="spin" size={24} />
          ) : (
             <>
                <Play size={20} fill="#fff" />
                SPIN NOW
             </>
          )}
        </motion.button>
        
        <p style={{ marginTop: '16px', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.2px', opacity: 0.6 }}>
            {isSpinning ? 'PROCESSING SPIN...' : 'TAP TO START WINNING'}
        </p>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px', opacity: 0.4 }}>
             <ShieldCheck size={18} />
             <Trophy size={18} />
             <Star size={18} />
        </div>
      </div>

      <style>
        {`
          .spin { animation: full-spin 0.6s linear infinite; }
          @keyframes full-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}
      </style>
    </div>
  );
};
