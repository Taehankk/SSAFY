import { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import useDataStore from '../../../store/useDataStore';

export const TimeData = () => {
  const index = useDataStore((state) => state.activeIndex);
  const setIndex = useDataStore((state) => state.setActiveIndex);

  // const axiosData = useDataStore((state) => state.axiosData);
  const fetchData = useDataStore((state) => state.setAxiosData);
  const addData = useDataStore((state) => state.addData);

  const data = useDataStore((state) =>
    index !== null ? state.axiosData[index] : state.data,
  );
  // const setData = useDataStore((state) => state.setData);

  const setOpenModal = useDataStore((state) => state.setOpenModal);

  const [checked, setChecked] = useState(data.detectId);

  const [startTimeValue, setStartTimeValue] = useState(data.startTime);
  const [finishTimeValue, setFinishTimeValue] = useState(data.finishTime);

  const updateCategory = () => {
    if (startTimeValue >= finishTimeValue) {
      alert('시간을 알맞게 입력하세요');
    } else {
      if (index !== null) {
        fetchData(index, {
          startTime: startTimeValue,
          finishTime: finishTimeValue,
          detectId: checked,
          detect: data.detect,
        });
      } else {
        addData({
          startTime: startTimeValue,
          finishTime: finishTimeValue,
          detectId: checked,
          detect: checked === 0 ? '수면' : checked === 1 ? '활동' : '수유',
        });
      }
      setIndex(null);
      setOpenModal();
    }
  };

  const closeModal = () => {
    setIndex(null);
    setOpenModal();
  };

  const onChangeCheck = (index: string) => {
    setChecked(Number(index));
  };

  const changeStartTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    setStartTimeValue(new Date(2024, 7, 27, Number(hours), Number(minutes)));
  };

  const changeFinishTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    setFinishTimeValue(new Date(2024, 7, 27, Number(hours), Number(minutes)));
  };

  return (
    <div className="bg-white p-6 shadow-lg border border-gray-300 rounded-xl">
      <div className="flex justify-center mb-4">
        <span className="font-bold text-lg">데이터 수정하기</span>
      </div>

      {/* 수유 수면 활동 카테고리 선택 창 */}
      <div className="mb-6">
        <p className="font-semibold text-gray-700 mb-3">카테고리</p>
        <div className="flex justify-center space-x-8">
          <label className="flex items-center space-x-2">
            <input
              id="0"
              type="checkbox"
              checked={checked === 0}
              onChange={({ target: { id } }) => onChangeCheck(id)}
              className="form-checkbox h-5 w-5 text-orange-600"
            />
            <span className="text-gray-700">수면</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              id="1"
              type="checkbox"
              checked={checked === 1}
              onChange={({ target: { id } }) => onChangeCheck(id)}
              className="form-checkbox h-5 w-5 text-orange-600"
            />
            <span className="text-gray-700">활동</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              id="2"
              type="checkbox"
              checked={checked === 2}
              onChange={({ target: { id } }) => onChangeCheck(id)}
              className="form-checkbox h-5 w-5 text-orange-600"
            />
            <span className="text-gray-700">수유</span>
          </label>
        </div>
      </div>

      {/* 시간 수정 파트 */}
      <div className="mb-6">
        <p className="font-semibold text-gray-700 mb-3">시간</p>
        <div className="flex justify-center items-center space-x-2">
          <TimePicker
            className="bg-gray-200 border border-gray-300 rounded-md p-2"
            onChange={(value) => {
              changeStartTime(value);
            }}
            format="a hh:mm"
            value={startTimeValue}
            required={true}
            clockIcon={false}
            disableClock={true}
            clearIcon={null}
          />
          <p className="text-gray-700">~</p>
          <TimePicker
            className="bg-gray-200 border border-gray-300 rounded-md p-2"
            onChange={(value) => {
              changeFinishTime(value);
            }}
            format="a hh:mm"
            value={finishTimeValue}
            required={true}
            clockIcon={false}
            disableClock={true}
            clearIcon={null}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        <button
          className="px-6 py-2 bg-[#FD5900] text-white rounded-xl"
          onClick={updateCategory}
        >
          {index !== null ? '수정' : '추가'}
        </button>
        <button
          className="px-6 py-2 bg-gray-200 text-[#FD5900] rounded-xl"
          onClick={closeModal}
        >
          닫기
        </button>
      </div>
    </div>
  );
};
