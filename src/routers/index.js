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