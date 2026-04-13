import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Rocket, 
  TrendingUp, 
  Trophy,
  ChevronRight,
  Target,
  Crown,
  Star,
  RefreshCcw,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const FeatureItem = ({ title, icon: Icon, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
    <div style={{
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: `${color}15`,
      color: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <CheckCircle2 size={16} strokeWidth={3} />
    </div>
    <span style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>{title}</span>
  </div>
);

const PlanCard = ({ title, price, subtitle, features, isPopular, color, originalPrice = "2000", setIsKycModalOpen, setIsGoldPlanActive }) => {
  const handleUpgrade = () => {
    alert(`Upgrading to ${title} for ₹${price}...`);
    // Simulated success logic
    if (price === '499') {
      setIsGoldPlanActive(true);
    }
  };

  return (
    <div style={{
      minWidth: '100%',
      padding: '0 10px',
      boxSizing: 'border-box'
    }}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0.8 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ type: 'spring', damping: 20 }}
        style={{
          backgroundColor: '#fff',
          borderRadius: '40px',
          padding: '40px 28px',
          position: 'relative',
          border: isPopular ? `3px solid ${color}` : '1px solid #f1f5f9',
          boxShadow: isPopular ? `0 25px 50px ${color}15` : '0 10px 30px rgba(0,0,0,0.02)',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {isPopular && (
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '25px',
            backgroundColor: color,
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '100px',
            fontSize: '11px',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Star size={12} fill="#fff" /> Best Value
          </div>
        )}

        {/* Label 100% Refundable */}
        <div style={{
          backgroundColor: '#f0fdf4',
          color: '#10b981',
          padding: '6px 12px',
          borderRadius: '10px',
          fontSize: '12px',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          width: 'fit-content',
          marginBottom: '20px'
        }}>
          <RefreshCcw size={14} /> 100% Refundable
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '16px', 
              backgroundColor: `${color}10`, 
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Crown size={28} fill={color} />
            </div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#1e293b' }}>{title}</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Price Section with Discount */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ fontSize: '18px', color: '#ef4444', textDecoration: 'line-through', fontWeight: 700 }}>₹{originalPrice}</span>
            <span style={{ fontSize: '52px', fontWeight: 900, color: '#1e293b' }}>₹{price}</span>
          </div>
          <p style={{ fontSize: '12px', color: '#10b981', fontWeight: 800, marginTop: '4px' }}>Save 80% Today</p>
        </div>

        <div style={{ marginBottom: '40px', flex: 1 }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Exclusive Features:</h4>
          {features.map((f, i) => (
            <FeatureItem key={i} title={f} color={color} />
          ))}
        </div>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={handleUpgrade}
          style={{
            width: '100%',
            backgroundColor: color,
            border: 'none',
            padding: '24px',
            borderRadius: '24px',
            color: '#fff',
            fontWeight: 900,
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: `0 12px 24px ${color}30`,
            cursor: 'pointer'
          }}
        >
          Get Unlimited Access <ArrowRight size={20} />
        </motion.button>

      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
        Refundable Amount: ₹{price} (Within 1 Hour Guaranteed)
      </p>
    </motion.div>
  </div>
    );
};

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(11 * 60 + 45); // 11m 45s

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div style={{
            backgroundColor: '#ef4444',
            color: '#fff',
            padding: '14px',
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
        }}>
            <Zap size={16} fill="#fff" /> Special Offer Ends In: <span style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                padding: '4px 12px', 
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'monospace',
                marginLeft: '4px'
            }}>{formatTime(timeLeft)}</span>
        </div>
    );
};

export const Upgrade = () => {
  const navigate = useNavigate();
  const { balance, referralEarnings, setIsKycModalOpen, setIsGoldPlanActive } = useAppContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const [spotsLeft, setSpotsLeft] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
        setSpotsLeft(prev => {
            if (prev <= 2) return 2;
            const shouldDrop = Math.random() > 0.7; // 30% chance to drop
            return shouldDrop ? prev - 1 : prev;
        });
    }, 15000); // Check every 15 seconds
    return () => clearInterval(timer);
  }, []);

  const handleTaskClick = (path) => {
    if (path) navigate(path);
  };

  const plans = [
    {
      title: "Silver Plan",
      price: "199",
      subtitle: "Basic entry for beginners",
      color: "#3b82f6",
      features: [
        "Earn up to ₹500 Daily",
        "Instant Withdrawal (48h)",
        "Daily 10 Lucky Spins",
        "Standard Support Access",
        "100% Refundable After Work"
      ]
    },
    {
      title: "Gold Plan",
      price: "499",
      subtitle: "Highest rated by users",
      isPopular: true,
      color: "#8b5cf6",
      features: [
        "Unlimited Daily Earnings",
        "Ultra-Fast Cashout (3s)",
        "Unlimited Spins & Scratches",
        "Priority VIP Task Access",
        "24/7 Dedicated Support",
        "100% Refundable Anytime"
      ]
    }
  ];

  return (
    <div style={{ 
      padding: '0 0 120px', 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      <CountdownTimer />
      
      <div style={{ textAlign: 'center', padding: '40px 20px 20px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 950, color: '#0d1b3e', marginBottom: '12px', letterSpacing: '-0.03em' }}>Unlock Premium</h2>
        <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 600, maxWidth: '280px', margin: '0 auto' }}>Special offer for today! All plans are **100% refundable**.</p>
      </div>

      {/* Spots Remaining Emergency Banner */}
      <div style={{ padding: '0 25px' }}>
        <div style={{
            backgroundColor: '#fff',
            padding: '16px 20px',
            borderRadius: '24px',
            border: '2px solid #fee2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.05)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#fee2e2',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ef4444'
                }}>
                    <Target size={18} />
                </div>
                <div>
                   <div style={{ fontSize: '13px', fontWeight: 900, color: '#0d1b3e' }}>Spots Remaining</div>
                   <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 800 }}>Only {spotsLeft} slots left for today!</div>
                </div>
            </div>
            <div style={{ width: '80px', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: '80%' }}
                  animate={{ width: `${100 - (spotsLeft * 5)}%` }}
                  style={{ height: '100%', backgroundColor: '#ef4444' }} />
            </div>
        </div>
      </div>

      {/* Slider Container */}
      <div style={{
          position: 'relative',
          padding: '20px 0'
      }}>
          <div 
            ref={scrollRef}
            onScroll={(e) => {
                const scrollLeft = e.target.scrollLeft;
                const width = e.target.clientWidth;
                const newIndex = Math.round(scrollLeft / width);
                if (newIndex !== activeIndex) setActiveIndex(newIndex);
            }}
            style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '0 20px',
            gap: '0',
            scrollBehavior: 'smooth'
          }}>
            {plans.map((p, i) => (
               <div key={i} style={{ 
                    flex: '0 0 100%', 
                    scrollSnapAlign: 'center',
                    padding: '0 10px',
                    boxSizing: 'border-box'
                }}>
                   <PlanCard {...p} setIsKycModalOpen={setIsKycModalOpen} setIsGoldPlanActive={setIsGoldPlanActive} />
               </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginTop: '32px' 
          }}>
            {plans.map((_, i) => (
              <div 
                key={i} 
                onClick={() => {
                    if (scrollRef.current) {
                        scrollRef.current.scrollTo({
                            left: i * scrollRef.current.clientWidth,
                            behavior: 'smooth'
                        });
                    }
                }}
                style={{
                    width: i === activeIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '100px',
                    backgroundColor: i === activeIndex ? '#3b82f6' : '#cbd5e1',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                }} 
              />
            ))}
          </div>
      </div>

      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px', opacity: 0.7 }}>
          <ShieldCheck size={36} color="#3b82f6" />
          <Target size={36} color="#8b5cf6" />
          <RefreshCcw size={36} color="#10b981" />
        </div>
        <p style={{ fontSize: '14px', color: '#1e293b', fontWeight: 800 }}>Secure SSL Encryption • Money-back Guarantee</p>
      </div>

      <style>
        {`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};
