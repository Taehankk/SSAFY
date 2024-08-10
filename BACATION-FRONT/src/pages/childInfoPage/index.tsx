import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from '../../store/useUserStore';

const ChildInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo); // Zustand 스토어에서 사용자 정보 가져오기
  const setUserInfo = useUserStore((state) => state.setUserInfo); // 사용자 정보 설정 함수 가져오기
  const setBabyInfo = useUserStore((state) => state.setBabyInfo); // 아기 정보 설정 함수 가져오기

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleNext = async () => {
    try {
      const token = userInfo.accessToken; // Zustand 스토어에서 JWT 토큰 가져오기
      if (!token) {
        throw new Error('JWT token is missing');
      }

      const memberId = userInfo.id; // 저장된 사용자 정보에서 memberId 가져오기

      const babyInfo = {
        memberId: memberId,
        babyName: name,
        babyGender: gender === '남',
        babyBirthdate: birthDate,
      };

      // 아기 정보 저장 요청
      const saveResponse = await axios.post('https://i11b307.p.ssafy.io/api/v1/baby/save', babyInfo, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Baby Info Save Success:', saveResponse.data);

      // 아기 정보 상태 업데이트
      setBabyInfo({
        babyName: name,
        babyGender: gender,
        babyBirthdate: birthDate,
      });

      // [GET] /active/alarm 요청
      const alarmResponse = await axios.get('https://i11b307.p.ssafy.io/api/v1/active/alarm', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Alarm Info:', alarmResponse.data);

      // 현재 날짜를 signupDate로 저장
      const signupDate = new Date().toISOString();
      setUserInfo({ ...userInfo, signupDate });

      navigate('/permission');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center mt-8 mb-24">
        <img src="https://bacation.s3.ap-northeast-2.amazonaws.com/frontImage/child-head.png" alt="아이 이미지" className="w-7 h-7 mr-2" />
        <h2 className="text-2xl font-bold">아이에 대해 알고 싶어요!</h2>
      </div>
      <form className="w-4/5 max-w-md">
        <div className="mb-8">
          <label className="block mb-2 font-semibold text-gray-700">
            이름
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="김아기"
              className="w-full mt-2 px-3 py-2 border-b border-gray-400 focus:outline-none"
            />
          </label>
        </div>
        <div className="mb-8">
          <label className="block mb-2 font-semibold text-gray-700">
            성별
            <div className="mt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setGender('남')}
                className={`w-1/2 mr-2 px-6 py-2 rounded-lg bg-white ${gender === '남' ? 'border-2 border-[#FD5900]' : 'border border-gray-400'}`}
              >
                남
              </button>
              <button
                type="button"
                onClick={() => setGender('여')}
                className={`w-1/2 ml-2 px-6 py-2 rounded-lg bg-white ${gender === '여' ? 'border-2 border-[#FD5900]' : 'border border-gray-400'}`}
              >
                여
              </button>
            </div>
          </label>
        </div>
        <div className="mb-3">
          <label className="block mb-2 font-semibold text-gray-700">
            생일
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full mt-2 px-3 py-2 border-b border-gray-400 focus:outline-none"
            />
          </label>
        </div>
        <p className="text-sm text-gray-300 mb-44">아이 정보는 언제든 마이페이지에서 변경할 수 있습니다.</p>
        <div>
          <button
            type="button"
            onClick={handleNext}
            className="py-3 px-4 bg-[#FD5900] text-white rounded-lg w-80"
          >
            다음으로
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChildInfoPage;
