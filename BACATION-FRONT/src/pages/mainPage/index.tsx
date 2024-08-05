import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import main from '../../assets/main/main.png';
import play from '../../assets/main/play.png';
import sleep from '../../assets/main/sleep.png';
import moment from 'moment';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MainPage = () => {
  const navigate = useNavigate();
  const [today, setToday] = useState(new Date());

  return (
    <div className="m-5">
      <div className="my-5">
        <img src={logo} alt="" className="w-44" />
      </div>
      <div className="flex justify-between place-items-baseline">
        <img
          src="https://i1.sndcdn.com/artworks-nS5zU2ZseiW3oRgT-PjrnSw-t500x500.jpg"
          alt="Profile-image"
          className="w-16 rounded-full mr-4"
        />
        <img src={main} alt="" className="w-56" />
      </div>
      <div className="mt-5 text-2xl font-semibold space-y-1">
        <p>
          <span className="text-[#FD5900]">정채린</span>님,
        </p>
        <p>아이는 베케이션에 맡겨주세요!</p>
      </div>
      <div className="flex justify-between mt-8">
        <Link to={'/mode/active'}>
          <div className="bg-[#FCA800] rounded-lg shadow-xl px-4 py-3">
            <p className="text-white text-xl font-medium">활동 모드</p>
            <div className="flex space-x-2">
              <p className="text-white text-xl font-medium">켜기</p>
              <img src={play} alt="" className="w-24 mt-4" />
            </div>
          </div>
        </Link>
        <Link to={'/mode/sleep'}>
          <div className="bg-[#3864A7] rounded-lg shadow-xl px-4 py-3">
            <p className="text-white text-xl font-medium">수면 모드</p>
            <div className="flex space-x-2">
              <p className="text-white text-xl font-medium">켜기</p>
              <img src={sleep} alt="" className="w-24 mt-4" />
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-10 font-semibold text-xl space-y-5">
        <p>
          <span className="text-[#FD5900]">아기</span>와의 추억 기록하기
        </p>
        <div className=" flex w-full h-52 rounded-lg bg-gray-500 place-items-end">
          <div
            onClick={() => navigate('/diary/write')}
            className="hover:text-[#FD5900] flex w-full justify-between place-items-center text-white p-5"
          >
            <div className="text-lg font-medium">
              <p>{moment(today).format('YYYY-MM-DD')}</p>
              <p>오늘 촬영한 사진으로 일기 작성하기</p>
            </div>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
      </div>
    </div>
  );
};
