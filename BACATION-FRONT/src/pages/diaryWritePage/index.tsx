import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { faAngleLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

export const DiaryWrite = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto">
      <div className="flex space-x-5 py-5 mb-3 px-3">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="mt-1"
          onClick={() => navigate(-1)}
        />
        <p className="text-lg font-semibold">오늘의 일기 작성하기</p>
      </div>
      <div className="px-5 space-y-5 place-content-center">
        <p className="font-semibold text-xl">{moment().format('YYYY-MM-DD')}</p>
        <div className=" w-full h-52 rounded-lg bg-gray-500"></div>
        <div className=" flex space-x-3 w-full rounded-lg bg-gray-100 px-5 py-4">
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="mt-1 text-[#FD5900]"
          />
          <p className="font-medium">작성 후 저장 버튼을 꼭 눌러 주세요</p>
        </div>
        <textarea
          name=""
          id=""
          className="w-full h-72 border border-[#FD5900] rounded-lg p-5 resize-none"
        ></textarea>
        <div className="flex w-full place-content-center">
          <button className="button bg-orange-500 text-white py-3 px-4 rounded-md">
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};
