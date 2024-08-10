// Firebase 스크립트 임포트
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

// Firebase 구성
const firebaseConfig = {
  apiKey: "AIzaSyCo5wqrLyJsZq3Z0G-7OGRlo7NZNKtUY1U",
  authDomain: "test-10076.firebaseapp.com",
  projectId: "test-10076",
  storageBucket: "test-10076.appspot.com",
  messagingSenderId: "1081974618284",
  appId: "1:1081974618284:web:90e690d87851a3dbea4709",
  measurementId: "G-33Q8WDPE2S"
};

// 서비스 워커에서 Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase Messaging 인스턴스 가져오기
const messaging = getMessaging(app);

// 백그라운드 메시지 처리
onBackgroundMessage(messaging, (payload) => {
  const notificationTitle = payload.notification?.title || '알림';
  const notificationOptions = {
    body: payload.notification?.body,
    icon: '/icon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
