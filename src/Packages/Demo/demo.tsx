import React, { useState } from 'react';
import { Button, Modal, Collapse, Space, Row } from 'antd';
const { Panel } = Collapse;
import PageLayout from '@/components/pageLayout';
import RadioButtonWithDropdown from '@/components/RadioButtonWithDropdown';
import TimeRangePicker, { IRawTimeRange, TimeRangePickerWithRefresh, parseRange } from '@/components/TimeRangePicker';
import { AlipaySquareFilled, TaobaoCircleFilled } from '@ant-design/icons';
import BreadCrumb from '@/components/BreadCrumb';
import ScrollNum from '@/components/ScrollNum';
import CaptchaWithImage from '@/components/CaptchaWithImage';
import PptFlipEffect from '@/components/PptFlipEffect';
import './index.less';
import FeatureTips from '@/components/FeatureTips';
const mockVal = (str: string, repeat: number = 1) => ({
  value: str.repeat(repeat),
});

function randomColor() {
  var color = 'rgb(';
  for (var i = 0; i < 3; i++) color += (Math.random() * 256).toFixed(0) + ',';
  //去除最后一个逗号
  // color=color.slice(0,-1)
  color = color.substring(0, color.length - 1) + ')';
  return color;
}

export default function Demo() {
  const [num, setNum] = useState(18);
  const [radioValue, setRadioValue] = useState('1');
  const marks = {
    0: '2h',
    50: {
      style: {
        color: '#f50',
      },
      label: <strong>1.5h</strong>,
    },
    75: {
      style: {
        color: 'green',
      },
      label: <strong>0,5h</strong>,
    },
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>now</strong>,
    },
  };

  return (
    <PageLayout title={'Awesome React Components'}>
      <div>
        <Collapse accordion>
          <Panel header='滚动数字效果' key='ScrollNum'>
            <Row>
              <Space>
                <ScrollNum value={num} height={36} />
                <Button onClick={() => setNum(Number((Math.random() * 10).toFixed(0)))} size='small'>
                  换
                </Button>
              </Space>
            </Row>
          </Panel>

          <Panel header='新feature提示' key='new-feature-tips'>
            <Space>
              <FeatureTips
                enable
                id='demo'
                introduction='通过对业务的系统级核心指标采集、计算、判断、标记来发现和收敛“IT系统”的异常范围、异常程度，并关联故障定位的各个渠道，引导用户完成故障定位。是继北极星发现故障之后，故障定位环节的入口。'
              >
                <Button type='primary'>New Feature</Button>
              </FeatureTips>
            </Space>
          </Panel>
          <Panel header='一个dropdown与button混排的按钮组' key='RadioButtonWithDropdown'>
            <Space>
              <RadioButtonWithDropdown
                value={radioValue}
                onChange={(e) => {
                  setRadioValue(e.target.value);
                }}
                items={[
                  {
                    key: '2',
                    title: '爱好',
                    children: [
                      { key: '22', label: '游泳' },
                      { key: '33', label: '网球' },
                      { key: '44', label: '羽毛球' },
                    ],
                  },
                  { key: '1', label: '技能' },
                ]}
                onKeyChange={(v) => console.log(v)}
              />
            </Space>
          </Panel>
          <Panel header='Date Range Picker' key='data-range-picker'>
            <TimeRangePicker
              onChange={(val) => {
                console.log(parseRange(val));
              }}
            />
          </Panel>
          <Panel header='面包屑' key='bread-crumb'>
            <BreadCrumb crumbs={[{ text: '一级标题', link: '/status-card' }, { text: '二级标题' }]} />
          </Panel>
          <Panel header='图形验证码' key='captcha'>
            <div style={{ height: 200, position: 'relative', width: 300 }}>
              <CaptchaWithImage destinationField='demo' available={true} />
            </div>
          </Panel>
          <Panel header='流程图的动态连接线' key='light-beam'>
            <div style={{ display: 'flex' }}>
              <AlipaySquareFilled style={{ fontSize: 30 }} />
              <img src='/image/light-beam.svg' alt='light-beam' style={{ margin: '15px 0' }} />
              <TaobaoCircleFilled style={{ fontSize: 30, alignSelf: 'self-end' }} />
            </div>
          </Panel>
          <Panel header='PPT翻页效果' key='ppt-flip-effect'>
            <p>类似轮播图。fade_in, slide_from_left, flip, grow, shrink等几个效果，每5秒切换</p>
            <PptFlipEffect />
          </Panel>
        </Collapse>
      </div>
    </PageLayout>
  );
}
