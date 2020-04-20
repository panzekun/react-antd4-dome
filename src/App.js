import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Admin from '@v/Admin'
import Login from '@v/Login'
import AuthRouter from '@c/AuthRouter';
import './assets/style/base.less'

function App(props) {
  window.onbeforeunload = (e) => {
    console.log(props);
    sessionStorage.setItem('store', JSON.stringify(props.state));
  };
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <AuthRouter path='/' component={Admin}></AuthRouter>
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}
// 创建映射函数读取redux中保存用户登录状态
const mapStateToProps = (state) => {
  console.log(state);
  return {
    state
  }
}

// export default App;
export default connect(mapStateToProps)(App)
