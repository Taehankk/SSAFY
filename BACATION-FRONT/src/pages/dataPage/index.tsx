import { useState } from 'react';
import { DayData } from '../../components/templates/dayData';
import { DataDetail } from '../../components/templates/dataDetail';

export const DataPage = () => {
  const [checked, setChecked] = useState('0');
  const onClick = (id: string) => {
    console.log(id);
    setChecked(id);
  };

  return (
    // <div className="container mx-auto p-4">
    <div className="w-screen h-screen relative bg-white">
      <div className="flex mb-4 justify-center items-center">
        <div
          id={'0'}
          className={`rounded-t-md md:rounded-l-md md:rounded-r-none px-4 py-2 cursor-pointer ${checked === '0' ? 'bg-orange-100 text-orange-500' : 'bg-white text-gray-500'}`}
          onClick={({ target }) => onClick(target.id)}
        >
          일별 데이터
        </div>
        <div
          id={'1'}
          className={`rounded-b-md md:rounded-r-md md:rounded-l-none px-4 py-2 cursor-pointer ${checked === '1' ? 'bg-orange-100 text-orange-500' : ' bg-white text-gray-500'}`}
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
