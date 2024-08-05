import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/organisms/navigation';
import KakaoCallback from './components/organisms/kakaoLogin'; 
import { DataPage } from './pages/dataPage';
import { MainPage } from './pages/mainPage';
import OnboardingPage from './pages/onboardingPage';
import UsageGuidePage from './pages/usageGuidePage';
import LoginPage from './pages/loginPage';
import InitialSettingsPage from './pages/initialSettingsPage';
import { MyPage } from './pages/myPage';
import { DataDetail } from './components/templates/dataDetail';
import ChildInfoPage from './pages/childInfoPage';
import { DiaryPage } from './pages/diaryPage';
import { DiaryWrite } from './pages/diaryWritePage';
import { ModePage } from './pages/modePage';

function App() {
  return (
    <div className="w-[400px]">
      <div className="mb-20">
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/usage-guide" element={<UsageGuidePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/alarm" element={<InitialSettingsPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/data/:date" element={<DataDetail />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/diary/write" element={<DiaryWrite />} />
          <Route path="/child-info" element={<ChildInfoPage />} />
          <Route path="/mode/active" element={<ModePage />} />
          <Route path="/mode/sleep" element={<ModePage />} />
          <Route path="/callback" element={<KakaoCallback />} /> 
        </Routes>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
