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

  const activeIndex = useDataStore((state) => state.activeIndex);
  const setActiveIndex = useDataStore((state) => state.setActiveIndex);
  return (
    // <div className="flex flex-col items-center justify-center p-4 bg-white-100 relative">
    <div className="flex items-center justify-center bg-white-100 relative">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <VictoryChart
          polar
          theme={VictoryTheme.material}
          domain={{ x: [0, 24], y: [0, 24] }}
          startAngle={90}
          endAngle={-270}
        >
          <VictoryLegend
            style={{ border: { stroke: 'black' } }}
            data={[
              { name: '수면', symbol: { fill: '#3864A7' } },
              { name: '활동', symbol: { fill: '#FDDC3F' } },
              { name: '수유', symbol: { fill: '#F2B6C6' } },
            ]}
          />
          <VictoryPolarAxis
            tickValues={[0, 3, 6, 9, 12, 15, 18, 21]}
            labelPlacement="vertical"
            style={{
              tickLabels: { padding: 20 },
            }}
          />
          {data.map((d, i) => (
            <VictoryPolarAxis
              dependentAxis
              key={i}
              style={{
                tickLabels: { fill: 'none' },
              }}
            />
          ))}
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
                    console.log(props);
                    if (activeIndex === props.index) {
                      setActiveIndex(null);
                    } else {
                      setActiveIndex(props.index);
                    }
                    return [];
                  },
                },
              },
            ]}
          />
        </VictoryChart>
      </div>
      {activeIndex !== null && (
        // <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute flex items-center justify-center">
          <TimeData />
        </div>
      )}
    </div>
  );
};
