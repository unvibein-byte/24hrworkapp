import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  ArrowLeft, 
  Wallet as WalletIcon, 
  Smartphone, 
  CreditCard, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Withdraw = () => {
  const navigate = useNavigate();
  const { balance, user, setIsUnlockModalOpen, isInstantWithdrawalUnlocked, totalSpinsDone } = useAppContext();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('UPI');
  const [id, setId] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!amount || amount < 500) {
      alert('Minimum withdrawal is ₹500');
      return;
    }
    if (amount > balance) {
      alert('Insufficient balance');
      return;
    }
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      setSuccess(true);
    }, 2000);
  };

  // Mission Check 1: Minimum Balance
  if (balance < 5000) {
    return (
      <div style={{ padding: '0 20px 100px', backgroundColor: '#f8fafc', minHeight: '100vh', textAlign: 'center' }}>
        <div style={{ padding: '20px 0', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px', borderRadius: '12px', backgroundColor: '#fff' }}>
            <ArrowLeft size={24} color="#1e293b" />
          </button>
        </div>

        <div style={{ marginTop: '40px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '32px',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
            border: '2px solid #3b82f6'
          }}>
            <WalletIcon size={48} color="#3b82f6" />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 950, color: '#1e293b', marginBottom: '16px' }}>₹5,000 Required</h2>
          <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '300px', margin: '0 auto 40px', lineHeight: '1.7', fontWeight: 600 }}>
            To ensure secure payouts, your first withdrawal requires a minimum balance of <span style={{ color: '#3b82f6', fontWeight: 900 }}>₹5,000</span>.
          </p>

          <div style={{
            backgroundColor: '#fff',
            padding: '24px',
            borderRadius: '32px',
            marginBottom: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
            border: '1.5px dashed #cbd5e1'
          }}>
             <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 800, marginBottom: '8px' }}>Your Progress</div>
             <div style={{ fontSize: '32px', fontWeight: 950, color: '#0d1b3e' }}>₹{balance.toFixed(0)} <span style={{ fontSize: '14px', color: '#94a3b8' }}>/ ₹5000</span></div>
             <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '10px', marginTop: '16px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(balance / 5000) * 100}%` }}
                  style={{ height: '100%', backgroundColor: '#3b82f6' }} 
                />
             </div>
          </div>

          <button 
            onClick={() => navigate('/tasks/spin')}
            style={{
              width: '100%',
              backgroundColor: '#3b82f6',
              color: '#fff',
              padding: '20px',
              borderRadius: '24px',
              fontSize: '17px',
              fontWeight: 900,
              border: 'none',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
              cursor: 'pointer'
            }}
          >
            Earn More & Withdraw
          </button>
        </div>
      </div>
    );
  }

  // Mission Check 2: Instant Withdrawal Activation
  if (!isInstantWithdrawalUnlocked) {
    return (
      <div style={{ padding: '0 20px 100px', backgroundColor: '#f8fafc', minHeight: '100vh', textAlign: 'center' }}>
        <div style={{ padding: '20px 0', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px', borderRadius: '12px', backgroundColor: '#fff' }}>
            <ArrowLeft size={24} color="#1e293b" />
          </button>
        </div>

        <div style={{ marginTop: '60px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            backgroundColor: '#fffbeb',
            color: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 10px 20px rgba(245, 158, 11, 0.1)'
          }}>
            <AlertCircle size={40} />
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 950, color: '#1e293b', marginBottom: '12px' }}>Final Mission</h2>
          <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '300px', margin: '0 auto 32px', lineHeight: '1.7', fontWeight: 600 }}>
            Great job! You reached ₹5000. Now activate <span style={{ color: '#0d1b3e', fontWeight: 900 }}>Instant Withdrawal</span> to receive your funds immediately.
          </p>
          
          <button 
            onClick={() => setIsUnlockModalOpen(true)}
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
            Activate Withdrawal
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ padding: '0 20px 100px', backgroundColor: '#f8fafc', minHeight: '100vh', textAlign: 'center' }}>
        <div style={{ marginTop: '100px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: '#f0fdf4',
            color: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            boxShadow: '0 10px 30px rgba(22, 163, 74, 0.1)'
          }}>
            <CheckCircle2 size={56} />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>Request Sent!</h2>
          <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '40px' }}>
            Your ₹{amount} withdrawal is being processed. Funds will reach your account in 30 mins.
          </p>
          <button 
            onClick={() => navigate('/wallet')}
            style={{
              backgroundColor: '#0d1b3e',
              color: '#fff',
              padding: '16px 40px',
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer'
            }}
          >Back to Wallet</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 20px 100px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <ArrowLeft size={24} color="#1e293b" />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>Withdraw Funds</h2>
        <HelpCircle size={24} color="#64748b" />
      </div>

      {/* Balance Summary */}
      <div style={{
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '32px',
        marginTop: '20px',
        marginBottom: '32px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
        border: '1px solid #f1f5f9',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Balance</div>
        <div style={{ fontSize: '40px', fontWeight: 900, color: '#3b82f6', margin: '12px 0 8px' }}>₹{balance.toFixed(2)}</div>
        <div style={{ 
          fontSize: '12px', 
          color: '#10b981', 
          backgroundColor: '#f0fdf4', 
          padding: '4px 12px', 
          borderRadius: '100px', 
          display: 'inline-block',
          fontWeight: 800
        }}>● Ready to Withdraw</div>
      </div>

      <form onSubmit={handleWithdraw}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>Selected Payment Method</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          <div 
            onClick={() => setMethod('UPI')}
            style={{
              padding: '20px',
              borderRadius: '24px',
              backgroundColor: method === 'UPI' ? '#eff6ff' : '#fff',
              border: `2px solid ${method === 'UPI' ? '#3b82f6' : '#f1f5f9'}`,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Smartphone size={24} color={method === 'UPI' ? '#3b82f6' : '#94a3b8'} style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '13px', fontWeight: 800, color: method === 'UPI' ? '#1e293b' : '#94a3b8' }}>UPI ID</div>
          </div>
          <div 
            onClick={() => setMethod('Bank')}
            style={{
              padding: '20px',
              borderRadius: '24px',
              backgroundColor: method === 'Bank' ? '#eff6ff' : '#fff',
              border: `2px solid ${method === 'Bank' ? '#3b82f6' : '#f1f5f9'}`,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <CreditCard size={24} color={method === 'Bank' ? '#3b82f6' : '#94a3b8'} style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '13px', fontWeight: 800, color: method === 'Bank' ? '#1e293b' : '#94a3b8' }}>Bank A/C</div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '10px' }}>Enter {method} ID / Phone</label>
          <input 
            type="text" 
            placeholder={method === 'UPI' ? "example@upi" : "9876543210"}
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{
              width: '100%',
              padding: '18px 20px',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              fontSize: '15px',
              fontWeight: 600,
              outline: 'none',
              backgroundColor: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
            }}
          />
        </div>

        <div style={{ marginBottom: '40px' }}>
          <label style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '10px' }}>Enter Amount (Min ₹500)</label>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>₹</div>
            <input 
              type="number" 
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '18px 20px 18px 45px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                fontSize: '18px',
                fontWeight: 900,
                outline: 'none',
                backgroundColor: '#fff',
                color: '#3b82f6'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
            {[500, 1000, 2000, 5000].map((val) => (
              <button 
                key={val}
                type="button"
                onClick={() => setAmount(val.toString())}
                style={{
                  padding: '8px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#64748b',
                  cursor: 'pointer'
                }}
              >₹{val}</button>
            ))}
          </div>
        </div>

        <button 
          disabled={withdrawing}
          style={{
            width: '100%',
            backgroundColor: withdrawing ? '#94a3b8' : '#0d1b3e',
            color: '#fff',
            padding: '20px',
            borderRadius: '20px',
            fontSize: '17px',
            fontWeight: 800,
            border: 'none',
            boxShadow: '0 8px 24px rgba(13, 27, 62, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {withdrawing ? 'Processing...' : 'Confirm Withdrawal'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '32px', opacity: 0.6 }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>100% Safe & Secure Withdrawals</p>
      </div>
    </div>
  );
};
