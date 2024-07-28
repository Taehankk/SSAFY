import { useState } from 'react';
import { DayData } from '../DayData';
import { TotalData } from '../TotalData';

export const DataPage = () => {
  const [checked, setChecked] = useState('0');
  const onClick = (id: string) => {
    console.log(id);
    setChecked(id);
  };

  return (
    <div className="flex">
      <div
        id={'0'}
        className="rounded-l-full bg-white text-gray-500 px-4 py-2 cursor-pointer"
        onClick={({ target }) => onClick(target.id)}
      >
        일별 데이터
      </div>
      <div
        id={'1'}
        className="bg-white text-gray-500 px-4 py-2 cursor-pointer"
        onClick={({ target }) => onClick(target.id)}
      >
        데이터 분석
      </div>
      <div>
        {checked === '0' && <DayData />}
        {checked === '1' && <TotalData />}
      </div>
    </div>
  );
};
