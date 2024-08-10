import { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { DiaryView } from '../diaryView';

const StyledCalendar = styled(Calendar)`
  .react-calendar {
    border: none;
    width: 100%;
  }

  .react-calendar__tile {
    border: none;
  }

  /* 날짜의 글자 스타일 */
  .react-calendar__month-view__days__day-names,
  .react-calendar__month-view__days__day {
    font-family: 'Pretendard';
    font-size: 15px;
    padding: 15px;
  }

  /* 선택된 날짜 스타일 */
  .react-calendar__tile--active:hover {
  }

  /* 날짜에 대한 호버 스타일 */
  .react-calendar__tile:hover {
    background: white;
  }

  /* 요일 스타일 */
  .react-calendar__month-view__weekdays__weekday abbr {
    font-family: 'Pretendard';
    margin: 1px;
    text-decoration: none;
    font-size: 15px;
  }
  .react-calendar__month-view__weekdays__weekday {
  }

  /* 년월 스타일 */
  .react-calendar__navigation {
  }

  /* 년월 레이블 스타일 */
  .react-calendar__navigation__label {
  }

  /* 네비게이션 버튼 스타일 */
  .react-calendar__navigation__arrow.react-calendar__navigation__prev-button,
  .react-calendar__navigation__arrow.react-calendar__navigation__prev2-button,
  .react-calendar__navigation__arrow.react-calendar__navigation__next-button,
  .react-calendar__navigation__arrow.react-calendar__navigation__next2-button {
  }

  /* 날짜 간 간격 */
  .react-calendar__month-view__days {
  }

  /* 달력 타일 */
  .react-calendar__tile {
  }

  /* 선택된 날짜 타일 */
  .react-calendar__tile--active:active,
  .react-calendar__tile:focus,
  .react-calendar__tile--active {
    background: #fd5900;
    border-radius: 100px;
    color: white;
  }

  /* 호버 및 액티브 스타일 */
  .react-calendar__tile:hover {
  }

  /* 오늘 날짜에 대한 호버 및 액티브 스타일 */
  .react-calendar__tile--now:active,
  .react-calendar__tile--now:hover {
  }

  /* 오늘 날짜 스타일 */
  .react-calendar__tile--now {
    background: none;
    color: black;
  }

  /* 토요일 날짜 스타일 */
  .react-calendar__tile.saturday {
    color: #3864a7;
  }

  /* 일요일 날짜 스타일 */
  .react-calendar__tile.sunday {
  }

  .react-calendar__month-view__days__day--weekend {
    color: black;
  }
`;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DiaryCalendar = () => {
  const [value, onChange] = useState<ValuePiece>(new Date());
  const handleDateChange = (selectedDate: Value) => {
    if (Array.isArray(selectedDate)) {
      onChange(selectedDate[0]);
    } else {
      onChange(selectedDate);
    }
  };

  return (
    <div>
      <div className="grid place-items-center mx-auto">
        <StyledCalendar
          onChange={handleDateChange}
          value={value}
          formatDay={(_locale, date) => moment(date).format('DD')}
        />
      </div>
      {value !== null ? (
        <DiaryView date={moment(value).format('YYYY-MM-DD')} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default DiaryCalendar;
