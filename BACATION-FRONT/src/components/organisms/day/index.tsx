import { add, format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

const Day = () => {
  const currentDay = new Date();
  const [dateArr, setDateArr] = useState([currentDay]);

  const scrollAreaRef = useRef(null);
  const sentinelRef = useRef(null);

  // 날짜를 추가하는 함수
  const dateFetch = () => {
    const newDate = add(dateArr[dateArr.length - 1], { days: -1 });
    setDateArr((prevDateArr) => [...prevDateArr, newDate]);
    console.log(newDate);
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

  const selectDate = (target: Date) => {
    console.log(target);
  };

  return (
    // <div className="flex justify-center items-center h-36 mx-40">
    <div className="flex justify-center items-center">
      <div
        ref={scrollAreaRef}
        // className="w-full h-full sm:w-auto flex justify-center items-center"
        className="flex justify-center items-center w-2/3"
        // className="flex overflow-x-auto h-full flex justify-center items-center"
      >
        <div
          className="flex flex-row-reverse items-center overflow-auto"
          // className="flex flex-row-reverse items-center p-4 space-x-4 space-x-reverse"
          style={{
            maxHeight: '80%',
            padding: '0 1rem',
            maxWidth: '1200px',
          }}
        >
          {dateArr.map((date, idx) => (
            <div
              key={idx}
              className="text-center bg-white p-2 rounded shadow mx-1"
              onClick={() => selectDate(date)}
            >
              <span className="block text-base sm:text-lg lg:text-xl">
                {format(date, 'E')}
              </span>
              <span className="block text-base sm:text-lg lg:text-xl">
                {format(date, 'M')}
              </span>
              <span className="block text-base sm:text-lg lg:text-xl">
                {format(date, 'dd')}
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
