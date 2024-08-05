import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  // 모달을 토글하는 함수
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="mx-auto px-4 py-4 max-w-xl mt-20">
      {/* 사용자 프로필 섹션 */}
      <div className="flex items-center text-center mb-4">
        <img
          src="https://i1.sndcdn.com/artworks-nS5zU2ZseiW3oRgT-PjrnSw-t500x500.jpg"
          alt="Profile-image"
          className="w-24 h-24 rounded-full mr-4"
        />
        <div className="text-left flex-1">
          <h2 className="text-2xl font-bold mb-1">정채린</h2>
          <p className="text-sm text-gray-500">김아기 · 5개월 2주</p>
        </div>
        {/* 설정 아이콘 클릭 시 모달 오픈 */}
        <img
          src="/src/assets/myPage/setting.png"
          alt="Edit-profile"
          className="w-6 h-6 rounded-full cursor-pointer"
          onClick={toggleModal}
        />
      </div>

      {/* 베케이션과 아이가 함께한 일수 표시 섹션 */}
      <div className="my-6 bg-gray-100 p-4 rounded-lg flex items-center justify-center">
        <img src="/src/assets/myPage/calendar.png" alt="calendar icon" className="h-6 w-6 mr-2" />
        <p>
          베케이션과 아이가 함께한 지 <span className="text-orange-500">82일</span>
        </p>
      </div>

      {/* 기록된 데이터 및 작성한 일기 보기 버튼 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => navigate('/data')}
          className="bg-orange-100 py-4 rounded-lg text-center">
          <img src="/src/assets/myPage/data.png" alt="Data icon" className="h-6 w-6 mx-auto mb-2" />
          기록된 데이터 보기
        </button>

        <button
          onClick={() => navigate('/diary')}
          className="bg-blue-100 py-4 rounded-lg text-center">
          <img src="/src/assets/myPage/diary.png" alt="Diary icon" className="h-6 w-6 mx-auto mb-2" />
          작성한 일기 보기
        </button>
      </div>

      {/* 설정, 공지사항, 로그아웃 버튼 */}
      <div className="space-y-4">
        <div className="mb-4 border-l-4 border-orange-600">
          <div
            onClick={() => navigate('/settings')}
            className="bg-gray-100 p-4 rounded shadow-md cursor-pointer">
            설정
          </div>
        </div>

        <div className="mb-4 border-l-4 border-orange-600">
          <div
            onClick={() => navigate('/announcements')}
            className="bg-gray-100 p-4 rounded shadow-md cursor-pointer">
            공지사항
          </div>
        </div> 

        <div className="mb-4 border-l-4 border-orange-600">
          <div
            onClick={() => navigate('/logout')}
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
          <div className="bg-white p-10 rounded-3xl max-w-xs w-full">
            <h2 className="text-xl font-bold mb-10 text-center  text-gray-600">회원 정보 수정</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="정채린"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="김아기"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>성별</option>
                <option value="female">여</option>
                <option value="male">남</option>
              </select>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              onClick={toggleModal}
              className="mt-4 w-full bg-orange-500 text-white p-2 rounded-lg">
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
