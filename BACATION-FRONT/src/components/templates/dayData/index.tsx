import Day from '../../organisms/day';
import { ChartData } from '../../organisms/chart';
import { AnalysisData } from '../../organisms/analysisData';
export const DayData = () => {
  return (
    <div className="flex-col justify-center items-center">
      <Day />
      <ChartData />
      <AnalysisData />
    </div>
  );
};
