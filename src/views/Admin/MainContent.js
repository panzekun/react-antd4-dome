import React, { Suspense } from 'react';
import { Redirect, withRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { routes } from '../../routers/router';
const { Content } = Layout;

const MainContent = () => {
  return (
    <Content className='admin_content'>

      <Switch>
        {routes.map(ele => <Route render={() => <ele.component />} key={ele.path} path={ele.path} />)}
        <Redirect from="/" exact to="/home" />
        <Redirect to="/404" />
      </Switch>
    </Content>
  )
}

export default withRouter(MainContent);