import React from 'react';
import TimeRangePicker from './TimeRangePicker';
import { IRawTimeRange } from './types';
import TimeRangePickerWithRefresh from './TimeRangePickerWithRefresh';
import { parseRange, parse, valueAsString, isMathString, timeRangeUnix, describeTimeRange } from './utils';
import { ITimeRangePickerProps } from './types';

export default function index(props: ITimeRangePickerProps) {
  const { localKey, dateFormat = 'YYYY-MM-DD HH:mm', onChange } = props;

  return (
    <TimeRangePicker
      {...props}
      onChange={(val) => {
        if (localKey) {
          localStorage.setItem(
            localKey,
            JSON.stringify({
              start: valueAsString(val.start, dateFormat),
              end: valueAsString(val.end, dateFormat),
            }),
          );
        }
        if (onChange) {
          onChange(val);
        }
      }}
    />
  );
}

export type { IRawTimeRange } from './types';
export function getDefaultValue(localKey: string, defaultValue: IRawTimeRange) {
  const localeValue = localStorage.getItem(localKey);
  if (localeValue) {
    try {
      return JSON.parse(localeValue);
    } catch (e) {
      return defaultValue;
    }
  }
  return defaultValue;
}
export { TimeRangePickerWithRefresh, parseRange, parse, isMathString, timeRangeUnix, describeTimeRange };
