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
        {/* <header className='login-header'><h2>React项目-后台管理系统</h2></header> */}
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