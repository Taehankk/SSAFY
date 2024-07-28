import { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import useCountStore from '../../../store/useStore';

export const TimeData = () => {
  const index = useCountStore((state) => state.activeIndex);
  const setIndex = useCountStore((state) => state.setActiveIndex);

  const data = useCountStore((state) => state.axiosData[index]);
  const fetchData = useCountStore((state) => state.setAxiosData);

  const [checked, setChecked] = useState(data.detectId);

  const [startTimeValue, setStartTimeValue] = useState(data.startTime);
  const [finishTimeValue, setFinishTimeValue] = useState(data.finishTime);

  const updateCategory = () => {
    fetchData(index, {
      startTime: startTimeValue,
      finishTime: finishTimeValue,
      detectId: checked,
      detect: data.detect,
    });
    setIndex(null);
  };

  const closeModal = () => {
    setIndex(null);
  };

  const onChangeCheck = (index: string) => {
    setChecked(Number(index));
  };

  const changeStartTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    setStartTimeValue(new Date(2024, 7, 27, Number(hours), Number(minutes)));
    console.log(startTimeValue);
  };

  const changeFinishTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    setFinishTimeValue(new Date(2024, 7, 27, Number(hours), Number(minutes)));
    console.log(finishTimeValue);
  };

  return (
    <div className="bg-white p-4 shadow-lg border border-gray-300 z-50">
      <div className="flex justify-between items-center mb-4">
        <span>데이터 수정하기 + {index}</span>
        <span>
          <button className="mr-2 text-blue-500" onClick={updateCategory}>
            수정
          </button>
          <button className="text-red-500" onClick={closeModal}>
            닫기
          </button>
        </span>
      </div>

      {/* 수유 수면 활동 카테고리 선택 창 */}
      <div className="mb-4">
        <p className="font-semibold mb-2">카테고리</p>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              id="0"
              type="checkbox"
              checked={checked === 0}
              onChange={({ target: { id } }) => onChangeCheck(id)}
            />
            <span>수면</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              id="1"
              type="checkbox"
              checked={checked === 1}
              onChange={({ target: { id } }) => onChangeCheck(id)}
            />
            <span>활동</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              id="2"
              type="checkbox"
              checked={checked === 2}
              onChange={({ target: { id } }) => onChangeCheck(id)}
            />
            <span>수유</span>
          </label>
        </div>
      </div>

      {/* 시간 수정 파트 */}
      <div>
        <p className="font-semibold mb-2">시간</p>
        <div className="flex items-center space-x-2">
          <TimePicker
            onChange={(value) => changeStartTime(value)}
            value={startTimeValue}
          />
          <span>~</span>
          <TimePicker
            onChange={(value) => changeFinishTime(value)}
            value={finishTimeValue}
          />
        </div>
      </div>
    </div>
  );
};
