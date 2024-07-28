import React from 'react';
import { VictoryTooltip } from 'victory';

const CustomTooltip = (active: boolean, text) => {
  if (!active) return null;

  return (
    <VictoryTooltip
      flyoutStyle={{ fill: 'white', stroke: 'tomato', strokeWidth: 2 }}
      text={text}
      style={{ fontSize: 12 }}
    />
  );
};

export default CustomTooltip;
