import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, CheckCircle2, Coins, Copy, Send, Mail, Twitter, MessageCircle } from 'lucide-react';

export const Referral = () => {
  const navigate = useNavigate();
  const { totalReferred, successfulReferrals, referralEarnings, simulateReferral } = useAppContext();
  const referralLink = "https://24hrwork.app/join?ref=U8492";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied!');
  };

  const StatCard = ({ label, value, icon: Icon, color, iconBg }) => (
    <div style={{
      backgroundColor: '#fff',
      padding: '24px',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      border: '1px solid #f1f5f9'
    }}>
      <div>
        <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>{label}</p>
        <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>{value}</h3>
      </div>
      <div style={{
        width: '52px',
        height: '52px',
        backgroundColor: iconBg,
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color
      }}>
        <Icon size={24} />
      </div>
    </div>
  );

  const ShareButton = ({ icon: Icon, color, label }) => (
    <motion.div 
      whileTap={{ scale: 0.9 }}
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: color,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        cursor: 'pointer',
        boxShadow: `0 4px 12px ${color}40`
      }}>
      <Icon size={22} fill={label === 'whatsapp' ? '#fff' : 'none'} />
    </motion.div>
  );

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: '#fff', border: 'none', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justify: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <ArrowLeft size={20} color="#0f172a" />
        </button>
      </div>

      <div style={{ padding: '0 20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>Refer & Earn</h1>
        <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, marginBottom: '32px' }}>
          Invite your friends and earn <span style={{ color: '#0f172a', fontWeight: 800 }}>₹100.00</span> for each successful referral!
        </p>

        {/* Stats Section */}
        <StatCard label="Total Referred" value={totalReferred} icon={Users} color="#6366f1" iconBg="#eef2ff" />
        <StatCard label="Successful Referrals" value={successfulReferrals} icon={CheckCircle2} color="#10b981" iconBg="#ecfdf5" />
        <StatCard label="Total Earned" value={`₹${referralEarnings.toFixed(2)}`} icon={Coins} color="#f59e0b" iconBg="#fffbeb" />

        {/* Link Section */}
        <div style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
          borderRadius: '32px',
          padding: '32px 24px',
          color: '#fff',
          textAlign: 'center',
          marginTop: '16px',
          boxShadow: '0 16px 32px rgba(59, 130, 246, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '8px' }}>Your Referral Link</h3>
          <p style={{ fontSize: '14px', fontWeight: 500, opacity: 0.9, marginBottom: '24px' }}>Share this link with your friends to earn referral bonuses</p>

          <div style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            padding: '16px 20px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <p style={{ fontSize: '13px', fontWeight: 600, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', opacity: 0.9 }}>{referralLink}</p>
            <button onClick={handleCopy} style={{ background: '#fff', border: 'none', padding: '10px', borderRadius: '12px', color: '#101010', cursor: 'pointer' }}>
              <Copy size={20} />
            </button>
          </div>

          <p style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Share via:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <div onClick={simulateReferral}><ShareButton icon={MessageCircle} color="#25D366" label="whatsapp" /></div>
            <div onClick={simulateReferral}><ShareButton icon={Send} color="#0088cc" /></div>
            <div onClick={simulateReferral}><ShareButton icon={Twitter} color="#1DA1F2" /></div>
            <div onClick={simulateReferral}><ShareButton icon={Mail} color="#EA4335" /></div>
          </div>
        </div>

        {/* How it Works Section */}
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginBottom: '32px' }}>How it Works</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
            {[
              { id: 1, title: 'Share Your Link', text: 'Share your unique referral link with friends and family.' },
              { id: 2, title: 'They Join & Buy Plan', text: 'Your referrals register and purchase their first plan.' },
              { id: 3, title: 'You Get Paid', text: 'Earn ₹100.00 instantly in your wallet for each friend!' }
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: 'rgba(79, 70, 229, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#4f46e5',
                  marginBottom: '16px'
                }}>
                  {step.id}
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>{step.title}</h4>
                <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, lineHeight: 1.6 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
