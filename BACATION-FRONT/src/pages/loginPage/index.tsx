import React from 'react';

// LoginPage 컴포넌트 정의
const LoginPage: React.FC = () => {
  // handleLogin 함수 정의
  const handleLogin = () => {
    // .env 파일에서 REST_API_KEY와 REDIRECT_URI 환경 변수 불러오기
    const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
    
    // 카카오 인증 URL 생성
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    // 카카오 인증 URL로 리디렉션
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <div className="container mt-20 mx-auto p-4 max-w-xl text-left flex flex-col items-center">
    <h2 className="text-2xl font-bold mb-20 text-center">
      안전한 아이의 활동을 위한<br />서비스, <span className='text-orange-500'>베케이션</span>
    </h2>
    <img src="/src/assets/onboardingPage/babymobile.png" alt="baby mobile" className="mb-32" style={{ width: '270px' }} />
    <img 
      src="/src/assets/loginPage/kakao_login_large_narrow.png" 
      alt="카카오 로그인" 
      onClick={handleLogin} 
      style={{ cursor: 'pointer', width: '230px', height: 'auto' }} 
      className="mb-4" 
    />
  </div>
  
  );
}


// LoginPage 컴포넌트 내보내기
export default LoginPage;

