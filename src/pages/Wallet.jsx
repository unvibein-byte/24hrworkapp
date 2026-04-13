import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet as WalletIcon, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  History, 
  CreditCard,
  Smartphone,
  ChevronRight,
  TrendingUp,
  Download,
  Verified
} from 'lucide-react';

const ActionButton = ({ icon: Icon, label, color, onClick }) => (
  <div onClick={onClick} style={{ textAlign: 'center', cursor: 'pointer', flex: 1 }}>
    <div style={{
      width: '60px',
      height: '60px',
      borderRadius: '20px',
      backgroundColor: `${color}10`,
      color: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '8px',
      margin: '0 auto 8px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.02)',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      border: `1px solid ${color}05`
    }}>
      <Icon size={24} />
    </div>
    <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>{label}</div>
  </div>
);

const TransactionItem = ({ type, amount, id, date, status }) => {
  const isIncome = type === 'earn' || type === 'refer';
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '16px',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
      border: '1px solid #f1f5f9'
    }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '16px',
          backgroundColor: isIncome ? '#f0fdf4' : '#fef2f2',
          color: isIncome ? '#22c55e' : '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {isIncome ? <TrendingUp size={22} /> : <Download size={22} />}
        </div>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b', textTransform: 'capitalize' }}>{type}</h4>
          <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{date} • {id}</p>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '16px', fontWeight: 900, color: isIncome ? '#16a34a' : '#dc2626' }}>
          {isIncome ? '+' : '-'}₹{amount}
        </div>
        <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 800 }}>{status}</div>
      </div>
    </div>
  );
};

export const Wallet = () => {
  const navigate = useNavigate();
  const { balance, user, setIsUnlockModalOpen } = useAppContext();

  const handleAction = (type) => {
    switch(type) {
      case 'withdraw':
        if (!user.hasPaidUnlock) {
          setIsUnlockModalOpen(true);
        } else {
          navigate('/withdraw');
        }
        break;
      case 'upgrade':
        navigate('/upgrade');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'status':
        alert('Transaction history is being synchronized. Please wait...');
        break;
      default:
        navigate('/upgrade');
    }
  };

  const transactions = [
    { type: 'withdraw', amount: 350, id: '#TXN4829', status: 'Success', date: '21 Oct, 10:30 AM' },
    { type: 'earn', amount: 500, id: '#RXN9283', status: 'Success', date: '21 Oct, 09:12 AM' },
    { type: 'refer', amount: 50, id: '#RXN9280', status: 'Success', date: '20 Oct, 08:45 PM' },
    { type: 'withdraw', amount: 150, id: '#TXN4820', status: 'Success', date: '20 Oct, 02:20 PM' },
  ];

  return (
    <div style={{ padding: '0 20px 100px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0 24px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#0d1b3e', letterSpacing: '-0.02em' }}>My Wallet</h2>
        <button 
          onClick={() => handleAction('status')}
          style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '14px', cursor: 'pointer' }}
        >
          <History size={24} color="#64748b" />
        </button>
      </div>

      {/* Main Balance Card */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        padding: '36px 28px',
        borderRadius: '36px',
        color: '#fff',
        marginBottom: '16px',
        boxShadow: '0 20px 40px rgba(37, 99, 235, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 700, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Available Balance</div>
          <div style={{ fontSize: '52px', fontWeight: 900, marginTop: '8px' }}>₹{balance.toFixed(2)}</div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginTop: '24px', 
            backgroundColor: 'rgba(255,255,255,0.2)',
            width: 'fit-content',
            padding: '8px 16px',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 800
          }}>
            <CheckCircle2 size={18} /> Verified Account
          </div>
        </div>
        <WalletIcon size={140} style={{ position: 'absolute', right: '-30px', bottom: '-20px', opacity: 0.1, color: '#fff' }} />
      </div>

      {/* Assets Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: '16px 24px',
        borderRadius: '24px',
        marginBottom: '32px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
      }}>
        <div style={{ display: 'flex', gap: '24px' }}>
            <div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>10</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Spins</div>
            </div>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0', alignSelf: 'center' }} />
            <div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>5</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Scratches</div>
            </div>
        </div>
        <button 
            onClick={() => navigate('/upgrade')}
            style={{ 
                backgroundColor: '#3b82f6', 
                color: '#fff', 
                border: 'none', 
                padding: '8px 20px', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(59, 130, 246, 0.2)'
            }}
        >
            Buy More
        </button>
      </div>

      {!user.hasPaidUnlock && (
        <div style={{
          backgroundColor: '#fffbeb',
          padding: '20px',
          borderRadius: '24px',
          display: 'flex',
          gap: '14px',
          marginBottom: '32px',
          alignItems: 'center',
          border: '1px solid #fde68a',
          animation: 'pulse-subtle 3s infinite'
        }}>
          <div style={{ backgroundColor: '#fff', padding: '8px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(245, 158, 11, 0.1)' }}>
            <AlertCircle size={26} color="#f59e0b" />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#92400e' }}>Action Required</h4>
            <p style={{ fontSize: '12px', color: '#b45309', fontWeight: 600, opacity: 0.9 }}>Pay ₹49 to unlock instant withdrawals.</p>
          </div>
          <button 
            onClick={() => setIsUnlockModalOpen(true)}
            style={{
              backgroundColor: '#f59e0b',
              color: '#fff',
              padding: '12px 20px',
              fontSize: '13px',
              fontWeight: 900,
              borderRadius: '14px',
              border: 'none',
              boxShadow: '0 6px 15px rgba(245, 158, 11, 0.3)',
              cursor: 'pointer'
            }}
          >Unlock</button>
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '36px',
        backgroundColor: '#fff',
        padding: '24px 12px',
        borderRadius: '32px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
        border: '1px solid #f1f5f9'
      }}>
        <ActionButton icon={CreditCard} label="Withdraw" color="#3b82f6" onClick={() => handleAction('withdraw')} />
        <ActionButton icon={Plus} label="Add Money" color="#10b981" onClick={() => handleAction('upgrade')} />
        <ActionButton icon={Verified} label="Proof Wall" color="#8b5cf6" onClick={() => window.open('https://sites.google.com/view/24hrwork', '_blank')} />
        <ActionButton icon={History} label="Statement" color="#64748b" onClick={() => handleAction('status')} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '19px', fontWeight: 900, color: '#0d1b3e' }}>Recent Transactions</h3>
        <button 
          onClick={() => handleAction('status')}
          style={{ fontSize: '14px', fontWeight: 800, color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}
        >View All</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
        {transactions.map((txn, idx) => (
          <TransactionItem key={idx} {...txn} />
        ))}
      </div>

      <div 
        onClick={() => handleAction('profile')}
        style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '28px',
          border: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: '0 10px 20px rgba(0,0,0,0.01)'
        }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
            <WalletIcon size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>Payment Methods</h4>
            <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Bank, UPI, Wallet</p>
          </div>
        </div>
        <ChevronRight size={22} color="#94a3b8" />
      </div>
    </div>
  );
};
