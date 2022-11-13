import React, { useEffect, useState } from 'react';
import classes from './Notification.module.css';

const Notification = (props) => {
	const [ show, setShow ] = useState(true);
	const { title, message } = props;
	let specialClasses = '';

	if (title === 'error') {
		specialClasses = classes.error;
	}

	if (title === 'success') {
		specialClasses = classes.success;
	}

	const cssClasses = `${classes.notification} ${specialClasses}`;

	useEffect(
		() => {
			const timer = setTimeout(() => {
				setShow(false);
			}, 2500);

			return () => {
				clearTimeout(timer);
			};
		},
		[ show ]
	);

	return (
		<React.Fragment>
			{show && (
				<section className={cssClasses}>
					<h2>{title}</h2>
					<p>{message}</p>
				</section>
			)}
		</React.Fragment>
	);
};

export default Notification;
