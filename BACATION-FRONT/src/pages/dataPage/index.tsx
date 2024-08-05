import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../../store/useDataStore';
import { DayData } from '../../components/templates/dayData';
import { AnalysisData } from '../../components/organisms/analysisData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faUserClock,
  faClock,
  faPlus,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

export const DataPage = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState('0');

  const setIndex = useDataStore((state) => state.setActiveIndex);

  const setOpenModal = useDataStore((state) => state.setOpenModal);

  const onClick = (id: string) => {
    setChecked(id);
  };

  const addTime = () => {
    setIndex(null);
    setOpenModal();
  };

  return (
    <div className="relative w-full overflow-auto max-w-[400px] mx-auto">
      <div className="w-full">
        <div className="flex space-x-5 py-5 mb-3 px-3">
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="mt-1"
            onClick={() => navigate(-1)}
          />
          <p className="text-lg font-semibold">기록된 데이터 보기</p>
        </div>
        <div className="flex h-10 mb-4 justify-center items-center border-2 border-orgBg1 rounded-2xl">
          {/* <div> */}
          <div
            id={'0'}
            className={`w-full h-10 text-center rounded-xl px-4 py-2 cursor-pointer ${checked === '0' ? 'bg-orgBg1 text-orange-600 text font-extrabold' : 'text-gray-500'}`}
            onClick={({ target }) => onClick(target.id)}
          >
            일별 데이터
          </div>
          <div
            id={'1'}
            className={`w-full h-10 text-center rounded-xl px-4 py-2 cursor-pointer ${checked === '1' ? 'bg-orgBg1 text-orange-600 font-extrabold' : 'text-gray-500'}`}
            onClick={({ target }) => onClick(target.id)}
          >
            데이터 분석
          </div>
        </div>
      </div>
      <div>
        {checked === '0' && <DayData />}
        {checked === '1' && <AnalysisData />}
      </div>
      <div className="fixed flex bottom-20 right-[calc((100vw-400px)/2)]">
        {checked === '0' && (
          <div
            className="w-20 h-20 flex justify-center items-center text-2xl rounded-full bg-[#FD5900]"
            onClick={addTime}
          >
            {/* <FontAwesomeIcon icon={faUserClock} className="ml-2 text-white" /> */}
            <FontAwesomeIcon icon={faClock} className="text-3xl" />
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="absolute top-5 right-5 text-white text-base"
            />
          </div>
        )}
      </div>
    </div>
  );
};
