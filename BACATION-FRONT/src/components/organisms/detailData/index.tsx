import { useEffect, useState } from 'react';
import { TopBar } from '../../atoms/topBar';
import axios from 'axios';
import { format } from 'date-fns';

import useDataStore from '../../../store/useDataStore';

interface Detail {
  detectId: number;
  memberId: number;
  detectName: number;
  detectTime: Date;
}

export const DetailData = () => {
  const selectDate = useDataStore((state) => state.selectDate);
  const tempArr = useDataStore((state) => state.tempArr);

  const selected = format(tempArr[selectDate], 'yyyy-MM-dd');

  const [activeData, setActiveData] = useState<Detail[]>([]);
  const [sleeplData, setSleeplData] = useState<Detail[]>([]);

  useEffect(() => {
    axios
      .get('https://i11b307.p.ssafy.io:8081/api/v1/data/day', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        params: { dateTime: selected },
      })
      .then((response) => {
        setActiveData(response.data);
      })
      .catch((error) => {
        console.log('데이터를 받아오지 못했습니다.');
        console.log(error);
      });

    axios
      .get('https://i11b307.p.ssafy.io:8081/api/v1/data/night', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        params: { dateTime: selected },
      })
      .then((response) => {
        setSleeplData(response.data);
      })
      .catch((error) => {
        console.log('데이터를 받아오지 못했습니다.');
        console.log(error);
      });
  });

  return (
    <div className="w-full">
      {/* 이전 페이지로 돌아가기 버튼 */}
      <TopBar title={'기록된 데이터 보기'} />

      {/* 수면 모드 데이터 출력 */}
      <div className="mb-4 text-xl">
        <span className="text-blue-600 font-semibold  ">수면</span>
        <span> 중 데이터</span>
        <div className="border-l-4 border-blue-600 p-4 space-y-2">
          {sleeplData.map((d, index) => (
            <div key={index} className="h-[23px] flex relative items-center ">
              <span className="ml-0 top-[3px] absolute text-[#73777d] text-xs font-normal leading-[18px]">
                {d.detectTime.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <span className="ml-20 top-0 text-[#1c1c26] text-[15px] font-normal">
                {d.detectName} 발생
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 활동 모드 데이터 출력 */}
      <div className=" text-xl">
        <span className="text-yellow-600 font-semibold">활동</span>
        <span> 중 데이터</span>
        <div className="border-l-4 border-yellow-600 p-4 space-y-2">
          {activeData.map((d, i) => (
            <div key={i} className="h-[23px] flex relative items-center">
              <span className="ml-0 top-[3px] absolute text-[#73777d] text-xs font-normal leading-[18px]">
                {d.detectTime.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <span className="ml-20 top-0 text-[#1c1c26] text-[15px] font-normal">
                {d.detectName} 발생
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
