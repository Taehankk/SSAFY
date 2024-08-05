import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => {
    setStep(step + 1);
  };

  const skipOnboarding = () => {
    navigate('/login'); // 건너뛰기를 누르면 로그인 페이지로 이동
  };

  const pages = [
    {
      title: "눈에 넣어도 안 아플 아이<br />하지만 힘들지는 않으신가요?",
      description: "서비스를 사용해 자기만의 시간을 확보해요.<br />할 일이 있을때는 서비스를 활용해 <br />집중할 시간을 가져요.",
      button: "다음으로"
    },
    {
      title: "안전한 아이의 활동을 위한<br />서비스,<span class='text-orange-500'>베케이션</span>",
      description: "베이비+베케이션의 합성어로<br />아이 걱정을 하기 힘들 때는 쉬면서<br />더욱 건강한 아이와의 생활을 도와줘요.",
      button: "사용설명 보기"
    }
  ];

  return (
<div className="container mx-auto p-4 max-w-xl">
  {/* 페이지 인디케이터 */}
  <div className="flex justify-center mt-20 space-x-2 mb-16">
    {pages.map((_, index) => (
      <div
        key={index}
        className={`w-2 h-2 rounded-full cursor-pointer ${
          step === index + 1 ? 'bg-gray-500' : 'bg-gray-200'
        }`}
        onClick={() => setStep(index + 1)}
      />
    ))}
  </div>

  <div className="content text-left">
    <h2 className="text-2xl font-bold mb-10" dangerouslySetInnerHTML={{ __html: pages[step - 1].title }}></h2>
    <p className="text-m font-semibold text-gray-400 mb-16" dangerouslySetInnerHTML={{ __html: pages[step - 1].description }}></p>
    <img src="/src/assets/onboardingPage/babymobile.png" alt="baby mobile" className="image mx-auto mb-16" style={{ width: '270px' }}/>

    {step === 1 ? (
     <div className="text-center">
     <button onClick={nextStep} className="button bg-gray-500 text-white py-3 px-4 rounded-lg w-80">
       {pages[step - 1].button}
     </button>
   </div>
    ) : (
      <div className="flex justify-center space-x-6">
        <button onClick={() => navigate('/usage-guide')} className="button bg-orange-500 text-white py-3 px-4 rounded-lg w-36">
          {pages[step - 1].button}
        </button>
        <button onClick={skipOnboarding} className="button bg-gray-500 text-white py-3 px-4 rounded-lg w-36">
          건너뛰기
        </button>
      </div>
    )}
  </div>
</div>

  );
}

export default Onboarding;
