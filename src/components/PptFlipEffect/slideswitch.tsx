import { FC } from 'react';
import React from 'react';
import './index.less';

export type IEffect = 'fade_in' | 'slide_from_left' | 'flip' | 'grow' | 'shrink';

interface IProps {
  effect: IEffect;
}

const SliderSwitch: FC<IProps> = (props) => {
  const { effect } = props;
  return (
    <div>
      <div className='slideswitch'>
        <div className={`content ${effect}`}>
          <img src={'/image/github.png'} style={{ width: 200 }} />
        </div>
      </div>
    </div>
  );
};

export default SliderSwitch;
