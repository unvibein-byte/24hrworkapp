import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, Play, Type, Disc, Box, History, CreditCard, Plus, User, Crown, CheckCircle2, Coins, Verified, Zap } from 'lucide-react';

const LiveWithdrawals = () => {
  const withdrawals = [
    { phone: '981910xxxx', amount: 8479, time: 'Just now' },
    { phone: '787532xxxx', amount: 12760, time: '1m ago' },
    { phone: '912345xxxx', amount: 7240, time: '2m ago' },
    { phone: '998877xxxx', amount: 14500, time: '3m ago' },
    { phone: '887766xxxx', amount: 9320, time: '4m ago' },
    { phone: '776655xxxx', amount: 11150, time: '5m ago' },
    { phone: '955443xxxx', amount: 13890, time: '6m ago' },
    // Duplicate for seamless loop
    { phone: '981910xxxx', amount: 8479, time: 'Just now' },
    { phone: '787532xxxx', amount: 12760, time: '1m ago' },
  ];

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '24px 20px',
      borderRadius: '32px',
      marginBottom: '32px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
      border: '1px solid #f1f5f9',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ 
          width: '10px', 
          height: '10px', 
          borderRadius: '50%', 
          backgroundColor: '#10b981', 
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)',
          animation: 'pulse 2s infinite' 
        }} />
        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', letterSpacing: '-0.02em' }}>Live Withdrawals</h3>
      </div>

      <div style={{ 
        height: '180px', 
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          animation: 'scrollVertical 20s linear infinite'
        }}>
          {withdrawals.map((w, i) => (
            <div key={i} style={{
              backgroundColor: '#f8fafc',
              padding: '16px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #f1f5f9'
            }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '16px',
                  backgroundColor: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3b82f6'
                }}>
                  <User size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>{w.phone}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                    {w.time}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#10b981' }}>+₹{w.amount}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, opacity: 0.8 }}>UPI Success</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes scrollVertical {
            0% { transform: translateY(0); }
            100% { transform: translateY(-70%); }
          }
          @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
};

const PremiumAccessCard = () => {
  const { setIsUnlockModalOpen } = useAppContext();
  
  return (
    <div style={{
      padding: '2px',
      background: 'linear-gradient(135deg, #f472b6 0%, #3b82f6 50%, #a855f7 100%)',
      borderRadius: '32px',
      marginBottom: '24px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '30px',
        padding: '24px',
        position: 'relative'
      }}>
        <div style={{
          backgroundColor: '#db2777',
          color: '#fff',
          padding: '6px 16px',
          borderRadius: '100px',
          fontSize: '11px',
          fontWeight: 900,
          display: 'inline-block',
          marginBottom: '16px',
          letterSpacing: '0.5px'
        }}>PREMIUM ACCESS</div>
        
        <div style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          backgroundColor: '#eff6ff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#8b5cf6'
        }}>
          <Crown size={28} fill="#8b5cf6" style={{ opacity: 0.8 }} />
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginBottom: '20px' }}>Start Earning Today</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {[
            'Daily automated income',
            'Instant withdrawals to bank',
            '24/7 VIP Support'
          ].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle2 size={20} color="#10b981" fill="#10b98115" />
              <span style={{ fontSize: '15px', color: '#475569', fontWeight: 600 }}>{text}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setIsUnlockModalOpen(true)}
          style={{
          width: '100%',
          backgroundColor: '#0d1b3e',
          color: '#fff',
          padding: '18px',
          borderRadius: '20px',
          fontSize: '17px',
          fontWeight: 800,
          border: 'none',
          boxShadow: '0 8px 20px rgba(13, 27, 62, 0.2)',
          cursor: 'pointer'
        }}>
          View Plans & Start Earning
        </button>
      </div>
    </div>
  );
};

const StatsGrid = ({ balance, referralEarnings }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '28px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
      border: '1px solid #f1f5f9'
    }}>
      <div style={{ 
        width: '44px', 
        height: '44px', 
        backgroundColor: '#f8fafc', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '0 auto 12px',
        color: '#64748b'
      }}>
        <Coins size={22} />
      </div>
      <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>Refer Earnings</p>
      <div style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a' }}>₹{referralEarnings.toFixed(2)}</div>
    </div>
    
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '28px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
      border: '1px solid #f1f5f9'
    }}>
      <div style={{ 
        width: '44px', 
        height: '44px', 
        backgroundColor: '#eff6ff', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '0 auto 12px',
        color: '#3b82f6'
      }}>
        <CreditCard size={22} />
      </div>
      <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>Withdrawable</p>
      <div style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a' }}>₹{balance.toFixed(2)}</div>
    </div>
  </div>
);

export const Home = () => {
  const navigate = useNavigate();
  const { balance, referralEarnings, openPurchaseModal } = useAppContext();

  const handleTaskClick = (path) => {
    if (path) navigate(path);
  };

  return (
    <div style={{ padding: '0 20px 100px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Sleek Balance Card */}
      <div style={{
        padding: '32px 24px',
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        borderRadius: '42px',
        marginTop: '20px',
        marginBottom: '32px',
        color: '#fff',
        boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 600, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Current Balance</div>
          <div style={{ fontSize: '48px', fontWeight: 800, margin: '8px 0 24px' }}>₹{balance.toFixed(2)}</div>
          
            <button 
              onClick={() => navigate('/withdraw')}
              style={{
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                padding: '16px',
                borderRadius: '100px',
                color: '#fff',
                fontWeight: 900,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }}
            >
              <CreditCard size={18} /> Withdraw Funds
            </button>
        </div>
        
        {/* Decor */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '120px',
          height: '120px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%'
        }} />
      </div>

      <LiveWithdrawals />

      {/* Payment Proof Section */}
      <div style={{
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '42px',
        marginBottom: '32px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
        border: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer'
      }} onClick={() => window.open('https://sites.google.com/view/24hrwork', '_blank')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '18px',
            backgroundColor: '#0d1b3e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 8px 16px rgba(13, 27, 62, 0.2)'
          }}>
            <Verified size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#1e293b' }}>Payment Proofs</h3>
            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>Real user earnings verified</p>
          </div>
        </div>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '12px',
          backgroundColor: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b'
        }}>
          <ChevronRight size={20} strokeWidth={3} />
        </div>
      </div>

      <PremiumAccessCard />

      <StatsGrid balance={balance} referralEarnings={referralEarnings} />


      <div style={{
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '24px',
        border: '1px dashed #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        color: '#64748b',
        cursor: 'pointer'
      }}>
        <History size={20} />
        <span style={{ fontWeight: 600 }}>View Transaction History</span>
      </div>
    </div>
  );
};
