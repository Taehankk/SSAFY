import Day from '../../organisms/day';
import { ChartData } from '../../organisms/chart';
import { AnalysisData } from '../../organisms/analysisData';

export const DayData = () => {
  return (
    <div className="relative">
      {/* 날짜 선택 */}
      <Day />
      {/* 차트 */}
      <ChartData />
      {/* 감지 데이터 */}
      <AnalysisData mode="수면" date={new Date()} />
      <AnalysisData mode="활동" date={new Date()} />
    </div>
  );
};
