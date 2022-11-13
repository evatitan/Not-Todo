import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './NotTodoDetails.module.css';
import { fetchData } from '../../store/notTodoSlice';

function NotTodoDetails(props) {
	const isLoading = useSelector((state) => state.notTodo.isLoading);
	const dispatch = useDispatch();
	const { title, date, description } = props.notTodo;
	const datePrint = date.slice(0, 10);

	return (
		<React.Fragment>
			{isLoading && <p>Loading</p>}
			{!isLoading && (
				<div className={classes.card}>
					<div>
						<h2>
							<i>{title}</i>
						</h2>
						<h5>{datePrint}</h5>
						<p>{description}</p>
					</div>
					<Link to="/not-todos">
						<button onClick={() => dispatch(fetchData())}>back</button>
					</Link>
				</div>
			)}
		</React.Fragment>
	);
}

export default NotTodoDetails;
