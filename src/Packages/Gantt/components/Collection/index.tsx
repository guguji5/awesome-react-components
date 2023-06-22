import React, { useState, useContext } from 'react';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { GanttDataType, GanttCircleColorMap } from '../../store/gantt';
import Row from './Row';
import { Context } from '../index';
import { format } from '../../utils';
import { useTranslation } from 'react-i18next';
interface Props {
  title: string;
  rows: GanttDataType[];
}
export default function Collection(props: Props) {
  const { t } = useTranslation();
  const { onLabelClick, contentRatio, draggedLength, draggingLength, rowHeight, type } = useContext(Context);
  const [collpase, setCollpase] = useState(false);
  const { title, rows } = props;

  return (
    <div className='event-collection cannotselect'>
      <div className='event-collection-type '>
        {title}

        {rows.length > 0 && (
          <span>
            {!collpase ? (
              <UpOutlined
                style={{
                  marginLeft: 8,
                }}
                onClick={() => setCollpase(true)}
              />
            ) : (
              <DownOutlined
                style={{
                  marginLeft: 8,
                }}
                onClick={() => setCollpase(false)}
              />
            )}
          </span>
        )}
      </div>
      <div className='event-collection-container'>
        {collpase ? (
          <div className='collapse-holder'>
            {t('此区间有')}
            {rows.length}
            {t('个事件')}
          </div>
        ) : (
          rows?.map((row) => {
            return (
              <div
                style={{
                  position: 'relative',
                  height: rowHeight,
                }}
                key={row._id}
              >
                {type !== 'time' && (
                  <div
                    style={{
                      width: `calc(100% * ${1 - contentRatio} + ${draggedLength}px + ${draggingLength}px)`,
                      height: rowHeight,
                    }}
                    className='event-collection-name ellipsis couldclick'
                    onClick={() => {
                      onLabelClick && onLabelClick(row);
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <div
                        className='event-collection-status-circle'
                        style={{
                          background: GanttCircleColorMap.get(row.incident_status),
                        }}
                      ></div>
                      {format(row.labels, false, [], true, row.incident_status === 'ok')}
                    </div>
                  </div>
                )}
                {type !== 'text' && <Row incident={row} />}
              </div>
            );
          })
        )}

        {rows.length === 0 && (
          <div
            className='event-place-holder'
            style={{
              height: rowHeight,
            }}
          >
            无事件
          </div>
        )}
      </div>
    </div>
  );
}
