import { add, format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import useDataStore from '../../../store/useDataStore';

const Day = () => {
  const selectDate = useDataStore((state) => state.selectDate);
  const setSelectDate = useDataStore((state) => state.setSelectDate);

  const scrollPosition = useDataStore((state) => state.scrollY);
  const setScrollPosition = useDataStore((state) => state.setScrollY);

  const currentDay = new Date();
  const [dateArr, setDateArr] = useState([
    currentDay,
    add(currentDay, { days: -1 }),
    add(currentDay, { days: -2 }),
    add(currentDay, { days: -3 }),
    add(currentDay, { days: -4 }),
    add(currentDay, { days: -5 }),
    add(currentDay, { days: -6 }),
  ]);

  const tempArr = useDataStore((state) => state.tempArr);
  const setTempArr = useDataStore((state) => state.setTempArr);

  if (tempArr.length > dateArr.length) {
    setDateArr(tempArr);
    setDateArr((prevDateArr) => [
      ...prevDateArr,
      add(tempArr[tempArr.length - 1], { days: -1 }),
      add(tempArr[tempArr.length - 1], { days: -2 }),
    ]);
  }
  const scrollAreaRef = useRef(null);
  const sentinelRef = useRef(null);

  // 날짜를 추가하는 함수
  const dateFetch = () => {
    const newDate = add(dateArr[dateArr.length - 1], { days: -1 });
    setDateArr((prevDateArr) => [...prevDateArr, newDate]);
  };

  // 날짜 선택 시 발동 함수
  const clickDate = (event, idx: number) => {
    setSelectDate(idx);
    const position = scrollAreaRef.current.scrollLeft;
    setTempArr(dateArr.slice(0, idx + 1));
    setScrollPosition(position);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dateFetch();
        }
      },
      {
        root: scrollAreaRef.current, // 스크롤 감지할 요소
        rootMargin: '0px',
        threshold: 1.0, // 요소의 100%가 보일 때 트리거
      },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [dateArr]);

  useEffect(() => {
    if (scrollPosition !== 0 && scrollAreaRef.current) {
      scrollAreaRef.current.scrollLeft = scrollPosition;
    }
    console.log(scrollPosition);
  }, [scrollPosition]);

  return (
    // <div className="flex justify-center items-center h-36 mx-40">
    <div className="flex justify-center items-center">
      <div
        // className="w-full h-full sm:w-auto flex justify-center items-center"
        className="flex justify-center items-center w-2/3"
        // className="flex overflow-x-auto h-full flex justify-center items-center"
      >
        <div
          ref={scrollAreaRef}
          className="flex flex-row-reverse items-center"
          // className="flex flex-row-reverse items-center p-4 space-x-4 space-x-reverse"
          style={{
            maxHeight: '80%',
            padding: '0 1rem',
            maxWidth: '1200px',
            overflow: 'scroll',
            scrollbarWidth: 'none',
          }}
        >
          {dateArr.map((date, idx) => (
            <div
              key={idx}
              className={`date-item text-center h-20 flex-col content-center p-2 rounded-lg shadow mx-1 ${idx === selectDate ? 'bg-orgBg2 text-white font-bold' : ' bg-white'}`}
              onClick={(event) => clickDate(event, idx)}
            >
              <span className="block text-base sm:text-lg lg:text-xl">
                {format(date, 'M')}
              </span>
              <span className="block text-base sm:text-lg lg:text-xl">
                {format(date, 'dd')}
              </span>
              <span className="block w-14 text-base sm:text-lg lg:text-xl">
                {format(date, 'E')}
              </span>
            </div>
          ))}
          <div ref={sentinelRef} className="h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Day;
