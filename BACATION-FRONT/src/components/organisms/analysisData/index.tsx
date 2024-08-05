import { useState } from 'react';

interface Data {
  detectId: number;
  manyDetect: string;
  detectCount: number;
}

export const AnalysisData = () => {
  const [sleepData, setSleepData] = useState<Data>({
    detectId: 1,
    manyDetect: '끼임',
    detectCount: 7,
  });

  const [activeData, setActiveData] = useState<Data>({
    detectId: 0,
    manyDetect: '뒤집기',
    detectCount: 11,
  });

  return (
    <div className="w-full flex-col justify-center content-center ">
      {/* 수면 중 데이터 */}
      <div className="">
        <p className="text-xl">
          <span className="text-blue-600 font-semibold  ">수면</span>
          <span> 중 데이터</span>
        </p>
        <div className="mb-4 border-l-4 border-blue-600">
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <span className="block text-gray-700 text-lg">
              평균 알림 횟수 약{' '}
              <span className="text-orange-600">{sleepData.detectCount}회</span>
            </span>
            <span className="block text-gray-700 text-lg">
              가장 많이 감지된 움직임은{' '}
              <span className="text-orange-600">{sleepData.manyDetect}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 활동 중 데이터 */}
      <div className="">
        <p className="text-xl">
          <span className="text-yellow-600 font-semibold">활동</span>
          <span> 중 데이터</span>
        </p>
        <div className="border-l-4 border-yellow-600">
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <span className="block text-gray-700 text-lg">
              평균 알림 횟수 약{' '}
              <span className="text-orange-600">
                {activeData.detectCount}회
              </span>
            </span>
            <span className="block text-gray-700 text-lg">
              가장 많이 감지된 움직임은{' '}
              <span className="text-orange-600">{activeData.manyDetect}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
