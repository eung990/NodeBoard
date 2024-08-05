import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import { thunk } from 'redux-thunk';
import Reducer from './_reducers'
import './App.css';
import 'antd/dist/reset.css';

// 미들웨어(promiseMiddleware, thunk)와 함께 설정되어 있어 비동기 작업 처리 가능
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk)(createStore)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
    // Redux 중앙 저장소 애플리케이션 전체 상태를 보관
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>
);

// Service Worker 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/pwabuilder-sw.js')
      .then(registration => {
        console.log('Service Worker registered: ', registration);
      })
      .catch(registrationError => {
        console.log('Service Worker registration failed: ', registrationError);
      });
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();