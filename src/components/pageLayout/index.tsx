import React, { useState, ReactNode, useReducer } from 'react';
import './index.less';
import { RollbackOutlined } from '@ant-design/icons';
interface IPageLayoutProps {
  icon?: ReactNode;
  title?: String | JSX.Element;
  children?: ReactNode;
  rightArea?: ReactNode;
  introIcon?: ReactNode;
  customArea?: ReactNode;
  showBack?: Boolean;
  headStyle?: React.CSSProperties;
  docFn?: Function;
}

const PageLayout: React.FC<IPageLayoutProps> = ({ icon, title, rightArea, children, introIcon, customArea, showBack, headStyle, docFn }) => {
  return (
    <div className={'page-wrapper'}>
      {customArea ? (
        <div className={'page-top-header'}>{customArea}</div>
      ) : (
        <div className={'page-top-header'} style={headStyle}>
          <div className={'page-header-content'}>
            <div className={'page-header-title'}>
              {showBack && (
                <RollbackOutlined
                  onClick={() => window.history.back()}
                  style={{
                    marginRight: '5px',
                  }}
                />
              )}
              {icon}
              {title}
            </div>
            <div className={'page-header-right-area'}>
              <span className='avator' onClick={() => window.open('https://github.com/guguji5/awesome-react-components', '_blank')}>
                <img src={'/image/github.png'} alt='' />
              </span>
            </div>
          </div>
        </div>
      )}
      {children && children}
    </div>
  );
};

export default PageLayout;
