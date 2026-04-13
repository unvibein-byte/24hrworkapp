import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Mail, Phone, ExternalLink, HelpCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Support = () => {
    const navigate = useNavigate();

    const supportOptions = [
        {
            icon: <MessageSquare size={24} />,
            title: "Join Telegram Support",
            description: "Instant help from our community",
            color: "#3b82f6",
            action: () => window.open('https://t.me/fdpremier', '_blank')
        },
        {
            icon: <Mail size={24} />,
            title: "Email Support",
            description: "support@24hrwork.com",
            color: "#10b981",
            action: () => window.location.href = "mailto:support@24hrwork.com"
        },
        {
            icon: <Phone size={24} />,
            title: "Call Agent",
            description: "Mon-Sat, 9AM-6PM",
            color: "#8b5cf6",
            action: () => alert("Direct calls available for Gold Plan users only.")
        }
    ];

    const faqs = [
        { q: "How do I withdraw my earnings?", a: "Go to Wallet > Withdraw. Reach ₹5,000 to unlock cashout." },
        { q: "Is the Gold Plan refundable?", a: "Yes, 100% refundable within 1 hour if you're not satisfied." },
        { q: "How many spins do I get daily?", a: "Free users get 10 spins. Gold users get unlimited." }
    ];

    return (
        <div style={{ padding: '0 20px 40px', backgroundColor: '#f8fafc', minHeight: '100vh', scrollBehavior: 'smooth' }}>
            <div style={{ padding: '20px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button 
                  onClick={() => navigate('/profile')}
                  style={{ backgroundColor: 'transparent', border: 'none', color: '#1e293b', cursor: 'pointer' }}
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b' }}>Help & Support</h2>
            </div>

            <div style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 600, marginBottom: '24px' }}>How can we help you today?</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {supportOptions.map((opt, i) => (
                        <motion.div 
                          key={i}
                          whileTap={{ scale: 0.98 }}
                          onClick={opt.action}
                          style={{
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            border: '1px solid #f1f5f9',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                            cursor: 'pointer'
                          }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                backgroundColor: `${opt.color}10`,
                                color: opt.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {opt.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>{opt.title}</h4>
                                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{opt.description}</p>
                            </div>
                            <ExternalLink size={18} color="#cbd5e1" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '20px' }}>Frequently Asked Questions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {faqs.map((faq, i) => (
                        <div key={i} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>{faq.q}</h4>
                            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', fontWeight: 600 }}>{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px', padding: '24px', backgroundColor: '#eff6ff', borderRadius: '24px' }}>
                <HelpCircle size={32} color="#3b82f6" style={{ marginBottom: '12px' }} />
                <p style={{ fontSize: '14px', color: '#1e293b', fontWeight: 800 }}>Visit Our Tutorial Center</p>
                <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '20px' }}>Learn step-by-step how to earn ₹10,000/month</p>
                <button 
                  onClick={() => navigate('/how-to-use')}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '100px',
                    fontWeight: 800,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    margin: '0 auto',
                    cursor: 'pointer'
                  }}
                > Watch Tutorials <ChevronRight size={16} /></button>
            </div>
        </div>
    );
};
