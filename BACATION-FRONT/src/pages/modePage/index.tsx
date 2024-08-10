import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { faAngleLeft, faBell, faStop } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IphoneButton from '../../components/organisms/button/iphoneButton';
import { OpenViduSession } from '../../components/organisms/openViduSession';
import { useUserStore } from '../../store/useUserStore';
import { format } from 'date-fns';
import useViduStore from '../../store/useViduStore';
import html2canvas from 'html2canvas';
import axios from 'axios';

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

  const userName = useUserStore((state) => state.userInfo.nickname);
  const babyName = useUserStore((state) => state.babyInfo.babyName);

  const session = useViduStore((state) => state.session);
  const setSession = useViduStore((state) => state.setSession);
  // 감지 값 detectValue
  const detectValue = useViduStore((state) => state.detectValue);
  // console.log(detectValue);

  const [startMode /*setStartMode*/] = useState(new Date());

  const divRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setModalOpen] = useState(false);

  // 모달을 토글하는 함수
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // 캡쳐 함수
  const captureNow = async () => {
    if (!divRef) return;

    try {
      const video = divRef.current;
      if (video) {
        const canvas = await html2canvas(video, {
          scale: 2,
          allowTaint: true,
          useCORS: true,
        });

        const url = canvas.toDataURL('image/png', 1);
        console.log(url);
      }
    } catch (error) {
      console.log('Error : ' + error);
    }
  };

  useEffect(() => {
    // console.log(detectValue);
  }, [detectValue]);

  const [flipAlert, setFlipAlert] = useState(false);
  const [fallDetectionAlert, setFallDetectionAlert] = useState(false);
  const [cryingAlert, setCryingAlert] = useState(false);

  const handleToggle =
    (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
      setter((prev) => !prev);
    };

  return (
    <div className="w-full mx-auto">
      <div className="flex space-x-5 py-5 mb-3 px-3">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="mt-1"
          onClick={() => {
            if (session) {
              session.disconnect();
            }
            setSession(undefined);
            navigate('/main');
          }}
        />
        <p className="text-lg font-semibold">{modename}</p>
      </div>
      <div className="px-5 space-y-5 place-content-center">
        {/* 영상이 들어가야 하는 부분 */}
        <div className=" w-full h-96 rounded-lg ">
          <OpenViduSession
            mySessionId={babyName}
            myUserName={userName + `${Math.floor(Math.random() * 100)}`}
          />
        </div>
        <div
          className="flex place-content-end space-x-3 text-gray-500"
          onClick={toggleModal}
        >
          <FontAwesomeIcon icon={faBell} className="mt-1" />
          <a className="border-b border-gray-500">켜진 알림 보기</a>
        </div>
        <div className="flex justify-evenly text-center place-items-center font-semibold">
          <div
            onClick={async () => {
              console.log(startMode);
              console.log(new Date());
              await axios
                .post('https://i11b307.p.ssafy.io:8081/api/v1/data', {
                  mode: locationNow.pathname === '/mode/active' ? 0 : 1,
                  startTime: format(startMode!, 'yyyy-MM-dd HH:mm'),
                  endTime: format(new Date(), 'yyyy-MM-dd HH:mm'),
                })
                .catch((error: Error) => {
                  console.log('데이터를 추가하지 못했습니다.');
                  console.log(error);
                });

              if (session) {
                session.disconnect();
              }

              setSession(undefined);
              navigate('/main');
            }}
            className={`rounded-full ${bgcolor} bg-opacity-30 w-24 h-24 flex-col place-items-center place-content-center`}
          >
            <FontAwesomeIcon icon={faStop} className={`${textcolor} text-lg`} />
            <p>활동 종료</p>
          </div>
          <div
            onClick={captureNow}
            className="rounded-full bg-[#28C9C3] bg-opacity-30 w-24 h-24 flex-col place-items-center place-content-center"
          >
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
      {/* 회원 정보 수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-3xl max-w-xs w-full">
            <div className=" p-10">
              <div
                className="flex place-content-center space-x-3 text-xl font-bold mb-10 text-center text-gray-600"
                onClick={toggleModal}
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="mt-1 text-[#FD5900]"
                />
                <a className="">켜진 알림 보기</a>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-lg font-medium">뒤집기 알림</p>
                  <IphoneButton
                    isChecked={flipAlert}
                    onToggle={handleToggle(setFlipAlert)}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-medium">낙상 알림</p>
                  <IphoneButton
                    isChecked={fallDetectionAlert}
                    onToggle={handleToggle(setFallDetectionAlert)}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-medium">울음소리 알림</p>
                  <IphoneButton
                    isChecked={cryingAlert}
                    onToggle={handleToggle(setCryingAlert)}
                  />
                </div>
              </div>
            </div>
            <div
              onClick={toggleModal}
              className="border-t border-gray-300 flex place-content-center py-6"
            >
              <button className="text-[#FD5900] font-semibold">확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
