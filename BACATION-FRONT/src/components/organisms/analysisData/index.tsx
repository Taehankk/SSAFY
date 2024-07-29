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
    <div className="p-4">
      <div className="flex-col justify-center content-center">
        {/* 수면 중 데이터 */}
        <p className="text-blue-600 font-semibold text-lg sm:text-xl md:text-2xl">
          수면 중 데이터
        </p>
        <div className="mb-4 border-l-4 border-blue-600 pl-4">
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <span className="block text-gray-700 text-base sm:text-lg md:text-xl">
              평균 알림 횟수 약{' '}
              <span className="text-orange-600">{sleepData.detectCount}회</span>
            </span>
            <span className="block text-gray-700 text-base sm:text-lg md:text-xl">
              가장 많이 감지된 움직임은{' '}
              <span className="text-orange-600">{sleepData.manyDetect}</span>
            </span>
          </div>
        </div>

        {/* 활동 중 데이터 */}
        <p className="text-yellow-600 font-semibold text-lg sm:text-xl md:text-2xl">
          활동 중 데이터
        </p>
        <div className="border-l-4 border-yellow-600 pl-4">
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <span className="block text-gray-700 text-base sm:text-lg md:text-xl">
              평균 알림 횟수 약{' '}
              <span className="text-orange-600">
                {activeData.detectCount}회
              </span>
            </span>
            <span className="block text-gray-700 text-base sm:text-lg md:text-xl">
              가장 많이 감지된 움직임은{' '}
              <span className="text-orange-600">{activeData.manyDetect}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
