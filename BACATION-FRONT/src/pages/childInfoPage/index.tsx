import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChildInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleNext = () => {
    navigate('/next-page'); // 다음 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center mt-8 mb-24">
        <img src="/src/assets/childInfoPage/child-head.png" alt="아이 이미지" className="w-7 h-7 mr-2" />
        <h2 className="text-2xl font-bold">아이에 대해 알고 싶어요!</h2>
      </div>
      <form className="w-4/5 max-w-md">
        <div className="mb-6">
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
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            성별
            <div className="mt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setGender('남')}
                className={`w-1/2 mr-2 px-6 py-2 rounded-lg bg-white ${
                  gender === '남' ? 'border-2 border-orange-500' : 'border border-gray-400'
                }`}
              >
                남
              </button>
              <button
                type="button"
                onClick={() => setGender('여')}
                className={`w-1/2 ml-2 px-6 py-2 rounded-lg bg-white ${
                  gender === '여' ? 'border-2 border-orange-500' : 'border border-gray-400'
                }`}
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
        <p className="text-sm text-gray-300 mb-12">
          아이 정보는 언제든 마이페이지에서 변경할 수 있습니다.
        </p>
        <div>
          <button
            type="button"
            onClick={handleNext}
            className="py-3 px-4  bg-orange-500 text-white rounded-lg w-80"
          >
            다음으로
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChildInfoPage;
