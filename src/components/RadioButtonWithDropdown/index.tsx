import React, { useState, HTMLAttributes } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Radio, RadioChangeEvent, Dropdown, Menu, MenuProps } from 'antd';
import './index.less';

export interface IButton {
  key: string;
  label: string;
}

export interface IDropdown {
  title: string;
  key: string;
  children: IButton[];
}

export type IRadioGroupsItem = (IButton | IDropdown)[];

interface Props {
  items: IRadioGroupsItem;
  onChange: (e: RadioChangeEvent) => void;
  value?: any;
  style?: any;
  onKeyChange: (keypath: number[]) => void;
}

export const isButton = (item: IButton | IDropdown): boolean => {
  return !!item['label'];
};

export const isDropdown = (item: IButton | IDropdown): boolean => {
  return !!item['children'];
};

export default function RadioButtonWithDropdown(props: Props) {
  const { items, onChange, value, style = {}, onKeyChange } = props;

  const renderDropdown = (item: IDropdown, i: number) => {
    const menu = (
      <Menu
        onClick={({ keyPath }) => {
          // @ts-ignore
          //TODO
          onChange({ target: { value: items[i].key } });
          onKeyChange([i, ...keyPath.map((key) => Number(key))]);
        }}
      >
        {item.children.map((i, index) => (
          <Menu.Item key={index}>{i.label}</Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Dropdown key={item.key} trigger={['click']} overlay={menu}>
        <Radio.Button value={item.key} key={item.key}>
          {item.title}
        </Radio.Button>
      </Dropdown>
    );
  };

  const handleChange = (e) => {
    const cur: IButton | IDropdown | undefined = items.find((item) => item.key === e.target.value);
    if (cur && isButton(cur)) {
      const i = items.findIndex((item) => item.key === e.target.value);
      onKeyChange([i]);
      onChange(e);
    }
  };
  return (
    <div className='radio-button-with-dropdown'>
      <Radio.Group onChange={handleChange} value={value} style={{ height: 28, ...style }}>
        {items.map((item, i) =>
          isButton(item) ? (
            <Radio.Button value={(item as IButton).key} key={(item as IButton).key}>
              {(item as IButton).label}
            </Radio.Button>
          ) : isDropdown(item) ? (
            renderDropdown(item as IDropdown, i)
          ) : null,
        )}
      </Radio.Group>
    </div>
  );
}
