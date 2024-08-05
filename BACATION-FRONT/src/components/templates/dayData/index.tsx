import Day from '../../organisms/day';
import { ChartData } from '../../organisms/chart';
import { AnalysisData } from '../../organisms/analysisData';
export const DayData = () => {
  return (
    <div className="relative">
      <Day />
      <ChartData />
      <AnalysisData />
    </div>
  );
};