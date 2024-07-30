import { addHours } from 'date-fns';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="p-4">
      <div className="my-2" onClick={clickToBack}>
        ◀ 기록된 데이터 보기
      </div>
      {/* <div className="my-2">
        <Link className="text-black text-sm" to={'/data'}>
          ◀ 기록된 데이터 보기
        </Link>
      </div> */}
      {/* 수면 중 데이터 */}
      <div className="mb-4  text-lg sm:text-xl md:text-2xl">
        <span className="text-blue-600 font-semibold  ">수면</span>
        <span> 중 데이터</span>
        <div className="border-l-4 border-blue-600 bg-gray-100 p-4 rounded shadow-md">
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
      <div className=" text-lg sm:text-xl md:text-2xl">
        <span className="text-yellow-600 font-semibold">활동</span>
        <span> 중 데이터</span>
        <div className="border-l-4 border-yellow-600 bg-gray-100 p-4 rounded shadow-md">
          {activeData.map((d, i) => (
            <div key={i} className="w-[250px] h-[23px] relative">
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
