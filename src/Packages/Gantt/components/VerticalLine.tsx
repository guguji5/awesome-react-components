import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { Context } from './index';
interface ITipCanvas {
  height: number;
  mouseXInGantt?: number; // 鼠标在甘特图上的距离
  showTipLine?: boolean;
  baseLeft: number;
  container: any;
}

const VerticalLine: React.FC<ITipCanvas> = ({ mouseXInGantt = 0, height, showTipLine = false, baseLeft, container }) => {
  const [mouseDowning, setMouseDowning] = useState(false);
  const { width, contentRatio } = useContext(Context);
  const [left, setLeft] = useState(width - 10);
  useEffect(() => {
    setLeft(width - 10);
  }, [width]);
  const leftboundary = (width - 100) * (1 - contentRatio) + 100;
  const handleStopMoveLine = (e) => {
    let left = 0;
    // -5 是因为竖线左右各有5px的间距以方便点击
    if (e.clientX - 5 - baseLeft > leftboundary && e.clientX - baseLeft < width) {
      left = e.clientX - 5 - baseLeft;
    } else if (e.clientX - 5 - baseLeft <= leftboundary) {
      left = leftboundary + 1;
    } else if (e.clientX - 5 - baseLeft >= width) {
      left = width - 1;
    }
    setLeft(left);
    setMouseDowning(false);
  };

  useEffect(() => {
    container.current.addEventListener('mouseup', handleStopMoveLine, true);
    return () => {
      container.current?.removeEventListener('mouseup', handleStopMoveLine, true);
    };
  }, [baseLeft]);

  const realTimeLeft = mouseDowning ? (mouseXInGantt > leftboundary ? mouseXInGantt : leftboundary) : left;
  return true ? (
    <div
      style={{ height: height, position: 'absolute', left: realTimeLeft, width: 10, zIndex: 2, paddingLeft: 5, cursor: mouseDowning ? 'grabbing' : 'grab' }}
      onMouseDown={() => {
        setMouseDowning(true);
      }}
      onMouseUp={(e) => {
        setMouseDowning(false);
        setLeft(mouseXInGantt);
      }}
    >
      <div style={{ borderLeft: '1px solid #F8392E', height: '100%', margin: '0 auto' }}></div>
    </div>
  ) : null;
};

export default VerticalLine;
