import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => {
    setStep(step + 1);
  };

  const skipOnboarding = () => {
    navigate('/login'); // 건너뛰기를 누르면 로그인 페이지로 이동
  };


  return (
    <div className="container">
      {step === 1 ? (
        <div className="content">
          <h2>눈에 넣어도 안 아플 아이<br />하지만 힘들지는 않으신가요?</h2>
          <p>서비스를 사용해 자기만의 시간을 확보해요.<br />할 일이 있을때는 서비스를 활용해 집중할 시간을 가져요.</p>
          <img src="/src/assets/onboardingPage/babymobile.png" alt="baby mobile" className="image" />
          <button onClick={nextStep} className="button">다음으로</button>
        </div>
      ) : (
        <div className="content">
          <h2>안전한 아이의 활동을 위한<br />서비스, 베케이션</h2>
          <p>베이비+베케이션의 합성어로<br />아이 걱정을 하기 힘들 때는 쉬면서<br />더욱 건강한 아이와의 생활을 도와줘요.</p>
          <img src="/src/assets/onboardingPage/babymobile.png" alt="baby mobile" className="image" />
          <button onClick={() => navigate('/usage-guide')} className="button">사용설명 보기</button>
          <button onClick={skipOnboarding} className="button">건너뛰기</button>
        </div>
      )}
    </div>
  );
}

export default Onboarding;
