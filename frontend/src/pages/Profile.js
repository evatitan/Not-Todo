import React, { Fragment } from 'react';
import { Helmet } from "react-helmet"
import Profile from '../components/auth/Profile';
function ProfilePage() {
	return (
		<Fragment>
			<Helmet>
				<title>Profile</title>
				<meta name="description" content="Profile" />
			</Helmet>
			<Profile />
		</Fragment>
	);
}

export default ProfilePage;
