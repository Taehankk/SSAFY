import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from '../../../store/useUserStore';

const KakaoCallback: React.FC = () => {
  console.log('KakaoCallback component is rendering'); // 컴포넌트가 렌더링될 때 로그 출력
  const location = useLocation(); // 현재 URL의 위치 정보를 가져옴
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const setUserInfo = useUserStore((state) => state.setUserInfo); // Zustand 스토어의 setUserInfo 함수

  useEffect(() => {
    console.log('useEffect is running'); // useEffect가 실행될 때 로그 출력
    const searchParams = new URLSearchParams(location.search); // URL의 쿼리 파라미터를 파싱
    const code = searchParams.get('code'); // 'code' 파라미터 추출

    if (code) {
      console.log('Authorization code:', code);

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      console.log('Request Headers:', headers); // 요청 헤더를 출력

      // 인가 코드를 백엔드로 전송
      axios.post('https://i11b307.p.ssafy.io/api/receive/code', new URLSearchParams({  
          code: code
        }), {
          headers: headers
        })
        .then(response => {
          console.log('Response Data:', response.data); // 응답 데이터를 출력

          // 백엔드에서 JWT 토큰과 isNewMember 값을 받음
          const jwtToken = response.data.token; // JWT 토큰 추출
          const isNewMemberResponse = response.data.isNewMember; // isNewMember 값 설정

          // JWT를 디코딩하여 사용자 정보 가져오기
          decodeJWT(jwtToken, isNewMemberResponse);
        })
        .catch(error => {
          console.error('Error:', error); // 오류 발생 시 콘솔에 출력
        });
    }
  }, [location.search]); // location.search가 변경될 때마다 실행

  // JWT를 디코딩하여 사용자 정보를 추출하는 함수
  const decodeJWT = async (token: string, isNewMemberResponse: boolean) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      console.log('JWT Decode Request Headers:', headers); // 디코딩 요청 헤더를 출력

      // 백엔드로 JWT 디코딩 요청
      const response = await axios.get('https://i11b307.p.ssafy.io/api/v1/jwt/decode', {
        headers: headers
      });

      const data = response.data; // 서버로부터 받은 사용자 정보
      setUserInfo({
        accessToken: token,  // JWT 토큰 저장
        id: data.memberId,   // 사용자 ID
        email: data.email,   // 사용자 이메일
        nickname: data.nickname, // 사용자 닉네임
        profileImage: data.profileImgUrl, // 사용자 프로필 이미지
        isLogin: true        // 로그인 상태로 설정
      });

      // 신규 회원 여부에 따라 페이지 이동
      if (isNewMemberResponse) {
        navigate('/child-info'); // 신규 회원이면 아기 정보 입력 페이지로 이동
      } else {
        navigate('/main'); // 기존 회원이면 메인 페이지로 이동
      }
    } catch (error) {
      console.error('Error decoding JWT:', error); // 오류 발생 시 콘솔에 출력
    }
  };

  // 로딩 애니메이션 표시
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          className="star star1"
          viewBox="0 0 256 256"
        >
          <path
            d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          className="star star2"
          viewBox="0 0 256 256"
        >
          <path
            d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          className="star star3"
          viewBox="0 0 256 256"
        >
          <path
            d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"
          ></path>
        </svg>
        <style>{`
          .loader-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
    
          .loader {
            user-select: none;
          }
    
          .star {
            opacity: 0;
            fill: #FFA500;
            animation: loader 2s infinite alternate;
          }
    
          .star2 {
            height: 20px;
            margin-left: -10px;
            animation-delay: 0.25s;
          }
    
          .star3 {
            height: 16px;
            margin-left: -15px;
            animation-delay: 0.5s;
          }
    
          @keyframes loader {
            0% {
              opacity: 0;
              transform: translateY(0) translateX(50px) rotate(0deg);
            }
            10% {
              opacity: 0;
              transform: translateY(0) translateX(50px) rotate(0deg);
            }
            100% {
              opacity: 1;
              transform: translateY(-20px) translateX(0) rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default KakaoCallback;
