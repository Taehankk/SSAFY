import { useEffect, useState } from 'react';
import axios from 'axios';
import useDataStore from '../../../store/useDataStore';
import { format } from 'date-fns';

interface Props {
  mode: string;
  date: Date;
}

export const AnalysisData = ({ mode }: Props) => {
  // 선택된 날짜의 인덱스
  const selectDate = useDataStore((state) => state.selectDate);
  // 임시 저장된 날짜 배열
  const tempArr = useDataStore((state) => state.tempArr);
  // 현재 선택된 날짜 포맷
  const selected = format(tempArr[selectDate], 'yyyy-MM-dd');

  // axios 로 받은 Data type 설정
  type Data = {
    manyDetects: [];
    detectCount: number;
  };

  const [data, setData] = useState<Data>();

  const axiosData = () => {
    axios
      .get(`https://i11b307.p.ssafy.io:8081/api/v1/data/${mode}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        params: { dateTime: selected },
      })
      .then((response) => {
        setData(response.data);
      });
  };

  useEffect(() => {
    axiosData();
  }, []);

  return (
    <div className="w-full flex-col justify-center content-center ">
      <div className="">
        {/* 라벨 */}
        <p className="text-xl">
          <span
            className={`font-semibold ${mode === '수면' ? 'text-blue-600' : 'text-yellow-600'}`}
          >
            {mode}
          </span>
          <span> 중 데이터</span>
        </p>

        {/* 데이터 출력 부분 */}
        <div
          className={`mb-4 border-l-4 bg-[#F6F8FA] p-4 ${mode === '수면' ? 'border-blue-600' : 'border-yellow-600'}`}
        >
          <span className="block text-gray-700">
            평균 알림 횟수 약{' '}
            <span className="text-orange-600">{data?.detectCount}회</span>
          </span>
          <span className="block text-gray-700">
            가장 많이 감지된 움직임은{' '}
            {data?.manyDetects.map((d, i) => (
              <span key={i}>
                <span className="text-orange-600">{d}</span>
                {i !== data.manyDetects.length - 1 && <span>, </span>}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};
