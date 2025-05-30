import React, { Fragment } from 'react';
import { Helmet } from "react-helmet"
import Home from '../components/home/Home';

function HomePage() {
	return (
		<Fragment>
			<Helmet>
				<title>HOME</title>
				<meta name="description" content="NOT-TODOs home" />
			</Helmet>
			<Home />
		</Fragment>
	);
}

export default HomePage;
