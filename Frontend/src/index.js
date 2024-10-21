import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './components/teacherComponents/redux/store';
import $ from 'jquery';
import './i18n';
// Move window assignments after all import statements
window.$ = $;
window.jQuery = $;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
