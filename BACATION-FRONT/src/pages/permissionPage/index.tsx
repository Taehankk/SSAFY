import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCo5wqrLyJsZq3Z0G-7OGRlo7NZNKtUY1U",
  authDomain: "test-10076.firebaseapp.com",
  projectId: "test-10076",
  storageBucket: "test-10076.appspot.com",
  messagingSenderId: "1081974618284",
  appId: "1:1081974618284:web:90e690d87851a3dbea4709",
  measurementId: "G-33Q8WDPE2S"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const PermissionsPage: React.FC = () => {
  const navigate = useNavigate();

  const requestNotificationPermission = () => {
    // FCM 토큰 가져오기
    getToken(messaging, { vapidKey: 'BFdwxYu0yS8CmWkzg8rWDVAOYHzbz0rLzuKyW7V9gwc4bk8CxnA9aAuGRFYfnzXJLIp9TasM-LERKFAMIfIVNFg' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Token:', currentToken);
          // 알림 권한 확인
          if (Notification.permission === "granted") {
            alert('알람이 허용되었습니다.');
            navigate('/alarm'); // 알림 권한이 허용되면 '/alarm' 경로로 이동
          } else {
            alert('알람 허용되지 않음');
          }
        } else {
          console.log('No registration token available.');
        }
      })
      .catch((err) => {
        if (err.code === 'messaging/permission-blocked') {
          alert('알림 권한이 차단되었습니다. 브라우저 설정에서 알림 권한을 허용해주세요.');
        } else {
          console.error('An error occurred while retrieving token:', err); // 여기서 err 변수를 사용
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://bacation.s3.ap-northeast-2.amazonaws.com/frontImage/push.png"
          alt="알림 아이콘"
          className="w-20 h-20 mt-48 mb-6"
        />
        <h2 className="text-2xl font-bold mb-6 text-center">
          푸시 알림 받기
        </h2>
        <p className="text-gray-500 font-medium text-center mb-64">
          베케이션에 알림을 보내려고 해요.
          <br />
          아이의 상태에 따른 알림을 받아보세요!
        </p>
      </div>

      <button
        onClick={requestNotificationPermission}
        className="w-4/5 max-w-md py-3 bg-[#FD5900] text-white rounded-lg text-center"
      >
        알림 받기
      </button>
      <Link
        to="/alarm"
        className="w-4/5 max-w-md py-3 text-gray-400 rounded-lg text-center underline"
      >
        나중에 받을게요.
      </Link>
    </div>
  );
};

export default PermissionsPage;
