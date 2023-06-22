import React, { useMemo, useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Tooltip } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';
import { Context } from './index';
import { throttle } from 'lodash';
import IconFont from '@/components/IconFont';
import { useTranslation } from 'react-i18next';
interface ITableHeaderProps {
  onRefreshDraggedLength: (num: number) => void;
  onRefreshDraggingLength: (num: number) => void;
}

const regionCount = 12;

const TableHeader: React.FC<ITableHeaderProps> = (props) => {
  const { t } = useTranslation();
  const { onRefreshDraggedLength, onRefreshDraggingLength } = props;
  const { startTime, endTime, width, contentRatio, type } = useContext(Context);
  const [dragIconStart, setDragIconStart] = useState<number>(0);
  const [dragging, setDragging] = useState(false);
  const [draggingLength, setDraggingLength] = useState<number>(0);
  const [draggedLength, setDraggedLength] = useState<number>(0);
  const timeList = useMemo(() => {
    const timeArray: number[] = [];
    const divideTime = (endTime - startTime) / regionCount;
    for (let i = 1; i <= regionCount - 1; i++) {
      timeArray.push(startTime + i * divideTime);
    }
    return timeArray;
  }, [startTime, endTime]);

  const divider = useMemo(() => {
    return (width * (type ? 0.95 : contentRatio)) / regionCount;
  }, [width, type]);

  const handleMouseUp = (e) => {
    if (dragging) {
      setDragging(false);
      setDraggingLength(0);
      const offset = draggedLength + e.nativeEvent.clientX - dragIconStart;
      setDraggedLength(offset >= 0 ? offset : 0);
      onRefreshDraggedLength(offset >= 0 ? offset : 0);
      onRefreshDraggingLength(0);
    }
  };

  const handleMouseMove = (e) => {
    const {
      nativeEvent: { clientX },
    } = e;
    const length = clientX - dragIconStart;
    if (!dragging || dragIconStart === 0 || length + draggedLength <= 0) return;
    setDraggingLength(length);
    onRefreshDraggingLength(length);
  };

  return (
    <div className='table-header cannotselect' onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <div className='table-header-type'>
        <div className='table-header-type-text'>{t('事件类别')}</div>
      </div>
      {type !== 'time' && (
        <div className='table-header-name' style={{ width: `calc((100% - 100px) * ${type ? 1 : 1 - contentRatio} + ${draggingLength}px + ${draggedLength}px)` }}>
          <div className='table-header-name-text'>{t('事件名')}</div>
          {!type && (
            <div>
              {draggedLength > 0 && (
                <MenuFoldOutlined
                  style={{ marginRight: 10, cursor: 'pointer' }}
                  onClick={() => {
                    setDraggedLength(0);
                    setDraggingLength(0);
                    onRefreshDraggedLength(0);
                    onRefreshDraggingLength(0);
                  }}
                />
              )}
              <Tooltip title='可拖动展开' getPopupContainer={() => document.body}>
                <IconFont
                  type='icon-tuozhuai1'
                  style={{ cursor: dragging ? 'grabbing' : 'grab' }}
                  onMouseDown={(e) => {
                    // console.log('handleMouseDown clientX', e.nativeEvent.clientX);
                    setDragIconStart(e.nativeEvent.clientX);
                    setDragging(true);
                  }}
                />
              </Tooltip>
            </div>
          )}
        </div>
      )}
      {type !== 'text' && (
        <div className='table-header-time' style={{ flex: type ? 1 : undefined }}>
          {timeList.map((timeItem, index) => (
            <div key={index} className='time-item-content' style={{ left: (index + 1) * divider - 50 }}>
              <div className='time-day'>{dayjs.unix(timeItem).format('MM/DD')}</div>
              <div className='time-time'>{dayjs.unix(timeItem).format('HH:mm')}</div>
              <div className='time-line'></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(TableHeader);
