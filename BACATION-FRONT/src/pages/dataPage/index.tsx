import { useState } from 'react';
import { DayData } from '../../components/templates/dayData';
import { AnalysisData } from '../../components/organisms/analysisData';

export const DataPage = () => {
  const [checked, setChecked] = useState('0');
  const onClick = (id: string) => {
    console.log(id);
    setChecked(id);
  };

  return (
    // <div className="container mx-auto p-4">
    <div className="w-screen h-screen p-1 relative bg-white">
      <div className="my-2">
        <p>◀ 기록된 데이터 보기</p>
      </div>
      <div className="flex h-10 mb-4 justify-center items-center border-2 border-orgBg1 rounded-2xl">
        <div
          id={'0'}
          className={`w-full h-9 text-center rounded-xl px-4 py-2 cursor-pointer ${checked === '0' ? 'bg-orgBg1 text-orange-600 text font-extrabold' : 'bg-white text-gray-500'}`}
          onClick={({ target }) => onClick(target.id)}
        >
          일별 데이터
        </div>
        <div
          id={'1'}
          className={`w-full h-9 text-center rounded-xl px-4 py-2 cursor-pointer ${checked === '1' ? 'bg-orgBg1 text-orange-600 font-extrabold' : ' bg-white text-gray-500'}`}
          onClick={({ target }) => onClick(target.id)}
        >
          데이터 분석
        </div>
      </div>
      <div>
        {checked === '0' && <DayData />}
        {checked === '1' && <AnalysisData />}
      </div>
    </div>
  );
};
