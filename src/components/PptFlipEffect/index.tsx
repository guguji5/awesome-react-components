import { FC, useState, useEffect } from 'react';
import React from 'react';
import './index.less';
import type { IEffect } from './slideswitch';
import SliderSwitch from './slideswitch';

const effects: IEffect[] = ['fade_in', 'slide_from_left', 'flip', 'grow', 'shrink'];

const FcAd: FC = () => {
  const [sliderIndex, setSliderIndex] = useState(Math.floor(Math.random() * effects.length));
  useEffect(() => {
    const timer = setInterval(() => {
      setSliderIndex((i) => (i + 1) % effects.length);
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className='mb-4 fc-ad'>
      <SliderSwitch effect={effects[sliderIndex]} />
    </div>
  );
};

export default FcAd;
