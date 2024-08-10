import React from 'react';

interface IphoneButtonProps {
  isChecked: boolean; // 버튼의 체크 상태를 나타내는 boolean 값
  onToggle: () => void; // 버튼의 체크 상태를 변경하는 함수
}

/**
 * IphoneButton 컴포넌트
 *
 * @param {boolean} isChecked - 스위치의 체크 상태
 * @param {function} onToggle - 스위치의 체크 상태를 변경하는 함수
 *
 * @returns {JSX.Element} 스위치 버튼 요소
 *
 * @example
 * <IphoneButton isChecked={true} onToggle={handleToggle} />
 */
const IphoneButton: React.FC<IphoneButtonProps> = ({ isChecked, onToggle }) => {
  return (
    <label className="switch">
      {/* 체크 상태와 상태 변경 함수를 받아 스위치 버튼의 동작을 관리 */}
      <input type="checkbox" checked={isChecked} onChange={onToggle} />
      <span className="slider round"></span>

      {/* 스타일 정의 */}
      <style>{`
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
          content: '';
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
    </label>
  );
};

export default IphoneButton;
