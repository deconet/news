import React from 'react';
import ReactDOM from 'react-dom';
import Routes from '../mainApp/routes';
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Routes />, document.getElementById('main-app'),
  )
});