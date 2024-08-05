import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { faAngleLeft, faBell, faStop } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

export const ModePage = () => {
  const locationNow = useLocation();
  const navigate = useNavigate();
  const bgcolor =
    locationNow.pathname === '/mode/active' ? 'bg-[#FDDC3F]' : 'bg-[#3864A7]';
  const textcolor =
    locationNow.pathname === '/mode/active'
      ? 'text-[#FDDC3F]'
      : 'text-[#3864A7]';
  const bordercolor =
    locationNow.pathname === '/mode/active'
      ? 'border-[#FDDC3F]'
      : 'border-[#3864A7]';
  const modename =
    locationNow.pathname === '/mode/active' ? '활동 모드' : '수면 모드';

  return (
    <div className="w-full mx-auto">
      <div className="flex space-x-5 py-5 mb-3 px-3">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="mt-1"
          onClick={() => navigate(-1)}
        />
        <p className="text-lg font-semibold">{modename}</p>
      </div>
      <div className="px-5 space-y-5 place-content-center">
        {/* 영상이 들어가야 하는 부분 */}
        <div className=" w-full h-64 rounded-lg bg-gray-500"></div>
        <div className="flex place-content-end space-x-3 text-gray-500">
          <FontAwesomeIcon icon={faBell} className="mt-1" />
          <p className="border-b border-gray-500">켜진 알림 보기</p>
        </div>
        <div className="flex justify-evenly text-center place-items-center font-semibold">
          <div
            className={`rounded-full ${bgcolor} bg-opacity-30 w-24 h-24 flex-col place-items-center place-content-center`}
          >
            <FontAwesomeIcon icon={faStop} className={`${textcolor} text-lg`} />
            <p>활동 종료</p>
          </div>
          <div className="rounded-full bg-[#28C9C3] bg-opacity-30 w-24 h-24 flex-col place-items-center place-content-center">
            <FontAwesomeIcon
              icon={faImage}
              className={`text-[#28C9C3] text-lg`}
            />
            <p>화면 캡쳐</p>
          </div>
        </div>
        <div className="space-y-5">
          <p className="font-semibold text-lg">지금까지 감지된 기록</p>
          <div className={`border-l-2 ${bordercolor}`}>
            <div className="flex space-x-5 px-10 py-3 place-items-center">
              <p className="text-sm">12:00</p>
              <p className="font-medium">뒤집기 감지</p>
            </div>
            <div className="flex space-x-5 px-10 py-3 place-items-center">
              <p className="text-sm">12:00</p>
              <p className="font-medium">뒤집기 감지</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
