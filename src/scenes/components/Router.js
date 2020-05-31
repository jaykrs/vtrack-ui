/* eslint-disable prettier/prettier */
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import React from 'react';
import Video from './Video';
import Home from './Home';

const RouterComponent = () => (
	<Router>
		<Scene>
			<Scene key="home" component={Home} title="Thought PF Video Call"  type={ActionConst.RESET} hideNavBar={true} />
			<Scene key="video" component={Video} title="Video Feed" initial type={ActionConst.RESET} hideNavBar={true} />
		</Scene>
	</Router>
);

export default RouterComponent;
