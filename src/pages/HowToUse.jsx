import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Info, CheckCircle2, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowToUse = () => {
  const navigate = useNavigate();

  const instructions = [
    { title: "Copy Student Data", desc: "Look at the top card and copy Name, Marks, and Status exactly as shown.", icon: <Star size={20} /> },
    { title: "Fill the Form", desc: "Type the details into the entry fields. Be precise to avoid errors.", icon: <Zap size={20} /> },
    { title: "Submit & Earn", desc: "Click Submit to verify and earn ₹5 instantly per form.", icon: <CheckCircle2 size={20} /> },
    { title: "Instant Withdrawal", desc: "Once you reach the threshold, withdraw directly to your UPI/Bank.", icon: <Play size={20} /> }
  ];

  return (
    <div style={{ padding: '0 20px 100px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ padding: '24px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <ArrowLeft size={24} color="#1e293b" />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>Tutorial</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0d1b3e', marginBottom: '12px' }}>How can use app?</h1>
        <p style={{ color: '#64748b', fontSize: '15px', fontWeight: 600 }}>Watch this short video to learn how to earn ₹1,000+ daily.</p>
      </div>

      {/* Video Section */}
      <div style={{
        width: '100%',
        aspectRatio: '16/9',
        backgroundColor: '#000',
        borderRadius: '32px',
        overflow: 'hidden',
        marginBottom: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        border: '3px solid #fff'
      }}>
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
          title="Tutorial Video" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>

      {/* Interactive Guide */}
      <div style={{ display: 'grid', gap: '20px', marginBottom: '40px' }}>
        {instructions.map((step, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '28px',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
              border: '1px solid #f1f5f9'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              backgroundColor: '#eff6ff',
              color: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {step.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>{step.title}</h3>
              <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, lineHeight: '1.5' }}>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Start Button */}
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/tasks')}
        style={{
          width: '100%',
          backgroundColor: '#0d1b3e',
          color: '#fff',
          padding: '22px',
          borderRadius: '24px',
          fontSize: '18px',
          fontWeight: 900,
          border: 'none',
          boxShadow: '0 15px 30px rgba(13, 27, 62, 0.25)',
          cursor: 'pointer'
        }}
      >
        Start My First Task
      </motion.button>
    </div>
  );
};
