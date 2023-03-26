import React, { useRef, useEffect } from 'react';
import loadLiquidFillGauge from './liquidFillGauge';
interface Props {
  label: string;
  value: number;
  type: 'error' | 'success';
  style?: React.CSSProperties;
}
const colorsMap = {
  error: '#EA4738',
  success: '#49D1A5',
};
export default function index(props: Props) {
  const { label, value, type, style = {} } = props;
  const eleRef = useRef<HTMLDivElement>(null);
  const gaugeUpdater = useRef<any>();
  useEffect(() => {
    if (!eleRef.current) return;
    const { current } = eleRef;
    if (!gaugeUpdater.current) {
      const updater = loadLiquidFillGauge(current, value, {
        waveColor: colorsMap[type],
      });
      gaugeUpdater.current = updater;
    } else {
      gaugeUpdater.current(value, colorsMap[type]);
    }
  }, [value, type]);
  return (
    <div
      style={{
        ...style,
        flex: 1,
      }}
    >
      <div ref={eleRef} />
      <div
        style={{
          color: type === 'error' ? colorsMap[type] : 'inherit',
        }}
      >
        {label}
        {value}%
      </div>
    </div>
  );
}
