import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Lock, X, Delete, ArrowRight, KeyRound, AlertCircle } from 'lucide-react';

export const AdminPinModal = () => {
  const { 
    isAdminPinModalOpen, 
    setIsAdminPinModalOpen, 
    verifyAdminPin 
  } = useStore();

  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isAdminPinModalOpen) {
      setPin('');
      setError(false);
      setSuccess(false);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  }, [isAdminPinModalOpen]);

  if (!isAdminPinModalOpen) return null;

  const handleDigit = (digit) => {
    if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);
      setError(false);
      if (newPin.length === 4) {
        submitPin(newPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  const submitPin = (pinToTest = pin) => {
    const isValid = verifyAdminPin(pinToTest);
    if (isValid) {
      setSuccess(true);
      setError(false);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPin('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key >= '0' && e.key <= '9') {
      handleDigit(e.key);
    } else if (e.key === 'Backspace') {
      handleBackspace();
    } else if (e.key === 'Enter') {
      submitPin();
    } else if (e.key === 'Escape') {
      setIsAdminPinModalOpen(false);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'rgba(3, 7, 18, 0.78)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={() => setIsAdminPinModalOpen(false)}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div 
        className={`glass-card ${shake ? 'pin-shake' : ''}`}
        style={{
          width: '100%',
          maxWidth: '390px',
          background: 'linear-gradient(160deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%)',
          borderRadius: '24px',
          border: error 
            ? '1.5px solid #EF4444' 
            : success 
            ? '1.5px solid #10B981' 
            : '1.5px solid rgba(0, 102, 255, 0.4)',
          boxShadow: error 
            ? '0 20px 50px rgba(239, 68, 68, 0.35)' 
            : success 
            ? '0 20px 50px rgba(16, 185, 129, 0.35)' 
            : '0 20px 50px rgba(0, 85, 255, 0.35)',
          padding: '2.25rem 2rem 2rem',
          position: 'relative',
          color: '#FFFFFF',
          transition: 'all 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAdminPinModalOpen(false)}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#94A3B8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: success 
              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
              : 'linear-gradient(135deg, #0055FF 0%, #002B80 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: success ? '0 0 25px rgba(16, 185, 129, 0.5)' : '0 0 25px rgba(0, 85, 255, 0.5)',
            marginBottom: '1rem',
            transition: 'all 0.3s ease'
          }}>
            {success ? <ShieldCheck size={32} color="#FFFFFF" /> : <KeyRound size={30} color="#FFFFFF" />}
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.35rem', letterSpacing: '-0.02em' }}>
            Admin Portal Access
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
            Enter Master Security PIN (6600) to access store management
          </p>
        </div>

        {/* PIN Display Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          margin: '1.5rem 0 1.25rem'
        }}>
          {[0, 1, 2, 3].map((index) => {
            const hasDigit = pin.length > index;
            return (
              <div
                key={index}
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: hasDigit 
                    ? (success ? '#10B981' : '#0066FF')
                    : 'rgba(255, 255, 255, 0.12)',
                  border: hasDigit 
                    ? `2px solid ${success ? '#34D399' : '#60A5FA'}` 
                    : '2px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: hasDigit ? (success ? '0 0 12px #10B981' : '0 0 12px #0066FF') : 'none',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hasDigit ? 'scale(1.15)' : 'scale(1)'
                }}
              />
            );
          })}
        </div>

        {/* Hidden input for keyboard focus */}
        <input
          ref={inputRef}
          type="password"
          maxLength={6}
          value={pin}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setPin(val);
            if (val.length === 4) submitPin(val);
          }}
          style={{ opacity: 0, position: 'absolute', pointerEvents: 'none', width: 0, height: 0 }}
        />

        {/* Error Alert */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            color: '#F87171',
            fontSize: '0.84rem',
            fontWeight: 600,
            marginBottom: '1rem',
            animation: 'fadeIn 0.2s ease'
          }}>
            <AlertCircle size={15} />
            <span>Incorrect PIN. Try 6600</span>
          </div>
        )}

        {/* Numeric Keypad Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          margin: '0 auto 1.25rem'
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleDigit(num.toString())}
              className="keypad-btn"
              style={{
                height: '52px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontSize: '1.35rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              {num}
            </button>
          ))}

          {/* Clear Key */}
          <button
            type="button"
            onClick={handleClear}
            className="keypad-btn"
            style={{
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#94A3B8',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'uppercase'
            }}
          >
            Clear
          </button>

          {/* Digit 0 */}
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="keypad-btn"
            style={{
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              fontSize: '1.35rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            0
          </button>

          {/* Backspace Key */}
          <button
            type="button"
            onClick={handleBackspace}
            className="keypad-btn"
            style={{
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Delete last digit"
          >
            <Delete size={20} />
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => submitPin()}
          disabled={pin.length < 4}
          className="btn btn-primary"
          style={{
            width: '100%',
            height: '48px',
            borderRadius: '14px',
            fontSize: '1rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            background: pin.length >= 4 
              ? 'linear-gradient(135deg, #0066FF 0%, #0033AA 100%)' 
              : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: pin.length >= 4 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
            cursor: pin.length >= 4 ? 'pointer' : 'not-allowed',
            boxShadow: pin.length >= 4 ? '0 4px 20px rgba(0, 102, 255, 0.45)' : 'none',
            transition: 'all 0.25s ease'
          }}
        >
          <span>Unlock Admin Panel</span>
          <ArrowRight size={18} />
        </button>

        {/* Security Note */}
        <div style={{ textAlign: 'center', marginTop: '1.15rem' }}>
          <span style={{ fontSize: '0.76rem', color: '#64748B' }}>
            🔒 Alnoor Traders Internal Management System
          </span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pinShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .pin-shake {
          animation: pinShake 0.45s ease-in-out !important;
        }
        .keypad-btn:hover {
          background: rgba(255, 255, 255, 0.12) !important;
          border-color: rgba(0, 102, 255, 0.4) !important;
          transform: translateY(-1px);
        }
        .keypad-btn:active {
          transform: scale(0.96);
        }
      `}</style>
    </div>
  );
};
