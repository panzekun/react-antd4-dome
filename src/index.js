import React from 'react';
import ReactDOM from 'react-dom';
// 1.3 引入Provider组件,在里面注入store
import store from './store'
import { Provider } from 'react-redux'
import App from './App';

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));


