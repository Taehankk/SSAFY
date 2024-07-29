import { useState } from 'react';
import { DayData } from '../DayData';
import { DataDetail } from '../../organisms/DataDetail';

export const DataPage = () => {
  const [checked, setChecked] = useState('0');
  const onClick = (id: string) => {
    console.log(id);
    setChecked(id);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row mb-4">
        <div
          id={'0'}
          className={`rounded-t-md md:rounded-l-md md:rounded-r-none bg-white text-gray-500 px-4 py-2 cursor-pointer ${checked === '0' ? 'bg-orange-100 text-orange-500' : ''}`}
          onClick={({ target }) => onClick(target.id)}
        >
          일별 데이터
        </div>
        <div
          id={'1'}
          className={`rounded-b-md md:rounded-r-md md:rounded-l-none bg-white text-gray-500 px-4 py-2 cursor-pointer ${checked === '1' ? 'bg-orange-100 text-orange-500' : ''}`}
          onClick={({ target }) => onClick(target.id)}
        >
          데이터 분석
        </div>
      </div>
      <div>
        {checked === '0' && <DayData />}
        {checked === '1' && <DataDetail />}
      </div>
    </div>
  );
};
