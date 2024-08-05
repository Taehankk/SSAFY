import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faBook, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

export const DiaryView = (props: { date: Date }) => {
  const navigate = useNavigate();
  const date = props.date;
  const content =
    '아기가 오늘은 밥도 잘 먹고 잠도 잘 잤다\n근데 낮잠을 많이 자서 그런지 \n밤에 잘 안자려고 해서 힘들었다';

  return (
    <div className="mt-3 bg-[#F6F8FA] p-7">
      <div className="mb-3 flex space-x-5">
        <FontAwesomeIcon
          icon={faBook}
          className="mt-1 text-lg text-[#FAA87D]"
        />
        <p className="text-lg font-semibold">
          {moment(date).format('YYYY-MM-DD')} 의 일기
        </p>
      </div>
      <div className="bg-white rounded-lg p-3">
        <div className="w-full h-44 rounded-lg bg-gray-500"></div>
        <div style={{ whiteSpace: 'pre-wrap' }} className="my-7">
          {content}
        </div>
        <div className="mt-3 border-t border-gray-400 py-5 px-3">
          <div className="flex space-x-2">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-lg text-[#FAA87D]"
            />
            <p className="font-medium">
              아이가 태어난 지 <span className="text-[#FD5900]">82일</span>,{' '}
              <span className="text-[#FD5900]">3번째</span> 기록
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
