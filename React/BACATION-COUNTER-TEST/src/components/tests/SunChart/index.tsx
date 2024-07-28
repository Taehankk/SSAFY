// react-vis 는 react 18 버전과 호환이 잘 안되는듯,,,!
// 다른 차트 라이브러리 참고하기

import React from 'react';

import { Hint, Sunburst } from 'react-vis';

const COLORS = [
  '#19CDD7',
  '#DDB27C',
  '#88572C',
  '#FF991F',
  '#F15C17',
  '#223F9A',
  '#DA70BF',
  '#125C77',
  '#4DC19C',
  '#776E57',
  '#12939A',
  '#17B8BE',
  '#F6D18A',
  '#B7885E',
  '#FFCB99',
  '#F89570',
  '#829AE3',
  '#E79FD5',
  '#1E96BE',
  '#89DAC1',
  '#B3AD9E',
];

const DATA = {
  children: [
    {
      children: [
        { bigness: 1, children: [], clr: COLORS[1], name: 'excellent' },
        { bigness: 1, children: [], clr: COLORS[2], name: 'chart' },
      ],
      clr: COLORS[3],
    },
    {
      bigness: 1,
      children: [],
      clr: COLORS[4],
      name: 'cool',
      labelStyle: {
        fontSize: 15,
        fontWeight: 'bold',
      },
    },
    { bigness: 1, children: [], clr: COLORS[5], name: 'dogs' },
    { bigness: 1, children: [], clr: COLORS[6], name: 'sunglasses' },
    {
      children: [
        { bigness: 1, children: [], clr: COLORS[7], name: 'great' },
        { bigness: 1, children: [], clr: COLORS[8], name: 'label' },
      ],
      clr: COLORS[9],
    },
  ],
};

const tipStyle = {
  display: 'flex',
  color: '#fff',
  background: '#000',
  alignItems: 'center',
  padding: '5px',
};
const boxStyle = { height: '10px', width: '10px' };

function buildValue(hoveredCell) {
  const { radius, angle, angle0 } = hoveredCell;
  const truedAngle = (angle + angle0) / 2;
  return {
    x: radius * Math.cos(truedAngle),
    y: radius * Math.sin(truedAngle),
  };
}

class SunburstWithTooltips extends React.Component {
  state = {
    hoveredCell: false,
  };
  render() {
    const { hoveredCell } = this.state;
    console.log(hoveredCell);
    return (
      <Sunburst
        data={DATA}
        style={{ stroke: '#fff' }}
        onValueMouseOver={(v) =>
          this.setState({ hoveredCell: v.x && v.y ? v : false })
        }
        onValueMouseOut={(v) => this.setState({ hoveredCell: false })}
        height={300}
        margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
        getLabel={(d) => d.name}
        getSize={(d) => d.bigness}
        getColor={(d) => d.clr}
        width={350}
        padAngle={() => 0.02}
      >
        {hoveredCell ? (
          <Hint value={buildValue(hoveredCell)}>
            <div style={tipStyle}>
              <div style={{ ...boxStyle, background: hoveredCell.clr }} />
              {hoveredCell.clr}
            </div>
          </Hint>
        ) : null}
      </Sunburst>
    );
  }
}

export default SunburstWithTooltips;
