// import { useState } from 'react';
// import {
//   VictoryChart,
//   VictoryPolarAxis,
//   VictoryBar,
//   VictoryTheme,
//   VictoryTooltip,
// } from 'victory';

// export const VictoryPolar = () => {
//   const [openArr, setOpenArr] = useState([false, false, false, false, false]);

//   return (
//     <div>
//       <VictoryChart polar theme={VictoryTheme.material}>
//         {[0, 6, 12, 18, 24].map((d, i) => {
//           return (
//             <VictoryPolarAxis
//               dependentAxis
//               domain={{ x: [0, 24], y: [0, 1] }}
//               key={i}
//               labelPlacement="perpendicular"
//               style={{ tickLabels: { fill: 'none' } }}
//               axisValue={d}
//             />
//           );
//         })}
//         <VictoryBar
//           style={{ data: { fill: 'tomato', width: 50 } }}
//           data={[
//             { x: 0, y: 50, label: 'test1', toolOpen: openArr[0] },
//             { x: 6, y: 25, label: 'test2', toolOpen: openArr[1] },
//             { x: 12, y: 40, label: 'test3', toolOpen: openArr[2] },
//             { x: 18, y: 50, label: 'test4', toolOpen: openArr[3] },
//             { x: 24, y: 50, label: 'test5', toolOpen: openArr[4] },
//           ]}
//           labelComponent={<VictoryTooltip active={openArr[0]} />}
//           events={[
//             {
//               target: 'data',
//               eventHandlers: {
//                 onClick: () => {
//                   return [
//                     {
//                       mutation: (props) => {
//                         props.datum.toolOpen = !props.datum.toolOpen;
//                         console.log(props.datum.toolOpen);
//                         return null;
//                       },
//                     },
//                   ];
//                 },
//               },
//             },
//           ]}
//         />
//       </VictoryChart>
//     </div>
//   );
// };

// import React, { useState } from 'react';
// import {
//   VictoryChart,
//   VictoryPolarAxis,
//   VictoryBar,
//   VictoryTheme,
//   VictoryVoronoiContainer,
// } from 'victory';

// export const VictoryPolar = () => {
//   const initialData = [
//     { x: 0, y: 50, label: 'test1' },
//     { x: 6, y: 25, label: 'test2' },
//     { x: 12, y: 40, label: 'test3' },
//     { x: 18, y: 50, label: 'test4' },
//     { x: 24, y: 50, label: 'test5' },
//   ];

//   const [tooltipState, setTooltipState] = useState(
//     initialData.map(() => false),
//   );

//   const handleMouseOver = (index) => {
//     setTooltipState((prevState) => {
//       const newState = [...prevState];
//       newState[index] = true;
//       return newState;
//     });

//     setTimeout(() => {
//       setTooltipState((prevState) => {
//         const newState = [...prevState];
//         newState[index] = false;
//         return newState;
//       });
//     }, 3000);
//   };

//   const dataWithTooltip = initialData.map((datum, index) => ({
//     ...datum,
//     showTooltip: tooltipState[index],
//   }));

//   return (
//     <div>
//       <VictoryChart
//         polar
//         theme={VictoryTheme.material}
//         containerComponent={
//           <VictoryVoronoiContainer
//             labels={({ datum }) =>
//               datum.showTooltip ? `${datum.label}: ${datum.y}` : ''
//             }
//             onActivated={(points) => {
//               if (points.length > 0) {
//                 const index = dataWithTooltip.findIndex(
//                   (point) => point.x === points[0]._x,
//                 );
//                 handleMouseOver(index);
//               }
//             }}
//           />
//         }
//       >
//         {[0, 6, 12, 18, 24].map((d, i) => (
//           <VictoryPolarAxis
//             dependentAxis
//             domain={{ x: [0, 24], y: [0, 1] }}
//             key={i}
//             labelPlacement="perpendicular"
//             style={{ tickLabels: { fill: 'none' } }}
//             axisValue={d}
//           />
//         ))}
//         <VictoryBar
//           style={{ data: { fill: 'tomato', width: 50 } }}
//           data={dataWithTooltip}
//         />
//       </VictoryChart>
//     </div>
//   );
// };

import React, { useState } from 'react';
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryBar,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory';
import { ExampleData } from '../../organisms/ChartModal';

export const VictoryPolar = () => {
  const initialData = [
    { x: 0, y: 50, label: 'test1', link: <ExampleData index={1} /> },
    { x: 6, y: 25, label: 'test2', link: <ExampleData index={2} /> },
    { x: 12, y: 40, label: 'test3', link: <ExampleData index={3} /> },
    { x: 18, y: 50, label: 'test4', link: <ExampleData index={4} /> },
    { x: 24, y: 50, label: 'test5', link: <ExampleData index={5} /> },
  ];

  const [tooltipState, setTooltipState] = useState(
    initialData.map(() => false),
  );

  const handleMouseOver = (index) => {
    setTooltipState((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });

    setTimeout(() => {
      setTooltipState((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }, 3000);
  };

  const dataWithTooltip = initialData.map((datum, index) => ({
    ...datum,
    showTooltip: tooltipState[index],
  }));

  return (
    <div>
      <VictoryChart
        polar
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) =>
              datum.showTooltip
                ? `시작시간 ${datum.label}: ${datum.y} : ${(<ExampleData index={1} />)}`
                : ''
            }
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{
                  fill: 'white',
                  stroke: 'tomato',
                  strokeWidth: 2,
                }}
                centerOffset={{ x: 0, y: 0 }} // Adjust this value as needed
              />
            }
            onActivated={(points) => {
              if (points.length > 0) {
                const index = dataWithTooltip.findIndex(
                  (point) => point.x === points[0]._x,
                );
                handleMouseOver(index);
              }
            }}
          />
        }
      >
        {[0, 6, 12, 18, 24].map((d, i) => (
          <VictoryPolarAxis
            dependentAxis
            domain={{ x: [0, 24], y: [0, 1] }}
            key={i}
            labelPlacement="perpendicular"
            style={{ tickLabels: { fill: 'none' } }}
            axisValue={d}
          />
        ))}
        <VictoryBar
          style={{ data: { fill: 'tomato', width: 50 } }}
          data={dataWithTooltip}
        />
      </VictoryChart>
    </div>
  );
};
