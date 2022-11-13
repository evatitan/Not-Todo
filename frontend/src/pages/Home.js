import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import Home from '../components/home/Home';

function HomePage() {
	return (
		<Fragment>
			<MetaTags>
				<title>HOME</title>
				<meta name="description" content="NOT-TODOs home" />
			</MetaTags>
			<Home />
		</Fragment>
	);
}

export default HomePage;
