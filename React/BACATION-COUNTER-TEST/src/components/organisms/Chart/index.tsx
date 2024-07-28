import React, { useState } from 'react';
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryBar,
  VictoryTheme,
} from 'victory';
import { TimeData } from '../ChartModal';
import { addMinutes, differenceInMinutes } from 'date-fns';

import useCountStore from '../../../store/useStore';

export const ChartData = () => {
  const axiosData = useCountStore((state) => state.axiosData);
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

  const activeIndex = useCountStore((state) => state.activeIndex);
  const setActiveIndex = useCountStore((state) => state.setActiveIndex);
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 relative">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <VictoryChart
          polar
          theme={VictoryTheme.material}
          domain={{ x: [0, 24], y: [0, 24] }}
          startAngle={90}
          endAngle={-270}
        >
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
                    ? '#4CAF50'
                    : datum.detectId === 1
                      ? '#FFC107'
                      : '#2196F3',
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
