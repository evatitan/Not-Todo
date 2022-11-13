import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import Login from '../components/auth/Login';

function LoginPage() {
	return (
		<Fragment>
			<MetaTags>
				<title>Login</title>
				<meta name="description" content="Login your not-todo app" />
			</MetaTags>
			<Login />
		</Fragment>
	);
}

export default LoginPage;
