import React, { useState, useEffect, useRef, useReducer } from 'react';
import PageLayout from '@/components/pageLayout';
import ModuleCard from '@/components/moduleCard';
import InterfaceCard from '@/components/interfaceCard';
import CircleProgress from '@/components/CircleProgress';
import LiquidFillGauge from '@/components/liquidFillGauge';
import { Space } from 'antd';

export default function StatusCard() {
  return (
    <PageLayout title={'状态卡片'}>
      <div>
        <div style={{ width: 390, margin: 10 }}>
          <InterfaceCard />
        </div>
        <div style={{ width: 390, margin: 10 }}>
          <ModuleCard />
        </div>
        <div style={{ width: 390, margin: 10, display: 'flex', background: '#fff', padding: 16 }}>
          <Space>
            <CircleProgress value={75} color='red' />
            <CircleProgress value={25} color='green' />
            <LiquidFillGauge label='跑动' value={35} type='error' />
            <LiquidFillGauge label={'体能'} value={79} type='success' />
            <LiquidFillGauge label={'力量'} value={80} type='success' />
          </Space>
        </div>
      </div>
    </PageLayout>
  );
}
