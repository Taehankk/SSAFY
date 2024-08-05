import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const InitialSettingsPage: React.FC = () => {
  // 수면 모드 알림 상태
  const [flipAlertSleep, setFlipAlertSleep] = useState(false);
  const [fallDetectionAlertSleep, setFallDetectionAlertSleep] = useState(false);
  const [cryingAlertSleep, setCryingAlertSleep] = useState(false);

  // 활동 모드 알림 상태
  const [flipAlertActivity, setFlipAlertActivity] = useState(false);
  const [fallDetectionAlertActivity, setFallDetectionAlertActivity] = useState(false);
  const [cryingAlertActivity, setCryingAlertActivity] = useState(false);

  // 수면 모드와 활동 모드 구분을 위한 상태
  const [isSleepMode, setIsSleepMode] = useState(true);

  const navigate = useNavigate();

  // 알림 상태를 토글하는 함수
  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setter(prev => !prev);
  };

  // 다음 버튼 클릭 시 호출되는 함수
  const handleNext = () => {
    if (isSleepMode) {
      // 현재 수면 모드이면 활동 모드로 전환
      setIsSleepMode(false);
    } else {
      // 활동 모드 설정을 저장하고 메인 페이지로 이동
      saveSettings();
      navigate('/main');
    }
  };

  // 이전 버튼 클릭 시 호출되는 함수
  const handlePrevious = () => {
    if (!isSleepMode) {
      // 현재 활동 모드이면 수면 모드로 돌아가기
      setIsSleepMode(true);
    }
  };

  // 알림 설정을 저장하는 함수
  const saveSettings = () => {
    // 수면 모드 설정 객체 생성
    const sleepModeSettings = {
      flipAlert: flipAlertSleep,
      fallDetectionAlert: fallDetectionAlertSleep,
      cryingAlert: cryingAlertSleep,
    };

    // 활동 모드 설정 객체 생성
    const activityModeSettings = {
      flipAlert: flipAlertActivity,
      fallDetectionAlert: fallDetectionAlertActivity,
      cryingAlert: cryingAlertActivity,
    };

    // 예시로 콘솔에 출력 (실제로는 서버에 저장)
    console.log('Sleep Mode Settings:', sleepModeSettings);
    console.log('Activity Mode Settings:', activityModeSettings);

    // 여기 서버에 설정을 저장하는 API 호출 코드 나중에 추가~~
  };

  return (
    <div className="mx-auto px-4 py-4 max-w-xl mt-20">
      {/* 페이지 제목 */}
      <h2 className="text-center text-2xl font-bold mb-16">
        {isSleepMode ? '준비가 되었나요?' : '활동 준비가 되었나요?'}
      </h2>
      {/* 안내 문구 */}
      <p className="text-center font-medium text-gray-500 mb-6">
        <span className='text-orange-500'>
          {isSleepMode ? '누워있는 아이를 위쪽에서 정면으로 ' : '아이의 활동 반경이 '}
        </span>
        {isSleepMode ? '촬영해 주세요.' : '가이드 영역 안에 있어야 합니다.'}
      </p>
      {/* 가이드 이미지 */}
      <div className="flex justify-center mb-12">
        <img
          src={isSleepMode ? "/src/assets/initialSettingsPage/guide-night.png" : "/src/assets/initialSettingsPage/guide-day.png"}
          alt="Camera view"
          className="rounded-lg"
          style={{ width: '340px' }}
        />
      </div>
      {/* 알림 설정 */}
      <div className="mx-auto" style={{ width: '340px' }}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">뒤집기 알림</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={isSleepMode ? flipAlertSleep : flipAlertActivity}
                onChange={handleToggle(isSleepMode ? setFlipAlertSleep : setFlipAlertActivity)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">낙상 감지 알림</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={isSleepMode ? fallDetectionAlertSleep : fallDetectionAlertActivity}
                onChange={handleToggle(isSleepMode ? setFallDetectionAlertSleep : setFallDetectionAlertActivity)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">울음 소리 알림</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={isSleepMode ? cryingAlertSleep : cryingAlertActivity}
                onChange={handleToggle(isSleepMode ? setCryingAlertSleep : setCryingAlertActivity)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        {/* 이전 및 다음/활동 시작 버튼 */}
        <div className="flex justify-between mt-20">
          {isSleepMode ? (
            <>
              <button className="bg-gray-500 text-white py-3 px-6 rounded-lg w-40" onClick={handlePrevious}>
                이전
              </button>
              <button className="bg-orange-500 text-white py-3 px-6 rounded-lg w-40" onClick={handleNext}>
                다음으로
              </button>
            </>
          ) : (
            <button className="bg-orange-500 text-white py-3 px-6 rounded-lg mx-auto w-80" onClick={handleNext}>
              활동 시작
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 34px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #f97316;
        }

        input:checked + .slider:before {
          transform: translateX(16px);
        }
      `}</style>
    </div>
  );
};

export default InitialSettingsPage;
