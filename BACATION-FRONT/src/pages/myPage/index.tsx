import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from '../../store/useUserStore';

// 사용자 정보 인터페이스 정의
interface UserInfo {
  id: string;
  email: string;
  nickname: string;
  profileImage: string;
  isLogin: boolean;
  signupDate?: string;
}

// MyPage 컴포넌트 정의
const MyPage: React.FC = () => {
  const navigate = useNavigate(); 
  const userInfo = useUserStore((state) => state.userInfo) as UserInfo; // Zustand store에서 사용자 정보 가져오기
  const setUserInfo = useUserStore((state) => state.setUserInfo); // 사용자 정보를 설정하는 함수 가져오기
  const restoreUserInfo = useUserStore((state) => state.restoreUserInfo); // 사용자 정보를 복원하는 함수 가져오기
  const babyInfo = useUserStore((state) => state.babyInfo); // Zustand store에서 아기 정보 가져오기
  const setBabyInfo = useUserStore((state) => state.setBabyInfo); // 아기 정보를 설정하는 함수 가져오기
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 관리
  const [nickname, setNickname] = useState(''); // 닉네임 상태 관리
  const [babyName, setBabyName] = useState(''); // 아기 이름 상태 관리
  const [babyGender, setBabyGender] = useState(''); // 아기 성별 상태 관리
  const [babyBirthdate, setBabyBirthdate] = useState(''); // 아기 생일 상태 관리

  // 컴포넌트가 마운트될 때 사용자 정보와 아기 정보를 가져오는 효과
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 정보를 복원하는 함수 호출 
        await restoreUserInfo(); 

        // 백엔드 API를 호출하여 아기 정보 가져오기
        const response = await axios.get(`https://i11b307.p.ssafy.io/api/v1/member/info`);
        setBabyInfo(response.data); // 아기 정보 상태 업데이트
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 사용자 정보와 아기 정보 가져오기 실행
  }, [restoreUserInfo, setBabyInfo]);

  
  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      // Zustand store에서 사용자 정보 초기화
      setUserInfo({
        id: '',
        email: '',
        nickname: '',
        profileImage: '',
        isLogin: false,
        signupDate: '',
      });
      navigate('/onboarding'); // 로그아웃 후 온보딩 페이지로 이동
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // 사용자 및 아기 정보 업데이트 함수
  const updateUserInfo = async () => {
    try {
      // 아기 정보 업데이트 요청
      const { data } = await axios.patch(`https://i11b307.p.ssafy.io/api/v1/baby`, {
        babyName,
        babyGender: babyGender === '남', // '남'이면 true, '여'이면 false
        babyBirthdate,
        nickname,
      });

      // 상태 업데이트: 사용자 정보와 아기 정보
      setUserInfo({
        ...userInfo,
        nickname,
      });
      setBabyInfo(data);

      toggleModal(); // 모달 닫기
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  // 모달을 열고 닫는 함수
  const toggleModal = () => {
    if (!isModalOpen) {
      setNickname(userInfo.nickname); // 닉네임 상태 초기화
      setBabyName(babyInfo.babyName); // 아기 이름 상태 초기화
      setBabyGender(babyInfo.babyGender ? '남' : '여'); // 아기 성별 상태 초기화
      setBabyBirthdate(babyInfo.babyBirthdate); // 아기 생일 상태 초기화
    }
    setModalOpen(!isModalOpen); // 모달 상태 토글
  };

  return (
    <div className="mx-auto px-4 py-4 max-w-xl mt-20">
      {/* 프로필 섹션 */}
      <div className="flex items-center text-center mb-4">
        <img
          src={userInfo.profileImage || "https://bacation.s3.ap-northeast-2.amazonaws.com/frontImage/profile.jpg"}
          alt="Profile-image"
          className="w-24 h-24 rounded-full mr-4"
        />
        <div className="text-left flex-1">
          <h2 className="text-2xl font-bold mb-1">{userInfo.nickname || "사용자"}</h2>
          <p className="text-sm text-gray-500">{babyInfo.babyName || "김아기"} · {calculateBabyAge(babyInfo.babyBirthdate)}</p>
        </div>
        <img
          src="https://bacation.s3.ap-northeast-2.amazonaws.com/frontImage/setting.png"
          alt="Edit-profile"
          className="w-6 h-6 rounded-full cursor-pointer"
          onClick={toggleModal} // 프로필 수정 모달 열기
        />
      </div>

      {/* 함께한 날짜 섹션 */}
      <div className="my-6 bg-gray-100 p-4 rounded-lg flex items-center justify-center">
        <img src="https://bacation.s3.ap-northeast-2.amazonaws.com/frontImage/calendar.png" alt="calendar icon" className="h-6 w-6 mr-2" />
        <p>
          베케이션과 함께한 지 <span className="text-[#FD5900]">{calculateDaysTogether(userInfo.signupDate || '')}</span>
        </p>
      </div>

      {/* 데이터 보기 및 일기 보기 버튼 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => navigate('/data')}
          className="bg-orange-100 py-4 rounded-lg text-center">
          <img src="https://bacation.s3.ap-northeast-2.amazonaws.com/frontImage/data.png" alt="Data icon" className="h-6 w-6 mx-auto mb-2" />
          기록된 데이터 보기
        </button>

        <button
          onClick={() => navigate('/diary')}
          className="bg-blue-100 py-4 rounded-lg text-center">
          <img src="https://bacation.s3.ap-northeast-2.amazonaws.com/frontImage/diary.png" alt="Diary icon" className="h-6 w-6 mx-auto mb-2" />
          작성한 일기 보기
        </button>
      </div>

      {/* 설정, 공지사항, 로그아웃 버튼 */}
      <div className="space-y-4">
        <div className="mb-4 border-l-4 border-[#FD5900]">
          <div
            onClick={() => navigate('/settings')}
            className="bg-gray-100 p-4 rounded shadow-md cursor-pointer">
            설정
          </div>
        </div>

        <div className="mb-4 border-l-4 border-[#FD5900]">
          <div
            onClick={() => navigate('/announcements')}
            className="bg-gray-100 p-4 rounded shadow-md cursor-pointer">
            공지사항
          </div>
        </div> 

        <div className="mb-4 border-l-4 border-[#FD5900]">
          <div
            onClick={handleLogout}
            className="bg-gray-100 p-4 rounded shadow-md cursor-pointer">
            로그아웃
          </div> 
        </div> 
      </div>

      {/* 회원 탈퇴 버튼 */}
      <div className="flex justify-center mt-32">
        <button
          onClick={() => navigate('/delete-account')}
          className="text-gray-400 underline bg-transparent border-none">
          회원 탈퇴
        </button>
      </div>

      {/* 회원 정보 수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-3xl max-w-xs w-full">
            <div className="p-10">
              <div className="text-xl font-bold mb-10 text-center text-gray-600">
                회원 정보 수정
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="사용자"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={babyName}
                  onChange={(e) => setBabyName(e.target.value)}
                  placeholder="김아기"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={babyGender}
                  onChange={(e) => setBabyGender(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">성별</option>
                  <option value="남">남</option>
                  <option value="여">여</option>
                </select>
                <input
                  type="date"
                  value={babyBirthdate}
                  onChange={(e) => setBabyBirthdate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div
              onClick={updateUserInfo} // 정보 수정 후 확인 버튼 클릭 시 실행
              className="border-t border-gray-300 flex place-content-center py-6"
            >
              <button className="text-[#FD5900] font-semibold bg-transparent border-none">
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;

// 아기 나이를 계산하는 함수
const calculateBabyAge = (birthdate: string): string => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  const ageInMillis = today.getTime() - birthDate.getTime();
  const ageInMonths = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 30.44));
  const ageInWeeks = Math.floor((ageInMillis / (1000 * 60 * 60 * 24 * 7)) % 4.34524);
  return `${ageInMonths}개월 ${ageInWeeks}주`;
};

// 함께한 날짜를 계산하는 함수
const calculateDaysTogether = (signupDate: string): string => {
  if (!signupDate) return '0일';
  const today = new Date();
  const signup = new Date(signupDate);
  const daysTogether = Math.floor((today.getTime() - signup.getTime()) / (1000 * 60 * 60 * 24));
  return `${daysTogether}일`;
};
