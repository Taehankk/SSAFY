import { faBook, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

interface DiaryInfo {
  recordId: number;
  memberId: number;
  content: string;
  recordCount: number;
  recordTime: string;
  captures: ImageInfo[];
}

interface ImageInfo {
  captureId: number;
  recordId: number;
  memberId: number;
  captureUrl: string;
  captureTime: string;
}

export const DiaryView = (props: { date: string }) => {
  const date = props.date;
  // const content =
  //   '아기가 오늘은 밥도 잘 먹고 잠도 잘 잤다\n근데 낮잠을 많이 자서 그런지 \n밤에 잘 안자려고 해서 힘들었다';
  const [diary, setDiary] = useState<DiaryInfo | null>(null);

  const getInfo = async () => {
    try {
      const response: AxiosResponse<DiaryInfo> = await axios.get(
        'https://i11b307.p.ssafy.io:8081/api/v1/record',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
          params: { dateTime: date },
        },
      );

      if (response && response.data) {
        const data: DiaryInfo = response.data;
        setDiary(data);
      }
    } catch (error) {
      console.log('데이터를 받아오지 못했습니다.');
      console.error(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, [date]); // date가 변경될 때마다 getInfo를 호출합니다.

  return (
    <div className="mt-3 bg-[#F6F8FA] p-7">
      <div className="mb-3 flex space-x-5">
        <FontAwesomeIcon
          icon={faBook}
          className="mt-1 text-lg text-[#FAA87D]"
        />
        <p className="text-lg font-semibold">{date} 의 일기</p>
      </div>
      <div className="bg-white rounded-lg p-3">
        <div className="w-full h-44 rounded-lg bg-gray-500">
          {/* 이미지 렌더링 추가 */}
          {diary?.captures.map((capture) => (
            <img
              key={capture.captureId}
              src={capture.captureUrl}
              alt={`Capture at ${capture.captureTime}`}
              className="rounded-lg w-full h-full object-cover"
            />
          ))}
        </div>
        <div style={{ whiteSpace: 'pre-wrap' }} className="my-7">
          {diary?.content}
        </div>
        <div className="mt-3 border-t border-gray-400 py-5 px-3">
          <div className="flex space-x-2">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-lg text-[#FAA87D]"
            />
            <p className="font-medium">
              아이가 태어난 지 <span className="text-[#FD5900]">82일</span>,{' '}
              <span className="text-[#FD5900]">{diary?.recordCount}번째</span>{' '}
              기록
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
