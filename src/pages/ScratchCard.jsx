import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Gift, RefreshCw, Sparkles, Trophy, ShieldCheck, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const ScratchCard = () => {
  const navigate = useNavigate();
  const { showReward, points, isRewardOpen, openPurchaseModal } = useAppContext();

  const canvasRef = useRef(null);
  const prevIsRewardOpen = useRef(isRewardOpen);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchReward, setScratchReward] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchedPercentage, setScratchedPercentage] = useState(0);
  const [scratchesLeft, setScratchesLeft] = useState(5);

  const generateReward = () => {
    if (scratchesLeft <= 0) return;
    const reward = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
    setScratchReward(reward);
    setIsScratched(false);
    setScratchedPercentage(0);
    setTimeout(() => {
      initCanvas();
    }, 50);
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;

    // Premium Golden Metallic Foil
    const gradient = ctx.createLinearGradient(0, 0, 300, 300);
    gradient.addColorStop(0, '#fbbf24'); // Lighter gold
    gradient.addColorStop(0.5, '#f59e0b'); // Base gold
    gradient.addColorStop(1, '#b45309'); // Deep gold

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 300);

    // Add metallic "grain" texture
    for (let i = 0; i < 2000; i++) {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
        ctx.fillRect(Math.random() * 300, Math.random() * 300, 1, 1);
    }

    // Centered "SCRATCH HERE" Text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '900 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', 150, 155);
  };

  useEffect(() => {
    generateReward();
  }, []);

  useEffect(() => {
    if (prevIsRewardOpen.current === true && isRewardOpen === false && isScratched && scratchesLeft > 0) {
      generateReward();
    }
    prevIsRewardOpen.current = isRewardOpen;
  }, [isRewardOpen, isScratched, scratchesLeft]);

  const getPointerPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const scratch = (e) => {
    if (!isDrawing || isScratched) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getPointerPos(e);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] < 50) transparentPixels++;
    }

    const percentage = (transparentPixels / (canvas.width * canvas.height)) * 100;
    setScratchedPercentage(percentage);

    if (percentage > 65 && !isScratched) {
      if (scratchesLeft <= 0) return;
      setIsScratched(true);
      setScratchesLeft(prev => prev - 1);
      revealAll();
      showReward(scratchReward);
    }
  };

  const revealAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    scratch(e);
  };

  const stopDrawing = () => setIsDrawing(false);

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
      <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center' }}>
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

      {/* Hero Stats Card - Updated Blue Theme */}
      <div style={{ padding: '10px 20px 20px' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            backgroundColor: '#3b82f6',
            borderRadius: '44px',
            padding: '30px 24px',
            color: '#fff',
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(59, 130, 246, 0.2)', // Clean Shadow
            position: 'relative',
            overflow: 'hidden'
          }}>
          <h3 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '28px', color: '#fff', letterSpacing: '1.5px', textTransform: 'uppercase' }}>LUCKY REWARDS</h3>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '28px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '44px', fontWeight: 950, color: '#fff', lineHeight: 1 }}>{scratchesLeft}</div>
              <div style={{ fontSize: '13px', color: '#fff', fontWeight: 800, marginTop: '8px' }}>Scratches Left</div>
            </div>
            <div style={{ width: '1.5px', height: '50px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 10px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '44px', fontWeight: 950, color: '#fff', lineHeight: 1 }}>
                <span style={{ color: '#ffeb3b' }}>₹</span>{points}
              </div>
              <div style={{ fontSize: '13px', color: '#fff', fontWeight: 800, marginTop: '8px' }}>Total Won</div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => openPurchaseModal('scratches')}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1.5px solid rgba(255, 255, 255, 0.4)',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 900,
              padding: '12px 40px',
              borderRadius: '100px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            BUY SCRATCHES
          </motion.button>
        </motion.div>
      </div>

      {/* Realistic Scratch Assembly - Golden Theme */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        position: 'relative'
      }}>
        <div style={{
          width: '320px',
          height: '320px',
          backgroundColor: '#3b82f6',
          borderRadius: '44px',
          padding: '12px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(251, 191, 36, 0.4)', // Elegant Gold Thread Border
          overflow: 'hidden'
        }}>
          {/* Underlayer with high contrast prize area */}
          <div style={{
            position: 'absolute',
            inset: '12px',
            borderRadius: '32px',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)'
          }}>
             <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ textAlign: 'center' }}>
                <Trophy size={60} color="#ffb800" fill="#ffb800" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '48px', fontWeight: 950, color: '#0d1b3e', lineHeight: 1 }}>₹{scratchReward}</div>
                <div style={{ fontSize: '10px', fontWeight: 900, color: '#64748b', letterSpacing: '1px', marginTop: '4px' }}>ADDED TO WALLET</div>
             </motion.div>
          </div>

          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={scratch}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={scratch}
            onTouchEnd={stopDrawing}
            style={{
              position: 'relative',
              zIndex: 2,
              cursor: 'crosshair',
              touchAction: 'none',
              borderRadius: '32px'
            }}
          />
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', opacity: 0.5 }}>
                 <ShieldCheck size={20} color="#10b981" />
                 <Trophy size={20} color="#ffb800" />
                 <Zap size={20} color="#3b82f6" />
            </div>
            <p style={{ marginTop: '20px', fontSize: '13px', fontWeight: 700, color: '#64748b' }}>
                {scratchedPercentage < 65 ? 'SCRATCH TO WIN!' : 'COLLECTED!'}
            </p>
        </div>
      </div>
    </div>
  );
};
