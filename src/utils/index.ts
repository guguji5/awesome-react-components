import { message } from 'antd';
import _ from 'lodash';
import React, { ReactNode, Component } from 'react';

export const isPromise = (obj) => {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};

export const download = function (stringList: Array<string>, name: string = 'download.txt') {
  const element = document.createElement('a');
  const file = new Blob([stringList.join('\r\n')], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = name;
  document.body.appendChild(element);
  element.click();
};

export const copy2ClipBoard = (text: string, silent = false): boolean => {
  const fakeElem = document.createElement('textarea');
  fakeElem.style.border = '0';
  fakeElem.style.padding = '0';
  fakeElem.style.margin = '0';
  fakeElem.style.position = 'absolute';
  fakeElem.style.left = '-9999px';
  const yPosition = window.pageYOffset || document.documentElement.scrollTop;
  fakeElem.style.top = `${yPosition}px`;
  fakeElem.setAttribute('readonly', '');
  fakeElem.value = text;

  document.body.appendChild(fakeElem);
  fakeElem.select();
  let succeeded;
  try {
    succeeded = document.execCommand('copy');
    !silent && message.success('复制到剪贴板');
  } catch (err) {
    message.error('复制失败');
    succeeded = false;
  }
  if (succeeded) {
    document.body.removeChild(fakeElem);
  }
  return succeeded;
};

interface Route {
  path: string;
  component: JSX.Element | Component;
}
export interface Entry {
  menu?: {
    weight?: number;
    content: ReactNode;
  };
  routes: Route[];
  module?: any;
}

export const dynamicPackages = (): Entry[] => {
  const Packages = import.meta.globEager('../Packages/*/entry.tsx');
  return Object.values(Packages).map((obj) => obj.default);
};
