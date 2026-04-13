import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { Tasks } from './pages/Tasks';
import { Wallet } from './pages/Wallet';
import { Upgrade } from './pages/Upgrade';
import { Support } from './pages/Support';
import { Profile } from './pages/Profile';
import { CaptchaTask } from './pages/CaptchaTask';
import { AdTask } from './pages/AdTask';
import { SpinWheel } from './pages/SpinWheel';
import { ScratchCard } from './pages/ScratchCard';
import { Withdraw } from './pages/Withdraw';
import { HowToUse } from './pages/HowToUse';
import { PaymentProof } from './pages/PaymentProof';
import { Referral } from './pages/Referral';
import { RewardModal } from './components/RewardModal';
import { UnlockModal } from './components/UnlockModal';
import { PurchaseModal } from './components/PurchaseModal';
import { Login } from './pages/Login';
import { Splash } from './components/Splash';
import { TelegramModal } from './components/TelegramModal';
import { DailyRewardModal } from './components/DailyRewardModal';
import { KycModal } from './components/KycModal';
import { useAppContext } from './context/AppContext';
import './App.css';

function AppContent() {
  const { isLoggedIn } = useAppContext();
  const [showSplash, setShowSplash] = React.useState(true);

  if (showSplash) {
     return <Splash onFinish={() => setShowSplash(false)} />;
  }

  if (!isLoggedIn) {
     return <Login />;
  }

  return (
    <div className="app-container">
      <Header />
      <main style={{ padding: '16px 0', minHeight: 'calc(100vh - 160px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/premium" element={<Upgrade />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/captcha" element={<CaptchaTask />} />
          <Route path="/tasks/captcha" element={<CaptchaTask />} />
          <Route path="/ads" element={<AdTask />} />
          <Route path="/tasks/ads" element={<AdTask />} />
          <Route path="/spin" element={<SpinWheel />} />
          <Route path="/tasks/spin" element={<SpinWheel />} />
          <Route path="/scratch" element={<ScratchCard />} />
          <Route path="/tasks/scratch" element={<ScratchCard />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/proofs" element={<PaymentProof />} />
          <Route path="/referral" element={<Referral />} />
        </Routes>
      </main>
      <BottomNav />
      <RewardModal />
      <UnlockModal />
      <PurchaseModal />
      <TelegramModal />
      <DailyRewardModal />
      <KycModal />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
