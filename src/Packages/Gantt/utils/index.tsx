import React, { Fragment } from 'react';
import moment from 'moment';

export function getTimesByLastHours(lastHours: number) {
  const now = moment();
  const startTime = now.clone().subtract(lastHours, 'hours').unix();
  const endTime = now.unix();
  return {
    startTime,
    endTime,
  };
}

export function getLastHoursByTimes(times) {
  const { startTime, endTime } = times;
  return (endTime - startTime) / 3600;
}

export function format(obj, breakLine = false, filters?, bold = true, isGray = false, valuesIsArr = false) {
  const hasFilter = filters && filters.length > 0;
  const filterLabels = filters?.map((item) => item.label);
  return (
    Object.keys(obj)
      // @ts-ignore
      .sort((a, b) => (hasFilter && filterLabels.includes(b) ? -1 : b - hasFilter && filterLabels.includes(a) ? -1 : a))
      .map((key) => (
        <Fragment key={key}>
          {bold ? (
            <span style={{ marginRight: '8px' }}>
              {key}: {valuesIsArr ? obj[key].join(', ') : obj[key]}
            </span>
          ) : (
            <>
              <span>{key}</span>: <span style={{ marginRight: '8px' }}>{valuesIsArr ? obj[key].join(', ') : obj[key]}</span>
            </>
          )}
          {breakLine ? <br /> : ` `}
        </Fragment>
      ))
  );
}
