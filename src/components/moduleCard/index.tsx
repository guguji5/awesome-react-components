import { useTranslation } from 'react-i18next';
import React from 'react';
import { Progress } from 'antd';
import OutfireBlock from '@/components/OutfireBlock';
import FlashCatTag from '@/components/FlashCatTag';
import LiquidFillGauge from '../liquidFillGauge';
const colorMap = {
  error: 'linear-gradient(to right, #E62412, #F07C71)',
  success: 'linear-gradient(to right, #2ACA96, #98E5CC)',
};
export default function index() {
  const { t } = useTranslation();
  return (
    <OutfireBlock title={t('网球天赋')} type='both'>
      <div
        style={{
          padding: 20,
          display: 'flex',
        }}
      >
        <div>
          <FlashCatTag text={t('弱鸡')} />
          <div
            style={{
              width: 144,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#262626',
              }}
            >
              79.743
              <span
                style={{
                  fontSize: 12,
                  marginLeft: 6,
                }}
              >
                %
              </span>
            </div>
            <div>
              <Progress percent={79.743} showInfo={false} strokeColor={colorMap['error']} />
            </div>
          </div>
        </div>
        <div
          style={{
            marginLeft: 10,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <LiquidFillGauge label='跑动' value={35} type='error' />
          <LiquidFillGauge label={'体能'} value={79} type='success' />
          <LiquidFillGauge label={'力量'} value={80} type='success' />
        </div>
      </div>
    </OutfireBlock>
  );
}
