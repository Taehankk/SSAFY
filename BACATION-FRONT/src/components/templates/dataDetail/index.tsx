import { addHours, format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

interface Detail {
  time: Date;
  detectId: number;
  detect: string;
}

export const DataDetail = () => {
  const navigate = useNavigate();

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

  const clickToBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full">
      <div className="flex space-x-5 py-5 mb-3 px-3">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="mt-1"
          onClick={() => navigate(-1)}
        />
        <p className="text-lg font-semibold">기록된 데이터 보기</p>
      </div>
      <div className="mb-4 text-xl">
        <span className="text-blue-600 font-semibold  ">수면</span>
        <span> 중 데이터</span>
        {/* <div className="border-l-4 border-blue-600 bg-gray-100 p-4 rounded shadow-md"> */}
        <div className="border-l-4 border-blue-600 p-4 space-y-2">
          {sleeplData.map((d, index) => (
            <div key={index} className="h-[23px] flex relative items-center ">
              {/* <span className="left-0 top-[3px] absolute text-[#73777d] text-xs font-normal leading-[18px]"> */}
              <span className="ml-0 top-[3px] absolute text-[#73777d] text-xs font-normal leading-[18px]">
                {d.time.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              {/* <span className="left-[128px] top-0 absolute text-[#1c1c26] text-[15px] font-normal"> */}
              <span className="ml-20 top-0 text-[#1c1c26] text-[15px] font-normal">
                {d.detect} 발생
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 활동 중 데이터 */}
      <div className=" text-xl">
        <span className="text-yellow-600 font-semibold">활동</span>
        <span> 중 데이터</span>
        {/* <div className="border-l-4 border-yellow-600 bg-gray-100 p-4 rounded shadow-md"> */}
        <div className="border-l-4 border-yellow-600 p-4 space-y-2">
          {activeData.map((d, i) => (
            <div key={i} className="h-[23px] flex relative items-center">
              {/* <span className="left-0 top-[3px] absolute text-[#73777d] text-xs font-normal leading-[18px]"> */}
              <span className="ml-0 top-[3px] absolute text-[#73777d] text-xs font-normal leading-[18px]">
                {d.time.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              {/* <span className="left-[128px] top-0 absolute text-[#1c1c26] text-[15px] font-normal"> */}
              <span className="ml-20 top-0 text-[#1c1c26] text-[15px] font-normal">
                {d.detect} 발생
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
