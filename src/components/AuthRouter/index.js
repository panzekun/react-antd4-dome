// 路由鉴权
import React from 'react'
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

const AuthRouter = ({ component: Component, ...rest }) => {
  console.log(rest);
  const isLogged = rest.loginState;
  // const isLogged = true;
  return <Route {...rest} render={props => (isLogged ? <Component {...props} /> : <Redirect to={'/login'} />)} />;
};

// 创建映射函数读取redux中保存用户登录状态
const mapStateToProps = (state) => {
  console.log(state);
  return {
    loginState: state.userModule.loginState
  }
}


export default connect(mapStateToProps)(withRouter(AuthRouter))
// export default connect(mapStateToProps)(AuthRouter)