import React, { FC, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BankOutlined } from '@ant-design/icons';
import './menu.less';
import { FloatFcMenu } from '@fc-components/menu';
import IconFont from '@/components/IconFont';
import Icon from '@ant-design/icons';
import Menu_Search from '../../../public/image//menu-hover/Menu_Search.svg';
import { dynamicPackages, Entry } from '@/utils';

const Packages = dynamicPackages();
let lazyMenu = Packages.reduce((result: any, module: Entry) => {
  const menu = module.menu;
  return menu ? (result = result.concat(menu)) : result;
}, []);

const SideMenu: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<'0' | '1' | '2' | string | null>('2');
  // full => '0'
  // semi => '1'
  // skim => '2'

  const switchCollapsed = () => {
    if (!isNaN(Number(collapsed))) {
      const newColl = (Number(collapsed) === 2 ? -1 : Number(collapsed)) + 1 + '';
      setCollapsed(newColl);
      localStorage.setItem('menuCollapsed', newColl);
    } else {
      setCollapsed('1');
      localStorage.setItem('menuCollapsed', '1');
    }
  };

  const handleClick = (key) => {
    // 写两个key as string 感觉有点傻
    if ((key as string).startsWith('https')) {
      window.open(key, '_blank');
    } else if ((key as string).startsWith('/')) {
      history.push(key as string);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0 10px 10px' }}>
      {collapsed !== '2' && (
        <div className={`home ${collapsed === '1' ? 'collapse' : ''}`}>
          <div className='name' key='overview'>
            <img src='/image/react.svg' alt='' className='logo' />
            {collapsed === '0' && <span style={{ color: '#fff' }}>Components</span>}
          </div>
        </div>
      )}
      <FloatFcMenu
        items={lazyMenu
          .sort((a, b) => b.weight - a.weight)
          .map((item) => item.content)
          .concat([
            {
              key: '/demo',
              icon: <BankOutlined />,
              label: 'Overview',
            },
            {
              key: '/status-card',
              icon: <IconFont type='icon-maodian' />,
              label: '状态卡片',
            },
            {
              key: '/link',
              icon: <IconFont type='icon-maodian' />,
              label: '外链',
              children: [
                {
                  key: 'https://github.com/guguji5',
                  label: 'Github',
                },
                {
                  key: 'https://twitter.com/kuandu6',
                  label: 'Twitter',
                },
              ],
            },
          ])}
        onClick={handleClick}
        collapsed={collapsed}
        defaultSelectedKeys={['/demo']}
        switchCollapsed={switchCollapsed}
        quickIcon={<IconFont type='icon-Menu_Search' />}
        quickActiveIcon={<Icon component={Menu_Search as any} />}
      />
    </div>
  );
};

export default SideMenu;
