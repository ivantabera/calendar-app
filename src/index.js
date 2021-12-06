import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CalendarApp } from './CalendarApp';

import './styles.css';

console.log(process.env)

ReactDOM.render(
    <CalendarApp />,
  document.getElementById('root')
);