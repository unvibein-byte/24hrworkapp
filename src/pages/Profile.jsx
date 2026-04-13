import { useNavigate } from 'react-router-dom';
import { User, Settings, Info, LogOut, ChevronRight, HelpCircle, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { userProfile, isKycVerified, setIsKycModalOpen, isGoldPlanActive, logout } = useAppContext();

  const handleKYC = () => {
    if (isKycVerified) return;
    setIsKycModalOpen(true);
  };

  const menuItems = [
    { icon: <Settings size={22} />, label: "Profile Settings", value: "Edit Name, Email", path: '/profile' },
    { icon: <Info size={22} />, label: "Help & Support", value: "FAQs, Contact Us", path: '/support' },
    { icon: <HelpCircle size={22} />, label: "Tutorial", value: "How to earn?", path: '/how-to-use' },
    { icon: <LogOut size={22} />, label: "Logout", value: "Sign out safely", action: logout },
  ];

  return (
    <div style={{ padding: '0 20px 24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px 0 32px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '26px',
          backgroundColor: '#eff6ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#3b82f6',
          boxShadow: '0 10px 20px rgba(59, 130, 246, 0.1)',
          border: '1px solid #dbeafe'
        }}>
          <User size={38} />
        </div>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: 950, color: '#1e293b' }}>{userProfile.name || 'User'}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>ID: #RH482928</p>
            <span style={{ 
              fontSize: '11px', 
              color: '#10b981', 
              backgroundColor: '#f0fdf4', 
              padding: '2px 10px', 
              borderRadius: '100px',
              fontWeight: 800
            }}>● Active</span>
          </div>
        </div>
      </div>

      {/* KYC Status Card - Only shown for Gold Plan users */}
      {isGoldPlanActive && (
        <div 
          onClick={handleKYC}
          style={{
            backgroundColor: isKycVerified ? '#f0fdf4' : '#fffbeb',
            padding: '20px',
            borderRadius: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
            border: `1px solid ${isKycVerified ? '#dcfce7' : '#fef3c7'}`,
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '16px',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isKycVerified ? '#16a34a' : '#f59e0b',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
          }}>
            {isKycVerified ? <ShieldCheck size={26} /> : <AlertCircle size={26} />}
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#1e293b' }}>
              {isKycVerified ? 'KYC Verified' : 'Verify Your KYC'}
            </h4>
            <p style={{ fontSize: '12px', color: isKycVerified ? '#16a34a' : '#b45309', fontWeight: 700 }}>
              {isKycVerified ? 'Bank Transfers Active' : 'One-time ₹199 Verification Fee'}
            </p>
          </div>
          <ChevronRight size={20} color={isKycVerified ? '#16a34a' : '#f59e0b'} />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Account Settings</h3>
        
        {menuItems.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => {
                if (item.action) item.action();
                else if (item.path) navigate(item.path);
            }}
            style={{ 
            backgroundColor: '#fff', 
            padding: '18px 20px', 
            borderRadius: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            border: '1px solid #f1f5f9',
            boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
            cursor: 'pointer'
          }}>
            <div style={{ color: '#6366f1' }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>{item.label}</h4>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{item.value}</p>
            </div>
            <ChevronRight size={18} color="#cbd5e1" />
          </div>
        ))}
      </div>
    </div>
  );
};
