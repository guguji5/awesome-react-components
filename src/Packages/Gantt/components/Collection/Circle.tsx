import React, { useContext, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Popover, Button } from 'antd';
import PopoverContent from './PopoverContent';
import { Context } from '../';
import { IncidentContext } from './Row';
export interface ICircleProps {
  cx: number;
  cy: number;
  r: number;
  color?: string;
}

const Circle: React.FC<ICircleProps> = ({ cx, cy, r, color }) => {
  const { onLabelClick } = useContext(Context);
  const incident = useContext(IncidentContext);
  const [isHovering, setIsHovering] = useState<boolean>(false);
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

  const style = useSpring({
    config: {
      duration: 200,
    },
    r: isHovering ? r * 1.4 : r,
  });
  const innerStyle = useSpring({
    config: {
      duration: 200,
    },
    r: isHovering ? r * 0.4 : 0,
  });
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
          <span>Detail</span>
          <a
            onClick={() => {
              setVisible(false);
              onLabelClick && onLabelClick(incident!);
            }}
          >
            查看更多
          </a>
        </div>
      }
      destroyTooltipOnHide
    >
      <g
        className='circle-container'
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
      >
        <animated.circle cx={cx} cy={cy} fill={'transparent'} r={15} />
        <animated.circle {...style} cx={cx} cy={cy} fill={color} strokeWidth={1} stroke={'white'} />
        <animated.circle {...innerStyle} cx={cx} cy={cy} fill={'white'} />
      </g>
    </Popover>
  );
};

export default Circle;
