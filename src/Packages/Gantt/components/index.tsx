import React, { useState, useRef, useEffect } from 'react';
import TableHeader from './TableHeader';
import VerticalLine from './VerticalLine';
import './index.less';
import { throttle } from 'lodash';
import Collection from './Collection';
import { GanttDataType } from '../store/gantt';
import { RowType } from '../pages';
type IncidentDetailFunc = (Incident: GanttDataType) => void;
interface ContextType {
  startTime: number;
  endTime: number;
  width: number;
  draggingLength: number;
  draggedLength: number;
  contentRatio: number;
  rowHeight: number;
  onLabelClick?: IncidentDetailFunc;
  type?: GanttType;
}
export type GanttType = 'text' | 'time';
export const Context = React.createContext<ContextType>({
  startTime: 0,
  endTime: 0,
  width: 0,
  contentRatio: 0.8,
  draggedLength: 0,
  draggingLength: 0,
  rowHeight: 40,
  type: undefined,
});
interface Props {
  startTime: number;
  endTime: number;
  collectionList: RowType[];
  onLabelClick?: IncidentDetailFunc;
  type?: GanttType;
}
export default function Gantt(props: Props) {
  const { startTime, endTime, onLabelClick, collectionList, type } = props;
  const contentRef = useRef<any>(null);
  const [rowWidth, setRowWidth] = useState<number>(0);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [showTipTimeLine, setShowTipTimeLine] = useState<boolean>(false);
  const [showTipX, setShowTipX] = useState<number>(0);
  const [baseLeft, setBaseLeft] = useState(0);
  const [draggingLength, setDraggingLength] = useState<number>(0);
  const [draggedLength, setDraggedLength] = useState<number>(0);
  const calcRow = (showLine = false) => {
    if (contentRef.current) {
      const { clientWidth, clientHeight } = contentRef.current;
      if (clientHeight && clientWidth) {
        setRowWidth(clientWidth);
        setContentHeight(clientHeight);
        setShowTipTimeLine(showLine);
      }
    }
  };
  const resizeTable = throttle(() => {
    calcRow();
  }, 100);
  useEffect(() => {
    calcRow();
    window.addEventListener('resize', resizeTable);
    return () => {
      window.removeEventListener('resize', resizeTable);
    };
  }, []);
  const handleMouseMove = (e) => {
    const {
      nativeEvent: { clientX },
    } = e;
    const baseLeft = type === 'time' ? e.view.innerWidth - 960 + 24 : contentRef.current.parentNode.offsetLeft; // .gantt-area 写成relative，所以它的offsetleft一直为0，需要获取其父元素的offsetleft
    setBaseLeft(baseLeft);
    const leftDistance = clientX - baseLeft;
    if (leftDistance > 0) {
      setShowTipTimeLine(true);
      setShowTipX(leftDistance);
    }
  };
  const handleMouseEnter = (e) => {
    setShowTipTimeLine(true);
  };
  const handleMouseLeave = (e) => {
    setShowTipTimeLine(false);
  };
  return (
    <div className='gantt-area'>
      <Context.Provider
        value={{
          startTime,
          endTime,
          width: rowWidth,
          contentRatio: type === 'text' ? 0 : type === 'time' ? 1 : 0.7,
          onLabelClick,
          draggingLength,
          draggedLength,
          rowHeight: 55,
          type,
        }}
      >
        <TableHeader onRefreshDraggedLength={setDraggedLength} onRefreshDraggingLength={setDraggingLength} />
        <VerticalLine height={contentHeight} showTipLine={showTipTimeLine} mouseXInGantt={showTipX} baseLeft={baseLeft} container={contentRef}></VerticalLine>
        <div className='gantt-table-view' ref={contentRef} onMouseMove={throttle(handleMouseMove, 100)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {collectionList.map((item: RowType) => {
            return <Collection title={item.name} key={item.id} rows={item.rows} />;
          })}
        </div>
      </Context.Provider>
    </div>
  );
}
