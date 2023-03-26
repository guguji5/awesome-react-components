import React, { useState, ReactNode, Fragment } from 'react';
import { ExclamationCircleOutlined, DeleteOutlined, SettingOutlined, AlertOutlined, BranchesOutlined } from '@ant-design/icons';
import { Input, Radio, Modal, Tooltip } from 'antd';
import './index.less';

interface Props {
  data?: any;
  type: any;
  title?: string;
  children: ReactNode;
  hideSetting?: boolean;
  inGroup?: boolean;
  onSettingClick?: () => void;
  onDeleteClick?: () => void;
  onUnGroupClick?: () => void;
  listeners?: object;
  onAlertOpen?: () => void;
}

export default function OutfireBlock(props: Props) {
  const { data, title = '', children, onSettingClick, listeners, type, onDeleteClick, inGroup = false, onUnGroupClick, hideSetting = false, onAlertOpen } = props;

  return (
    <div className={type === 'both' ? 'outfire-block first-card' : 'outfire-block'}>
      <div className='outfire-block-header'>
        <Tooltip title={title}>
          <span {...listeners} style={{ flex: 1, cursor: 'move' }} className='ellipsis'>
            {title}
          </span>
        </Tooltip>
        <SettingOutlined />
        <DeleteOutlined style={{ marginLeft: 8 }} />
      </div>
      <div className='outfire-block-body'>{children}</div>
    </div>
  );
}
