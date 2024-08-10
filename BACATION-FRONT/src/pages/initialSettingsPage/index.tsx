import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IphoneButton from '../../components/organisms/button/iphoneButton';

export const InitialSettingsPage: React.FC = () => {
  const [reverseCaution, setReverseCaution] = useState(false); // 수면 모드: 뒤집기 알림
  const [soundCaution, setSoundCaution] = useState(false); // 수면 모드: 울음 소리 알림

  const [fallCaution, setFallCaution] = useState(false); // 활동 모드: 낙상 감지 알림
  const [crashCaution, setCrashCaution] = useState(false); // 활동 모드: 충돌 감지 알림
  const [stuckCaution, setStuckCaution] = useState(false); // 활동 모드: 끼임 감지 알림

  const [isNightMode, setIsNightMode] = useState(true); // 현재 모드: true이면 수면 모드, false이면 활동 모드

  const navigate = useNavigate();

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setter(prev => !prev); // boolean 값을 토글
  };

  const handleNext = () => {
    if (isNightMode) {
      saveSettings(true); // 수면 모드 설정 저장
      setIsNightMode(false); // 활동 모드로 전환
    } else {
      saveSettings(false); // 활동 모드 설정 저장
      navigate('/main'); // 메인 페이지로 이동
    }
  };

  const handlePrevious = () => {
    if (!isNightMode) {
      setIsNightMode(true); // 활동 모드에서 수면 모드로 전환
    }
  };

  const saveSettings = async (isNightMode: boolean) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('JWT token is missing');
      return;
    }

    try {
      let settings;
      let url;

      if (isNightMode) {
        // 수면 모드 설정 데이터
        settings = {
          reverseCaution: reverseCaution, // boolean 값
          soundCaution: soundCaution, // boolean 값
        };

        url = 'https://i11b307.p.ssafy.io/api/v1/active/alarm/night';
      } else {
        // 활동 모드 설정 데이터
        settings = {
          fallCaution: fallCaution, // boolean 값
          crashCaution: crashCaution, // boolean 값
          stuckCaution: stuckCaution, // boolean 값
        };

        url = 'https://i11b307.p.ssafy.io/api/v1/active/alarm/day';
      }

      console.log('Sending settings to URL:', url);
      console.log('Settings:', settings);

      const response = await axios({
        method: 'PATCH',
        url: url,
        data: settings,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Response from server:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error saving settings:', error.message);
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="mx-auto px-4 py-4 max-w-xl mt-20">
      <h2 className="text-center text-2xl font-bold mb-16">
        {isNightMode ? '수면모드 알림을 설정할까요?' : '활동 모드 알림을 설정할까요?'}
      </h2>
      <p className="text-center font-medium text-gray-500 mb-6">
        <span className='text-[#FD5900]'>
          {isNightMode ? '누워있는 아이를 위쪽에서 정면으로 ' : '아이의 활동 반경이 '}
        </span>
        {isNightMode ? '촬영해 주세요.' : '가이드 영역 안에 있어야 합니다.'}
      </p>
      <div className="flex justify-center mb-12">
        <img
          src={isNightMode ? "https://bacation.s3.ap-northeast-2.amazonaws.com/frontImage/guide-night.png" : "https://bacation.s3.ap-northeast-2.amazonaws.com/frontImage/guide-day.png"}
          alt="Camera view"
          className="rounded-lg"
          style={{ width: '340px' }}
        />
      </div>
      <div className="mx-auto" style={{ width: '340px' }}>
        <div className="space-y-6">
          {isNightMode ? (
            <>
              <div className="flex justify-between items-center mt-24">
                <span className="text-lg font-medium">뒤집기 알림</span>
                <IphoneButton
                  isChecked={reverseCaution}
                  onToggle={handleToggle(setReverseCaution)}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">울음 소리 알림</span>
                <IphoneButton
                  isChecked={soundCaution}
                  onToggle={handleToggle(setSoundCaution)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">낙상 감지 알림</span>
                <IphoneButton
                  isChecked={fallCaution}
                  onToggle={handleToggle(setFallCaution)}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">충돌 감지 알림</span>
                <IphoneButton
                  isChecked={crashCaution}
                  onToggle={handleToggle(setCrashCaution)}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">끼임 감지 알림</span>
                <IphoneButton
                  isChecked={stuckCaution}
                  onToggle={handleToggle(setStuckCaution)}
                />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-between mt-24">
          {isNightMode ? (
            <>
              <button className="bg-gray-500 text-white py-3 px-6 rounded-lg w-40" onClick={handlePrevious}>
                이전
              </button>
              <button className="bg-[#FD5900] text-white py-3 px-6 rounded-lg w-40" onClick={handleNext}>
                다음으로
              </button>
            </>
          ) : (
            <button className="bg-[#FD5900] text-white py-3 px-6 rounded-lg mx-auto w-80" onClick={handleNext}>
              활동 시작
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InitialSettingsPage;
