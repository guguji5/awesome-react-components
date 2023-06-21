import { FC } from 'react';
import React from 'react';
import fadeInImg from '@/assets/images/flashduty.jpg';
import './index.less';

const effectImgMap = {
  fade_in: fadeInImg,
  slide_from_left: fadeInImg,
  flip: fadeInImg,
  grow: fadeInImg,
  shrink: fadeInImg,
};

export type IEffect = keyof typeof effectImgMap;

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
