import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import PageLayout from '@/components/pageLayout';
import Gantt from '../components';
import { GanttDataType } from '../store/gantt';
import './index.less';
export interface RowType {
  name: string;
  id: number;
  rows: GanttDataType[];
}

const mockData = [
  {
    _id: '6493fcecb82b9b11348f4630',
    deleted_at: 0,
    created_at: 1687420140,
    updated_at: 1687423965,
    data_source_id: -1,
    start_time: 1687420023,
    end_time: 1687423864,
    last_time: 1687423864,
    window_end: 1687421823,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'ok',
    labels: {
      business: '出行业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['司机接单量数据中断（日志链路中断）', '出行业务智能报警'],
    },
  },
  {
    _id: '64940340b82b9b11348f4638',
    deleted_at: 0,
    created_at: 1687411760,
    updated_at: 1687423065,
    data_source_id: -1,
    start_time: 1687421644,
    end_time: 1687422964,
    last_time: 1687422964,
    window_end: 1687423444,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      business: '电商业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['电商业务智能报警'],
    },
  },
  {
    _id: '6493a632b82b9b11348f45df',
    deleted_at: 0,
    created_at: 1687397938,
    updated_at: 1687422714,
    data_source_id: -1,
    start_time: 1687397824,
    end_time: 1687422604,
    last_time: 1687422604,
    window_end: 1687399624,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      business: '门店业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['默认智能告警'],
    },
  },

  {
    _id: '6493f8acb82b9b11348f4629',
    deleted_at: 0,
    created_at: 1687419052,
    updated_at: 1687421265,
    data_source_id: -1,
    start_time: 1687418944,
    end_time: 1687421164,
    last_time: 1687421164,
    window_end: 1687420744,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      business: '电商业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['电商业务智能报警'],
    },
  },
  {
    _id: '6493f4b3b82b9b11348f4624',
    deleted_at: 0,
    created_at: 1687418035,
    updated_at: 1687418332,
    data_source_id: -1,
    start_time: 1687417924,
    end_time: 1687418224,
    last_time: 1687418224,
    window_end: 1687419724,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'warning',
    labels: {
      business: '门店业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['默认智能告警'],
    },
  },
  {
    _id: '6493e796b82b9b11348f4614',
    deleted_at: 0,
    created_at: 1687414678,
    updated_at: 1687417306,
    data_source_id: -1,
    start_time: 1687414562,
    end_time: 1687417202,
    last_time: 1687417202,
    window_end: 1687416362,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      business: '直播业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['直播业务智能报警'],
    },
  },
  {
    _id: '6493e9b2b82b9b11348f4618',
    deleted_at: 0,
    created_at: 1687415218,
    updated_at: 1687417072,
    data_source_id: -1,
    start_time: 1687415102,
    end_time: 1687416964,
    last_time: 1687416964,
    window_end: 1687416902,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      business: '电商业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['电商业务智能报警'],
    },
  },
  {
    _id: '6493e085b82b9b11348f460d',
    deleted_at: 0,
    created_at: 1687412869,
    updated_at: 1687415092,
    data_source_id: -1,
    start_time: 1687412764,
    end_time: 1687414984,
    last_time: 1687414984,
    window_end: 1687414564,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      business: '电商业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['电商业务智能报警'],
    },
  },
  {
    _id: '6493d14cb82b9b11348f4602',
    deleted_at: 0,
    created_at: 1687408972,
    updated_at: 1687410944,
    data_source_id: -1,
    start_time: 1687408864,
    end_time: 1687410844,
    last_time: 1687410844,
    window_end: 1687410664,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      business: '电商业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['电商业务智能报警'],
    },
  },
  {
    _id: '6493c9c6b82b9b11348f45fe',
    deleted_at: 0,
    created_at: 1687407046,
    updated_at: 1687407281,
    data_source_id: -1,
    start_time: 1687406944,
    end_time: 1687407184,
    last_time: 1687407184,
    window_end: 1687408744,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      business: '出行业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['出行业务智能报警'],
    },
  },
  {
    _id: '6493c120b82b9b11348f45f6',
    deleted_at: 0,
    created_at: 1687404832,
    updated_at: 1687405724,
    data_source_id: -1,
    start_time: 1687404724,
    end_time: 1687405624,
    last_time: 1687405624,
    window_end: 1687406524,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      business: '出行业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['出行业务智能报警'],
    },
  },
  {
    _id: '64938f74b82b9b11348f45ca',
    deleted_at: 0,
    created_at: 1687392116,
    updated_at: 1687404645,
    data_source_id: -1,
    start_time: 1687392004,
    end_time: 1687404544,
    last_time: 1687404544,
    window_end: 1687393804,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      business: '电商业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['电商业务智能报警'],
    },
  },
  {
    _id: '64930168b82b9b11348f457b',
    deleted_at: 0,
    created_at: 1687355752,
    updated_at: 1687404590,
    data_source_id: -1,
    start_time: 1687355642,
    end_time: 1687404482,
    last_time: 1687404482,
    window_end: 1687357442,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      business: '直播业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['直播业务智能报警'],
    },
  },

  {
    _id: '6493b655b82b9b11348f45ea',
    deleted_at: 0,
    created_at: 1687402069,
    updated_at: 1687404338,
    data_source_id: -1,
    start_time: 1687401964,
    end_time: 1687404244,
    last_time: 1687404244,
    window_end: 1687403764,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      business: '出行业务',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f4',
    tips: {
      checks: ['出行业务智能报警'],
    },
  },
];

const mockData1 = [
  {
    _id: '64659cd9367f5a977ac2d343',
    deleted_at: 0,
    created_at: 1684380889,
    updated_at: 1687423076,
    data_source_id: 0,
    start_time: 1684599813,
    end_time: 1687423057,
    last_time: 1687423057,
    window_end: 1684382613,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'info',
    labels: {
      check: '电商业务智能报警',
      cluster: 'Default',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f3',
    tips: {
      metrics: ['商品实时下单量（小程序端）'],
    },
  },
  {
    _id: '646c7d40663768e94d6ca20f',
    deleted_at: 0,
    created_at: 1684831552,
    updated_at: 1687423074,
    data_source_id: 0,
    start_time: 1684831530,
    end_time: 1687423055,
    last_time: 1687423055,
    window_end: 1684833330,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      check: '电商业务智能报警',
      cluster: 'Default',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f3',
    tips: {
      metrics: ['商品实时下单量（ALL）'],
    },
  },
  {
    _id: '6493acb3a469f98e69dd844e',
    deleted_at: 0,
    created_at: 1687399603,
    updated_at: 1687422876,
    data_source_id: 0,
    start_time: 1687399580,
    end_time: 1687422865,
    last_time: 1687422865,
    window_end: 1687401380,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      check: '电商系统报警策略',
      cluster: 'Default',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f3',
    tips: {},
  },

  {
    _id: '63f4f320104acac74e253b61',
    deleted_at: 0,
    created_at: 1676997408,
    updated_at: 1687420484,
    data_source_id: 0,
    start_time: 1676997393,
    end_time: 1687420473,
    last_time: 1687420473,
    window_end: 1676999193,
    time_window: 30,
    incident_status: 'ok',
    incident_severity: 'critical',
    labels: {
      check: '司机接单量数据中断（日志链路中断）',
      cluster: 'Default',
    },
    corr_rule_id: '6281c5cfa7799303ddc4c7f3',
    tips: {
      metrics: ['司机实时接单量'],
    },
  },
];

const Event: React.FC = () => {
  return (
    <PageLayout title={'甘特图'}>
      <div
        style={{
          paddingLeft: 10,
        }}
      >
        <div className='event-container'>
          <Gantt
            collectionList={[
              { id: 1, name: '业务部', rows: mockData as GanttDataType[] },
              { id: 2, name: '运维部', rows: mockData1 as GanttDataType[] },
            ]}
            startTime={1687380404}
            endTime={1687423604}
            onLabelClick={(v) => {
              console.log(v);
              alert('该事件的状态是：' + v.incident_status);
            }}
          />
        </div>
      </div>
    </PageLayout>
  );
};
export default Event;
