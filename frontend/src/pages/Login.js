import React, { Fragment } from 'react';
import { Helmet } from "react-helmet"
import Login from '../components/auth/Login';

function LoginPage() {
	return (
		<Fragment>
			<Helmet>
				<title>Login</title>
				<meta name="description" content="Login your not-todo app" />
			</Helmet>
			<Login />
		</Fragment>
	);
}

export default LoginPage;
