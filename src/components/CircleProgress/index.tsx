import React from 'react';
import './index.less';
import IconFont from '@/components/IconFont';
interface Props {
  value: number;
  color: keyof typeof colorMap;
}
const colorMap = {
  red: {
    background: '#EE5A52',
    progressColor: '#FDEEED',
    borderColor: '#FCDEDC',
  },
  green: {
    background: '#70dab7',
    progressColor: '#f0fbf7',
    borderColor: '#E2F8F1',
  },
};

export default function index(props: Props) {
  const { value, color } = props;
  const { background, progressColor, borderColor } = colorMap[color];
  return (
    //@ts-ignore
    <div role='progressbar' style={{ '--value': value, '--background': background, '--progressColor': progressColor, '--borderColor': borderColor }}>
      <IconFont type='icon-Chart' />
    </div>
  );
}
