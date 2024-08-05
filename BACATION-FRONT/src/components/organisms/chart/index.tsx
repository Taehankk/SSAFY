import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryBar,
  VictoryTheme,
  VictoryLegend,
} from 'victory';
import { TimeData } from '../chartModal';
import { addMinutes, differenceInMinutes } from 'date-fns';

import useDataStore from '../../../store/useDataStore';
import { Link } from 'react-router-dom';

export const ChartData = () => {
  const axiosData = useDataStore((state) => state.axiosData);
  const data = axiosData.map((d, i) => ({
    x:
      differenceInMinutes(
        addMinutes(
          d.startTime,
          differenceInMinutes(d.finishTime, d.startTime) / 2,
        ),
        new Date(2024, 7, 27),
      ) / 60,
    y: 24,
    time: differenceInMinutes(d.finishTime, d.startTime) / 60,
    detectId: d.detectId,
  }));

  // const activeIndex = useDataStore((state) => state.activeIndex);
  const setActiveIndex = useDataStore((state) => state.setActiveIndex);

  const openModal = useDataStore((state) => state.openModal);
  const setOpenModal = useDataStore((state) => state.setOpenModal);

  return (
    <div className="w-full flex items-center justify-center bg-white-100">
      <div className="bg-white p-6">
        <div className="float-right">
          <Link
            className="text-black text-sm"
            to={`/data/${new Date().getHours()}`}
          >
            기록 자세히 보기▶
          </Link>
        </div>
        <div className="">
          <VictoryChart
            polar
            theme={VictoryTheme.material}
            domain={{ x: [0, 24], y: [0, 24] }}
            startAngle={90}
            endAngle={-270}
          >
            <VictoryLegend
              x={-10}
              y={280}
              style={{ border: { stroke: 'none' } }}
              data={[
                { name: '수면', symbol: { fill: '#3864A7', type: 'square' } },
                { name: '활동', symbol: { fill: '#FDDC3F', type: 'square' } },
                { name: '수유', symbol: { fill: '#F2B6C6', type: 'square' } },
              ]}
            />
            <VictoryPolarAxis
              tickValues={[0, 3, 6, 9, 12, 15, 18, 21]}
              labelPlacement="vertical"
              style={{
                tickLabels: {
                  padding: ({ text }) => (text <= 12 ? 15 : 20),
                  textAnchor: 'middle', // 수평 위치를 중앙으로 설정
                  verticalAnchor: 'middle', // 수직 위치를 중앙으로 설정
                },
                grid: { stroke: 'none' },
              }}
            />
            <VictoryBar
              data={data}
              style={{
                data: {
                  fill: ({ datum }) =>
                    datum.detectId === 0
                      ? '#3864A7'
                      : datum.detectId === 1
                        ? '#FDDC3F'
                        : '#F2B6C6',
                  width: ({ datum }) => (datum.time / 24) * 400,
                },
              }}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onClick: (event, props) => {
                      //   if (activeIndex === props.index) {
                      //     setActiveIndex(null);
                      //   } else {
                      setActiveIndex(props.index);
                      setOpenModal();
                      // }
                      return [];
                    },
                  },
                },
              ]}
            />
          </VictoryChart>
        </div>
      </div>
      {openModal && (
        <div className="absolute flex items-center justify-center">
          <TimeData />
        </div>
      )}
    </div>
  );
};
