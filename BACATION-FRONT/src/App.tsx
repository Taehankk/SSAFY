import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/organisms/navigation';
import KakaoCallback from './components/organisms/KakaoCallback';
import { DataPage } from './pages/dataPage';
import { MainPage } from './pages/mainPage';
import OnboardingPage from './pages/onboardingPage';
import UsageGuidePage from './pages/usageGuidePage';
import LoginPage from './pages/loginPage';
import InitialSettingsPage from './pages/initialSettingsPage';
import MyPage from './pages/myPage';
import { DetailData } from './components/organisms/detailData';
import ChildInfoPage from './pages/childInfoPage';
import { DiaryPage } from './pages/diaryPage';
import { DiaryWrite } from './pages/diaryWritePage';
import { ModePage } from './pages/modePage';
import PermissionsPage from './pages/permissionPage';
import { useUserStore } from './store/useUserStore';
import { ModeInPage } from './pages/modeInPage';

function App() {
  // Zustand를 사용하여 상태 복원 함수 가져오기
  const restoreUserInfo = useUserStore((state) => state.restoreUserInfo);

  // 컴포넌트가 마운트될 때 사용자 정보를 복원하기 위해 restoreUserInfo 함수 호출
  useEffect(() => {
    restoreUserInfo();
  }, [restoreUserInfo]);

  return (
    <div className="w-[400px]">
      <div className="mb-20">
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/usage-guide" element={<UsageGuidePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/callback" element={<KakaoCallback />} />
          <Route path="/alarm" element={<InitialSettingsPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/data/detail" element={<DetailData />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/diary/write" element={<DiaryWrite />} />
          <Route path="/child-info" element={<ChildInfoPage />} />
          <Route path="/mode/active" element={<ModePage />} />
          <Route path="/mode/sleep" element={<ModePage />} />
          <Route path="/permission" element={<PermissionsPage />} />
          <Route path="/openvidu" element={<ModeInPage />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
