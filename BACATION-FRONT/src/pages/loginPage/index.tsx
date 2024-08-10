import React from 'react';

// LoginPage 컴포넌트 정의
const LoginPage: React.FC = () => {
  // handleLogin 함수 정의
  const handleLogin = () => {
    const REST_API_KEY = 'd45e7434137c298cb3389b453bf284f5';
    const REDIRECT_URI = 'https://i11b307.p.ssafy.io/callback';
    
    // 카카오 인증 URL 생성
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    // 카카오 인증 URL로 리디렉션
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="container mx-auto p-4 max-w-xl h-screen flex flex-col justify-between text-center">
      <h2 className="text-2xl font-bold mt-8">
        안전한 아이의 활동을 위한
        <br />
        서비스, <span className="text-[#FD5900]">베케이션</span>
      </h2>
      <p className="text-m text-gray-300 mt-4 mb-6">
        아이와 함께하는 시간을 더 안전하게
      </p>
      <div className="mx-auto mb-6 flex-grow flex items-center justify-center">
        <img
          src="https://bacation.s3.ap-northeast-2.amazonaws.com/frontImage/babymobile.png"
          alt="baby mobile"
          className="max-h-full"
          style={{ width: '80%', maxHeight: '300px' }}
        />
      </div>
      <div className="flex justify-center mb-8">
        <img 
          src="https://bacation.s3.ap-northeast-2.amazonaws.com/frontImage/kakao_login_large_narrow.png" 
          alt="카카오 로그인" 
          onClick={handleLogin} 
          style={{ cursor: 'pointer', width: '230px', height: 'auto' }} 
        />
      </div>
    </div>
  );
}

// LoginPage 컴포넌트 내보내기
export default LoginPage;
