import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Persistence Helper - Get from LocalStorage
  const getStored = (key, defaultValue) => {
    const stored = localStorage.getItem(key);
    if (!stored) return defaultValue;
    try {
      return JSON.parse(stored);
    } catch {
      return stored;
    }
  };

  const [user, setUser] = useState({
    name: "User",
    isPremium: false,
    hasPaidUnlock: false,
    kycStatus: 'NOT_VERIFIED', // NOT_VERIFIED, PENDING, VERIFIED
  });

  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  
  const [isKycVerified, setIsKycVerified] = useState(() => getStored('isKycVerified', false));
  const [isGoldPlanActive, setIsGoldPlanActive] = useState(() => getStored('isGoldPlanActive', false));
  const [isLoggedIn, setIsLoggedIn] = useState(() => getStored('isLoggedIn', false));
  const [userProfile, setUserProfile] = useState(() => getStored('userProfile', { name: '', phone: '' }));

  // Persistence Sync
  useEffect(() => { localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn)); }, [isLoggedIn]);
  useEffect(() => { localStorage.setItem('userProfile', JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => { localStorage.setItem('isKycVerified', JSON.stringify(isKycVerified)); }, [isKycVerified]);
  useEffect(() => { localStorage.setItem('isGoldPlanActive', JSON.stringify(isGoldPlanActive)); }, [isGoldPlanActive]);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserProfile({ name: '', phone: '' });
    setBalance(0);
    setPoints(0);
    setIsKycVerified(false);
    setIsGoldPlanActive(false);
    setTotalSpinsDone(0);
    setCaptchasDone(0);
    setSpinsAvailable(10);
    window.location.reload(); // Hard refresh to clear memory
  };

  const login = (name, phone) => {
    setUserProfile({ name, phone });
    setIsLoggedIn(true);
  };

  const claimDailyBenefits = () => {
    setBalance(prev => prev + 500);
    setSpinsAvailable(10);
  };

  const [points, setPoints] = useState(() => getStored('balance', 0));
  const [balance, setBalance] = useState(() => getStored('balance', 0));
  
  useEffect(() => { localStorage.setItem('balance', JSON.stringify(balance)); }, [balance]);

  const [rewardAmount, setRewardAmount] = useState(0);
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, user: "Rohit S.", amount: 50, time: "2m ago" },
    { id: 2, user: "Ananya K.", amount: 120, time: "5m ago" },
    { id: 3, user: "Siddharth V.", amount: 75, time: "8m ago" },
  ]);

  useEffect(() => {
    // Sync balance with points (1 coin = 1 rupee)
    setBalance(points);
  }, [points]);

  const addPoints = (amount) => {
    setPoints(prev => prev + amount);
  };

  const showReward = (amount) => {
    setRewardAmount(amount);
    setIsRewardOpen(true);
    addPoints(amount);
  };

  const closeReward = () => {
    setIsRewardOpen(false);
  };

  const addNotification = (notif) => {
    setNotifications(prev => [notif, ...prev.slice(0, 4)]);
  };

  const [totalSpinsDone, setTotalSpinsDone] = useState(() => getStored('totalSpinsDone', 0));
  useEffect(() => { localStorage.setItem('totalSpinsDone', JSON.stringify(totalSpinsDone)); }, [totalSpinsDone]);

  const [spinsAvailable, setSpinsAvailable] = useState(() => getStored('spinsAvailable', 10));
  useEffect(() => { localStorage.setItem('spinsAvailable', JSON.stringify(spinsAvailable)); }, [spinsAvailable]);

  const [captchasDone, setCaptchasDone] = useState(() => getStored('captchasDone', 0));
  useEffect(() => { localStorage.setItem('captchasDone', JSON.stringify(captchasDone)); }, [captchasDone]);
 // Reverted to 10 as requested
  const [isInstantWithdrawalUnlocked, setIsInstantWithdrawalUnlocked] = useState(false);

  const incrementSpins = () => {
    setTotalSpinsDone(prev => prev + 1);
    setSpinsAvailable(prev => Math.max(0, prev - 1));
  };

  const completeCaptcha = () => setCaptchasDone(prev => prev + 1);

  const buySpins = (amount) => {
    setSpinsAvailable(prev => prev + amount);
  };

  const unlockInstant = () => setIsInstantWithdrawalUnlocked(true);

  const [totalReferred, setTotalReferred] = useState(0);
  const [successfulReferrals, setSuccessfulReferrals] = useState(0);
  const [referralEarnings, setReferralEarnings] = useState(0);

  const simulateReferral = () => {
    setTotalReferred(prev => prev + 1);
    setSuccessfulReferrals(prev => prev + 1);
    setReferralEarnings(prev => prev + 100);
    showReward(100); // Trigger the claim popup
  };

  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchaseType, setPurchaseType] = useState('spins'); // 'spins' or 'scratches'

  const openPurchaseModal = (type) => {
    setPurchaseType(type);
    setIsPurchaseModalOpen(true);
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, 
      points, setPoints, 
      balance, setBalance,
      addPoints, 
      rewardAmount, isRewardOpen, showReward, closeReward,
      isUnlockModalOpen, setIsUnlockModalOpen,
      isPurchaseModalOpen, setIsPurchaseModalOpen,
      purchaseType, openPurchaseModal,
      notifications, addNotification,
      isLoggedIn, login, logout, userProfile,
      isTelegramModalOpen, setIsTelegramModalOpen,
      isDailyModalOpen, setIsDailyModalOpen,
      isKycVerified, setIsKycVerified,
      isKycModalOpen, setIsKycModalOpen,
      isGoldPlanActive, setIsGoldPlanActive,
      claimDailyBenefits,
      totalSpinsDone, incrementSpins,
      spinsAvailable, buySpins,
      isInstantWithdrawalUnlocked, unlockInstant,
      captchasDone, completeCaptcha,
      totalReferred, successfulReferrals, referralEarnings, simulateReferral
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
