import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import Profile from '../components/auth/Profile';
function ProfilePage() {
	return (
		<Fragment>
			<MetaTags>
				<title>Profile</title>
				<meta name="description" content="Profile" />
			</MetaTags>
			<Profile />
		</Fragment>
	);
}

export default ProfilePage;
