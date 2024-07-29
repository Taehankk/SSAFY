// import { add, format } from 'date-fns';
// import { useEffect, useRef, useState } from 'react';
// import { useInView } from 'react-intersection-observer';

// const Day = () => {
//   const currentDay = new Date();
//   const [dateArr, setDateArr] = useState([currentDay]);

//   const scrollAreaRef = useRef(null);
//   const { ref: inViewRef, inView } = useInView({
//     root: scrollAreaRef.current,
//     rootMargin: '0px',
//     threshold: 1.0,
//   });

//   const dateFetch = () => {
//     const newDate = add(dateArr[dateArr.length - 1], { days: -1 });
//     setDateArr((prevDateArr) => [...prevDateArr, newDate]);
//     console.log(newDate);
//   };

//   useEffect(() => {
//     console.log(inView, 'hi');
//     if (inView) {
//       console.log(inView, '스크롤!');
//       dateFetch();
//     }
//   }, [inView]);

//   return (
//     <div
//       ref={scrollAreaRef}
//       className="flex justify-center items-center h-screen bg-gray-200"
//     >
//       <div
//         className="overflow-auto flex flex-row-reverse items-center"
//         style={{ maxWidth: '90%', maxHeight: '80%', padding: '0 1rem' }}
//       >
//         {dateArr.map((date: Date, idx: number) => (
//           <div
//             key={idx}
//             className="text-center bg-white p-2 rounded shadow mx-1"
//           >
//             <span className="block">{format(date, 'E')}</span>
//             <span className="block">{format(date, 'M')}</span>
//             <span className="block">{format(date, 'dd')}</span>
//           </div>
//         ))}
//       </div>
//       <div ref={inViewRef} className="h-1 w-full"></div>
//     </div>
//   );
// };

// export default Day;

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
    <div className="flex justify-center">
      <div
        ref={scrollAreaRef}
        className="w-full sm:w-auto flex justify-center items-center overflow-x-auto"
      >
        <div className="flex flex-row-reverse items-center max-h-80% p-4 max-w-screen-lg">
          <div className="text-center bg-white p-2 rounded shadow mx-1 w-16 h-24 sm:w-20 sm:h-28 lg:w-24 lg:h-32">
            <span className="block"> </span>
            <span className="block"> </span>
            <span className="block"> </span>
          </div>
          <div className="text-center bg-white p-2 rounded shadow mx-1 w-16 h-24 sm:w-20 sm:h-28 lg:w-24 lg:h-32">
            <span className="block"></span>
            <span className="block"></span>
            <span className="block"></span>
          </div>
          <div className="text-center bg-white p-2 rounded shadow mx-1 w-16 h-24 sm:w-20 sm:h-28 lg:w-24 lg:h-32">
            <span className="block"></span>
            <span className="block"></span>
            <span className="block"></span>
          </div>
          <div className="text-center bg-white p-2 rounded shadow mx-1 w-16 h-24 sm:w-20 sm:h-28 lg:w-24 lg:h-32">
            <span className="block"></span>
            <span className="block"></span>
            <span className="block"></span>
          </div>
          <div className="text-center bg-white p-2 rounded shadow mx-1 w-16 h-24 sm:w-20 sm:h-28 lg:w-24 lg:h-32">
            <span className="block"></span>
            <span className="block"></span>
            <span className="block"></span>
          </div>
          <div className="text-center bg-white p-2 rounded shadow mx-1 w-16 h-24 sm:w-20 sm:h-28 lg:w-24 lg:h-32">
            <span className="block"></span>
            <span className="block"></span>
            <span className="block"></span>
          </div>
          <div className="text-center bg-white p-2 rounded shadow mx-1 w-16 h-24 sm:w-20 sm:h-28 lg:w-24 lg:h-32">
            <span className="block"></span>
            <span className="block"></span>
            <span className="block"></span>
          </div>
          {dateArr.map((date, idx) => (
            <div
              key={idx}
              className="text-center bg-white p-2 rounded shadow mx-1 w-16 h-24 sm:w-20 sm:h-28 lg:w-24 lg:h-32"
              onClick={() => selectDate(date)}
            >
              <span className="block">{format(date, 'E')}</span>
              <span className="block">{format(date, 'M')}</span>
              <span className="block">{format(date, 'dd')}</span>
            </div>
          ))}
          <div ref={sentinelRef} className="h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Day;
