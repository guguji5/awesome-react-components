import React, { useMemo, useState, useContext } from 'react';
import { Popover } from 'antd';
import PopoverContent from './PopoverContent';
import { Context } from '..';
import { IncidentContext } from './Row';
import { useTranslation } from 'react-i18next';
export interface IBaseLineProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

const BaseLine: React.FC<IBaseLineProps> = ({ x, y, width, height, color }) => {
  const { t } = useTranslation();
  const { onLabelClick } = useContext(Context);
  const incident = useContext(IncidentContext);
  const [visible, setVisible] = useState<boolean>(false);
  const renderDetailContent = () => {
    return (
      <div style={{ width: 400, height: 150, overflowY: 'auto' }}>
        <PopoverContent />
      </div>
    );
  };
  const onVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };
  // 2 是优化中心白点不会被挡住
  const realWidth = useMemo(() => {
    const adjustWidth = width - 2;
    return adjustWidth > 0 ? adjustWidth : 0;
  }, [width]);
  return (
    <Popover
      getPopupContainer={() => {
        return document.body;
      }}
      style={{ width: 400 }}
      content={<div>{renderDetailContent()}</div>}
      onVisibleChange={onVisibleChange}
      visible={visible}
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0' }}>
          <span>{t('最新告警')}</span>
          <a
            onClick={() => {
              setVisible(false);
              onLabelClick && onLabelClick(incident!);
            }}
          >
            {t('查看更多')}
          </a>
        </div>
      }
      destroyTooltipOnHide
    >
      <g>
        <rect x={x + 2} y={y - 6} width={realWidth} height={6} fill={'transparent'}></rect>
        <rect x={x + 2} y={y} width={realWidth} height={height} fill={color}></rect>
        <rect x={x + 2} y={y + height} width={realWidth} height={6} fill={'transparent'}></rect>
      </g>
    </Popover>
  );
};

export default BaseLine;
