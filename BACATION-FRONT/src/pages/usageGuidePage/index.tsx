import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useguide1 from '/src/assets/usageGuidePage/useguide1.png'; 
import useguide2 from '/src/assets/usageGuidePage/useguide2.png'; 
import useguide3 from '/src/assets/usageGuidePage/useguide3.png'; 

const images = [useguide1, useguide2, useguide3];
const texts = [
  '원하는 알림을 설정해요.',
  '다양한 부가 기능을 활용해요.',
  '데이터 분석을 통한 내 아이의 상태 점검'
];

const UsageGuidePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextContent = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handleStart = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <div>
      <div>
        <h2>안전한 아이의 활동을 위한 서비스, 베케이션</h2>
        <p>{texts[currentIndex]}</p>
        <img src={images[currentIndex]} alt="Usage step" />
        {currentIndex === images.length - 1 ? (
          <button onClick={handleStart}>시작하기</button>
        ) : (
          <button onClick={nextContent}>다음으로</button>
        )}
      </div>
    </div>
  );
}

export default UsageGuidePage;
