import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DiaryCalendar from '../../components/organisms/diaryCalendar';

export const DiaryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto">
      <div className="flex space-x-5 py-5 mb-3 px-3">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="mt-1"
          onClick={() => navigate(-1)}
        />
        <p className="text-lg font-semibold">작성한 일기 보기</p>
      </div>
      <DiaryCalendar />
    </div>
  );
};
