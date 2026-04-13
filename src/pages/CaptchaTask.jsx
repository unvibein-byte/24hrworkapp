import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, ShieldCheck, Zap, History, CreditCard, Gamepad2, XCircle, Gift, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ActionButton = ({ label, color, icon: Icon, onClick, fullWidth = false }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    style={{
      backgroundColor: color,
      color: '#fff',
      padding: '16px',
      borderRadius: '24px',
      fontSize: '14px',
      fontWeight: 800,
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      width: fullWidth ? '100%' : 'auto',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      cursor: 'pointer'
    }}
  >
    {Icon && <Icon size={20} />}
    <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
  </motion.button>
);

export const CaptchaTask = () => {
  const navigate = useNavigate();
  const { showReward } = useAppContext();
  
  const [data, setData] = useState({ name: '', marks: '', status: '' });
  const [userInput, setUserInput] = useState({ name: '', marks: '', status: '' });
  const [status, setStatus] = useState('idle');
  const [showError, setShowError] = useState(false);

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
    showReward(5);
    setTimeout(() => {
      generateNewData();
    }, 1000);
  };

  return (
    <div style={{ 
      padding: '0 16px 120px', 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh',
      color: '#0d1b3e',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Header with Back button */}
      <div style={{ padding: '20px 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button 
          onClick={() => navigate('/tasks')}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#0d1b3e',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={24} />
        </button>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/how-to-use')}
          style={{
            backgroundColor: '#0d1b3e',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 800,
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Info size={16} /> How can use app
        </motion.button>
      </div>

      {/* Top Source Card - Blue Bordered as per Image */}
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
            <span>Student Name</span> <span>=</span> <span style={{ fontWeight: 800 }}>{data.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <span>Obtained Marks</span> <span>=</span> <span style={{ fontWeight: 800 }}>{data.marks}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <span>Fail/Pass</span> <span>=</span> <span style={{ fontWeight: 800 }}>{data.status}</span>
          </div>
        </div>
      </div>

      {/* Income Banner - Dark Blue as per Image */}
      <div style={{
        backgroundColor: '#0d1b3e',
        color: '#fff',
        padding: '16px',
        borderRadius: '16px',
        textAlign: 'center',
        fontWeight: 800,
        fontSize: '22px',
        marginBottom: '20px',
        boxShadow: '0 8px 16px rgba(13, 27, 62, 0.2)'
      }}>
        Income : ₹5/Form
      </div>

      {/* Input Form Card - as per Image */}
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
                borderRadius: '30px',
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

      <AnimatePresence>
        {showError && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(13, 27, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20000,
            padding: '20px'
          }}>
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              style={{
                width: '100%',
                maxWidth: '360px',
                background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
                borderRadius: '36px',
                padding: '40px 24px',
                textAlign: 'center',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                border: '2px solid #ef4444',
                position: 'relative',
                overflow: 'hidden'
              }}>
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #ef4444, #991b1b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)'
              }}>
                <XCircle size={48} color="#fff" />
              </div>

              <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '8px', color: '#fff' }}>Wrong Entry!</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600, marginBottom: '32px', fontSize: '15px' }}>
                Please check the source data and try again. Correct data is auto-filled for you.
              </p>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  generateNewData();
                  setShowError(false);
                }}
                style={{
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  padding: '18px 30px',
                  borderRadius: '16px',
                  fontSize: '18px',
                  fontWeight: 900,
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  boxShadow: '0 8px 16px rgba(239, 68, 68, 0.3)'
                }}
              >
                TRY AGAIN
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '20px', marginLeft: '4px' }}>Task Shortcuts</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <ActionButton label="Wallet" color="#10b981" icon={CreditCard} onClick={() => navigate('/wallet')} />
        <ActionButton label="Payment Proof" color="#3b82f6" icon={Zap} onClick={() => {}} />
        <ActionButton label="Scratch Card" color="#ec4899" icon={Gift} onClick={() => {}} />
        <ActionButton label="Spin & Win" color="#8b5cf6" icon={Gamepad2} onClick={() => navigate('/tasks/spin')} />
      </div>

    </div>
  );
};
