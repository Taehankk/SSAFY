import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/organisms/navigation';
import { DataPage } from './pages/dataPage';
import { MainPage } from './pages/mainPage';
import OnboardingPage from './pages/onboardingPage';
import UsageGuidePage from './pages/usageGuidePage';
import LoginPage from './pages/loginPage';
import { DataDetail } from './components/templates/dataDetail';

function App() {
  return (
    <div className="container w-full">
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/usage-guide" element={<UsageGuidePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/mypage" element={<DataPage />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/data/:date" element={<DataDetail />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
