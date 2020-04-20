import React, { Component } from 'react'

import { Layout } from 'antd';
import SideMenu from './SideMenu'
import TopHeader from './TopHeader'
import MainContent from './MainContent';
import './admin.less'
const { Sider, Footer } = Layout;

export default class Admin extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className='admin'>
        <Sider><SideMenu /></Sider>
        <Layout>
          <TopHeader />
          <MainContent />
          <Footer className='admin_footer'>React项目-后台管理系统</Footer>
        </Layout>
      </Layout>
    );
  }
}