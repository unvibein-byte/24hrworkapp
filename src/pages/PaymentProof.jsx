import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ShieldCheck, Verified } from 'lucide-react';

export const PaymentProof = () => {
  const navigate = useNavigate();
  const proofUrl = "https://sites.google.com/view/24hrwork?usp=sharing&embedded=true";

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '20px',
      position: 'relative'
    }}>
      {/* Floating Back Button */}
      <div style={{ 
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 100
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#0d1b3e',
            border: 'none',
            color: '#fff',
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(13, 27, 62, 0.4)',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* Native-Style Floating Header */}
      <div style={{ 
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: 'rgba(13, 27, 62, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            paddingRight: '12px'
          }}
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <div style={{ flex: 1, color: '#fff' }}>
            <p style={{ fontSize: '14px', fontWeight: 950, marginBottom: '1px' }}>Payment Proof Wall</p>
            <p style={{ fontSize: '10px', opacity: 0.6, fontWeight: 700 }}>verified.24hrwork.app</p>
        </div>
        <Verified size={20} color="#10b981" fill="#10b981" />
      </div>

      {/* Fullscreen Dedicated Web View */}
      <div style={{ 
        flex: 1, 
        backgroundColor: '#0d1b3e', // Professional loading background
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Fullscreen Iframe */}
        <iframe 
          src={proofUrl} 
          title="Payment Proofs"
          style={{
            width: '100%',
            height: '100vh',
            border: 'none',
            display: 'block'
          }}
        />

        {/* Loading / Fallback Banner (Only shows if content is slow/blocked) */}
        <div style={{
            position: 'absolute',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 40px)',
            zIndex: 10
        }}>
             <motion.a 
                href={proofUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    backgroundColor: '#10b981',
                    color: '#fff',
                    padding: '18px',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    fontWeight: 950,
                    fontSize: '15px',
                    boxShadow: '0 12px 24px rgba(16, 185, 129, 0.4)',
                }}
             >
                <ExternalLink size={20} />
                BROWSE FULL SITE
             </motion.a>
             <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
                TAP IF SCREEN IS BLANK
             </p>
        </div>
      </div>
    </div>
  );
};
