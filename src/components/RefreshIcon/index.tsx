import React, { useState } from 'react';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import IconFont from '../IconFont';

interface Props {
  size?: 'large' | 'middle' | 'small';
  onClick: () => void;
  className?: string;
}
export default function RefreshIcon(props: Props) {
  const { onClick, className, size } = props;
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const handleRefresh = (e) => {
    if (refreshing) return;
    setRefreshing(true);
    onClick();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  return <Button size={size} className={className || ''} loading={refreshing} onClick={handleRefresh} icon={<IconFont type='icon-Refresh' />}></Button>;
}
