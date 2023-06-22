import React, { Fragment, useCallback, useMemo, useContext } from 'react';
import { GanttDataType, GanttCircleColorMap, GanttCircleOKColor } from '../../store/gantt';
import Circle, { ICircleProps } from './Circle';
import BaseLine, { IBaseLineProps } from './BaseLine';
import '../index.less';
import { Context } from '../index';
const height = 32;

const radius = height * 0.3125 * 0.5;

const lineY = 14;

const lineHeight = 3;

interface ITableRowProps {
  incident: GanttDataType;
}

export const IncidentContext = React.createContext<GanttDataType | null>(null);

const IncidentRow: React.FC<ITableRowProps> = ({ incident }) => {
  const { startTime, endTime, width, contentRatio, rowHeight, type } = useContext(Context);
  const rowTimeWidth = useMemo(() => {
    return endTime - startTime;
  }, [startTime, endTime]);

  const lineAreaWith = useMemo(() => {
    return Math.max((width - 100) * contentRatio, 0);
  }, [width]);

  const renderCur = useCallback(() => {
    const circleProps: Array<ICircleProps> = [];

    // 肯定得有一个横线
    const baseLineProps: IBaseLineProps = {
      x: ((Math.max(incident.start_time, startTime) - startTime) / rowTimeWidth) * lineAreaWith,
      y: 0.5 * rowHeight - 1,
      height: lineHeight,
      width: ((Math.min(incident.end_time, endTime) - Math.max(incident.start_time, startTime)) / rowTimeWidth) * lineAreaWith,
      color: GanttCircleColorMap.get(incident.incident_severity),
    };

    if (incident.start_time > startTime) {
      const x = ((incident.start_time - startTime) / rowTimeWidth) * lineAreaWith;
      circleProps.push({
        cx: x,
        cy: 0.5 * rowHeight,
        r: radius,
        color: GanttCircleColorMap.get(incident.incident_severity),
      });
    }
    if (incident.end_time > 0 && incident.end_time < endTime) {
      const x = ((incident.end_time - startTime) / rowTimeWidth) * lineAreaWith;
      circleProps.push({
        cx: x,
        cy: 0.5 * rowHeight,
        r: radius,
        color: GanttCircleOKColor,
      });
    }

    return (
      <>
        <svg width={Math.floor(lineAreaWith)} height={rowHeight - 1}>
          <BaseLine {...baseLineProps}></BaseLine>
          {circleProps.map((circleProp, index) => (
            <Fragment key={index}>
              <Circle {...circleProp}></Circle>
            </Fragment>
          ))}
        </svg>
      </>
    );
  }, [lineAreaWith, startTime, endTime, incident]);

  return (
    <div className='gantt-row-line-area' style={{ width: 100 * contentRatio + '%' }}>
      <IncidentContext.Provider value={incident}>{renderCur()}</IncidentContext.Provider>
    </div>
  );
};

export default React.memo(IncidentRow);
