import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import Register from '../components/auth/Register';

function RegisterPage() {
	return (
		<Fragment>
			<MetaTags>
				<title>Register</title>
				<meta name="description" content="Register" />
			</MetaTags>
			<Register />
		</Fragment>
	);
}

export default RegisterPage;
