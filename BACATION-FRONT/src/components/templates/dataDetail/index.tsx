import { addHours } from 'date-fns';
import { useState } from 'react';

interface Detail {
  time: Date;
  detectId: number;
  detect: string;
}

export const DataDetail = () => {
  const [sleeplData, setSleeplData] = useState<Detail[]>([
    { time: new Date(), detectId: 0, detect: '뒤집기' },
    {
      time: addHours(new Date(), 1),
      detectId: 0,
      detect: '뒤집기',
    },
    {
      time: addHours(new Date(), 3),
      detectId: 1,
      detect: '끼임',
    },
  ]);

  const [activeData, setActiveData] = useState<Detail[]>([
    { time: new Date(), detectId: 2, detect: '낙상' },
    {
      time: addHours(new Date(), 1),
      detectId: 0,
      detect: '뒤집기',
    },
    {
      time: addHours(new Date(), 3),
      detectId: 1,
      detect: '끼임',
    },
  ]);

  return (
    <div className="p-4 w-auto h-auto">
      {/* 수면 중 데이터 */}
      <div className="mb-4 border-l-4 border-blue-600">
        <div className="bg-gray-100 p-4 rounded shadow-md">
          {sleeplData.map((d) => (
            <div className="w-[250px] h-[23px] relative">
              <span className="left-0 top-[3px] absolute text-[#73777d] text-xs font-normal leading-[18px]">
                {d.time.toLocaleTimeString()}
              </span>
              <span className="left-[128px] top-0 absolute text-[#1c1c26] text-[15px] font-normal">
                {d.detect} 발생
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 활동 중 데이터 */}
      <div className="border-l-4 border-yellow-600">
        <div className="bg-gray-100 p-4 rounded shadow-md">
          {activeData.map((d) => (
            <div className="w-[250px] h-[23px] relative">
              <span className="left-0 top-[3px] absolute text-[#73777d] text-xs font-normal leading-[18px]">
                {d.time.toLocaleTimeString()}
              </span>
              <span className="left-[128px] top-0 absolute text-[#1c1c26] text-[15px] font-normal">
                {d.detect} 발생
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
