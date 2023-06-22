import React, { Fragment } from 'react';
import Gantt from './pages/index';
export default {
  routes: [
    {
      path: '/gantt',
      component: Gantt,
      exact: true,
    },
  ],
};
