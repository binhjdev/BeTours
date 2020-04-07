import React from 'react';
import { Route, Switch } from 'react-router-dom';
import home from '../home/home';
import signup from '../user/signup';
import login from '../user/login';

const MainRouter = () => (
	<Switch>
		<Route exact path="/" component={home} />
		<Route exact path="/signup" component={signup} />
		<Route exact path="/login" component={login} />
	</Switch>
);

export default MainRouter;