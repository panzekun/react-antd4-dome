React-shop-dome

## 项目初始化

#### 1、react脚手架

```
    create-react-app react-shop-dome
```

删除多于文件src留下App.js以及index.js，并把对应引入删掉![1586584971958](../../../../AppData/Roaming/Typora/typora-user-images/1586584971958.png)

#### 2、引入antd和antd-mobile

1.下载依赖包

```
npm install antd antd-mobile -S
```

2.实现按需加载

```
npm install babel-plugin-import react-app-rewired customize-cra --dev
```

修改package.json

```
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

在项目的根目录下创建一个 config-overrides.js 用于修改默认配置

```
// 实现antd /ant-mobile的按需引入
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('pc', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  fixBabelImports('mobile', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: 'css',
  }),
);
```

#### 3、自定义主题

```
npm install less less-loader -D
```

然后修改 config-overrides.js 配置

```
const { override, fixBabelImports, addWebpackAlias, addLessLoader } = require('customize-cra');
const path = require("path");
module.exports = override(
  // 实现antd /ant-mobile的按需引入

  fixBabelImports('pc', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css',
    style: true, //主题才能生效
  }),
  // fixBabelImports('mobile', {
  //   libraryName: 'antd-mobile',
  //   libraryDirectory: 'es',
  //   style: 'css',
  // }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
  //别名配置
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "./src"),
    ["@v"]: path.resolve(__dirname, "./src/views"),
    ["@c"]: path.resolve(__dirname, "./src/components")
  })
);
```

#### 4、配置路由

App.js

```
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Admin from '@v/Admin'
import Login from '@v/Login';
import './assets/style/base.less'
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Admin}></Route>
        <Route path='/login' component={Login}></Route>
      </Switch>
    </Router>
  );
}

export default App;
```

#### 5、登录页

```
import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import api from '../../api/index.js'
export default class Login extends Component {
  // 校验通过才执行
  onFinish = values => {
    console.log('获取form表单的数据: ', values);
    api.login({
      "username": "admin",
      "password": "123456"
    }).then(res => {
      console.log(res);
      // 跳转到管理界面 不需要回退用replace
      this.props.history.replace('/')
    })
  };
  render() {
    return (
      <div className="login">
        <header className='login-header'><h2>React项目-后台管理系统</h2></header>
        <section className='login-content'>
          <h3>用户登录</h3>
          <Form
            name="normal_login"
            className="login-form"
            // 表单默认值
            initialValues={{
              remember: true,
              username:'admin',
              password:'123456',
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              validateFirst='true'
              rules={[
                {
                  // 必填
                  required: true,
                  // 校验错误，就不会继续往下校验
                  whitespace: true,
                  message: '请输入用户名',
                },
                {
                  min: 4,
                  message: '用户名最少4位',
                },
                {
                  max: 12,
                  message: '用户名最多12位',
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '用户名必须是英文、数字或下划线组成',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}


```

#### 6、发送请求（axios）

​	1.src目录下创建api文件夹

​	2.api 创建一个request.js 以及index.js

request.js 

```
import axios from 'axios';
import { message } from 'antd';
const $axios = axios.create({
  // baseURL: process.env.xxxx,
  timeout: 6000,
  retry: 4,
  retryDelay: 1000
});

//请求拦截
$axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 通过reudx的store拿到拿到全局状态树的token ，添加到请求报文，后台会根据该报文返回status
    // 此处应根据具体业务写token
    // const token = store.getState().user.token || localStorage.getItem('token');
    const token = 'FA2019';
    config.headers['X-Token'] = token;
    console.log(config)
    return config;
  },
  error => {
    // 对请求错误做些什么
    message.error(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
$axios.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    console.log(error.response) // for debug
    //  对请求失败的HTTP状态码做处理
    message.error('请求失败');
    return Promise.reject(error)
  }
);

// 输出方法
export default function request(url, data = {}, method = 'POST') {
  return new Promise((resolve, reject) => {

    const options = method === 'POST' ? {
      url,
      method,
      data
    } : {
        url,
        method,
        params: data
      }
    $axios(options)
      .then(res => {
        const {data}= {...res}
        console.log('返回数据', res)
        if (data.code !== 0) {
          message.error(data.msg);
        } else {
          resolve(data.data)
        }

      })
      .catch(error => {
        reject()
        console.error(error)
      })
  })
}

```

index.js

```
import request from './request'

const api = {
  // 登录
  login(data) {
    return request('/admin/login/login', data)
  }
}
export default api
```



#### 7、redux使用

```
npm i redux -S
```

##### redux思路

大体思路：先创建store  --->  注入store到应用程序  -->  组件获取store中state数据

1.创建store

```
1. 需要从redux中引入createStore方法，创建store容器对象。
2. 因为createStore需要传递参数：reducers和中间件（暂且不考虑），所以需要创建reducers函数
3. 创建reducers函数，它包含两个参数：state 和 action。这个函数必须return一个全新的state
4. 将创建成功的reducers函数放进createStore方法中
----------------------------------------------------------
src/store/index.js

// applyMiddleware方法用于使用中间件
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
//  利用createStore方法创建store容器对象
let store = createStore(rootReducer)
export default store

------------------------------------------------------------------

src/store/reducers/index.js

// 引入combineReducers方法，用于合并多个reducer成为一个rootReducer
import { combineReducers } from 'redux'

import { userReducer } from './userReducer'

let rootReducer = combineReducers({
  userModule: userReducer
})

export default rootReducer

-----------------------------------------------------------------------

src/store/reducers/userReducer.js

let initState = {
  loginState: false // 默认用户登录状态为false
}

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_LOGIN_STATE':
      return {...state, loginState: action.payload}
  
    default:
      return state
  }
}

```

##### React 和 Redux连接

index.js

```
import React from 'react';
import ReactDOM from 'react-dom';
// 1.3 引入Provider组件,在里面注入store
import { Provider } from 'react-redux'
import store from './store'

import App from './App';

ReactDOM.render(<Provider store={store}>
  <App />
```

##### 其他组件如何调用redux中的state或者触发reducer函数呢

```
import {connect} from "react-redux";

// 使用 connect() 前，需要先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中
const mapStateToProps = (state) => {
  return {
    user: state.userModule
  };
};

// 除了读取 state，容器组件还能分发 action。类似的方式，可以定义 mapDispatchToProps() 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch({
                type: "SET_NAME",
                payload: name
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// 接下来，可以通过this.props.user.name获取state中的name值
// 通过this.props.etName('xxx')触发一个reducer
```



#### 8、路由鉴权

component中创建AuthRouter高阶组件

```
// 路由鉴权
import React from 'react'
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

const AuthRouter = ({ component: Component, ...rest }) => {
  // console.log(rest);
  const isLogged = rest.loginState;
  return <Route {...rest} render={props => (isLogged ? <Component {...props} /> : <Redirect to={'/login'} />)} />;
};

// 创建映射函数读取redux中保存用户登录状态
const mapStateToProps = (state) => {
  return {
    loginState: state.userModule.loginState
  }
}


export default connect(mapStateToProps)(withRouter(AuthRouter))
// export default connect(mapStateToProps)(AuthRouter)
```

src中创建routers 文件管理路由并引入AuthRouter

```
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from '@/views/Login';
import Layout from '@/views/Layout';
import AuthRouter from '@c/AuthRouter';
const Router = () => {
	return (
		<HashRouter>
			<Switch>
				<Route component={Login} exact path="/login" />
				<AuthRouter path="/" component={Layout} />
			</Switch>
		</HashRouter>
	);
};

export default Router;
```

修改App.js

```
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from '@v/Admin'
import Login from '@v/Login'
import AuthRouter from '@c/AuthRouter';
import './assets/style/base.less'
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <AuthRouter path='/' component={Admin}></AuthRouter>
      </Switch>
    </Router>
  );
}

export default App;

```

登录页中登录成功通过派发action修改redux中用户模块userReducer中的登录状态

Login.js修改为

```
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import api from '../../api/index.js'
class Login extends Component {
  // 校验通过才执行
  onFinish = values => {
    console.log('获取form表单的数据: ', values);
    api.login({
      "username": values.username,
      "password": values.password
    }).then(res => {
      console.log(res);
      message.success('登录成功',2).then(() => {
        // 修改登录状态
        this.props.changeLoginState(true)
        // 跳转到对应页面 不需要回退用replace
        let { from } = this.props.location.state || { from: { pathname: "/" } }
        this.props.history.replace(from.pathname)
      });


    })
  };
  render() {
    return (
      <div className="login">
        <header className='login-header'><h2>React项目-后台管理系统</h2></header>
        <section className='login-content'>
          <h3>用户登录</h3>
          <Form
            name="normal_login"
            className="login-form"
            // 表单默认值
            initialValues={{
              remember: true,
              username: 'admin',
              password: '123456',
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              validateFirst='true'
              rules={[
                {
                  // 必填
                  required: true,
                  // 校验错误，就不会继续往下校验
                  whitespace: true,
                  message: '请输入用户名',
                },
                {
                  min: 4,
                  message: '用户名最少4位',
                },
                {
                  max: 12,
                  message: '用户名最多12位',
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '用户名必须是英文、数字或下划线组成',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

// 创建映射函数，提交action
const mapActionToProps = (dispatch) => {
  return {
    changeLoginState: (newState) => {
      dispatch({ type: 'CHANGE_LOGIN_STATE', payload: newState })
    }
  }
}

export default connect(null, mapActionToProps)(Login)
```

#### 9、redux持久化(sessionStorage实现)

App.js 添加刷新前的事件保存redux数据到本地

```
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

```

创建store实例的时候把本地存储的数据加入createStore函数中

```
// applyMiddleware方法用于使用中间件
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
const initialState = sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')) : {}
console.log(initialState);
// 1.1 利用createStore方法创建store容器对象
let store = createStore(rootReducer, initialState)
sessionStorage.removeItem('store')
export default store
```

