import React, { Fragment } from 'react';

import { Helmet } from "react-helmet"
import Register from '../components/auth/Register';

function RegisterPage() {
	return (
		<Fragment>
			<Helmet>
				<title>Profile</title>
				<meta name="description" content="Profile" />
			</Helmet>
			<Register />
		</Fragment>
	);
}

export default RegisterPage;
