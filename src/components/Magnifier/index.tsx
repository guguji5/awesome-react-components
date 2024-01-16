import React from 'react';
import './index.less';

interface Props {
  children: React.ReactNode;
  size?: number;
}

export default function index(props: Props) {
  const { children, size = 90 } = props;
  return (
    <div className='magnifier'>
      <div className='magnifier-container'>{children}</div>
      <div className='magnifier-circle' style={{ width: size, height: size }}></div>
      <div className='magnifier-mask' style={{ maskSize: size }}>
        <div className='magnifier-mask-container'>{children}</div>
      </div>
    </div>
  );
}
