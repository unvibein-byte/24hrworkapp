import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Phone, User, ArrowRight, Zap } from 'lucide-react';

export const Login = () => {
  const { login, setIsTelegramModalOpen } = useAppContext();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 3 || phone.length < 10) {
      alert('Please enter valid name and 10-digit number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(name, phone);
      setIsTelegramModalOpen(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d1b3e', // Professional Dark Blue
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 24px',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)' }} />

      {/* Header Info */}
      <div style={{ marginTop: '60px', marginBottom: '40px' }}>
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}
        >
          <div style={{ backgroundColor: '#fff', padding: '8px', borderRadius: '12px' }}>
             <Zap size={24} color="#0d1b3e" fill="#0d1b3e" />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 950, letterSpacing: '-0.02em' }}>24hrwork</h1>
        </motion.div>
        
        <motion.h2 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.1 }}
           style={{ fontSize: '42px', fontWeight: 950, lineHeight: '1.1', marginBottom: '16px', letterSpacing: '-0.03em' }}
        >
          Welcome <span style={{ color: '#3b82f6' }}>Back.</span>
        </motion.h2>
        <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}
        >
          Enter your details to start your daily earning mission today.
        </motion.p>
      </div>

      {/* Form Section */}
      <motion.form 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }}>
            <User size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Your Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1.5px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '20px 20px 20px 56px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700,
              outline: 'none',
              transition: 'all 0.3s'
            }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }}>
            <Phone size={20} />
          </div>
          <input 
            type="tel" 
            placeholder="Mobile Number" 
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            maxLength={10}
            style={{
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1.5px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '20px 20px 20px 56px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700,
              outline: 'none'
            }}
          />
        </div>

        <button 
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#3b82f6',
            color: '#fff',
            padding: '22px',
            borderRadius: '24px',
            fontSize: '18px',
            fontWeight: 900,
            border: 'none',
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: '0 15px 35px rgba(59, 130, 246, 0.3)',
            cursor: 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Authenticating...' : (
            <>Get Started <ArrowRight size={22} /></>
          )}
        </button>
      </motion.form>

      <p style={{ textAlign: 'center', marginTop: 'auto', fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
        By continuing, you agree to our Terms of Service.
      </p>
    </div>
  );
};
