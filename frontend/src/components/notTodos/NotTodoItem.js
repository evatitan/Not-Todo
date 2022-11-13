import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { showData, removeData } from '../../store/notTodoSlice';

import classes from './NotTodoItem.module.css';

function NotTodoItem(props) {
	const isLoading = useSelector((state) => state.notTodo.isLoading);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { item: { title, date, description, id } } = props || {};
	console.log('title-----', title);
	const datePrint = date.slice(0, 10);

	const deleteItemHandler = () => {
		dispatch(removeData(props.item.id));
		navigate('/not-todos');
	};

	const notTodos = (
		<div className={classes.card} data-testid={'not-todo-items'}>
			<h2>
				<i> {title} </i>
			</h2>
			<h5>{datePrint}</h5>
			<p>{description}</p>
			<div className={classes.actions}>
				<button onClick={deleteItemHandler}>Delete</button>

				<Link to={`/not-todos/${id}`}>
					<button
						onClick={() => {
							dispatch(showData(id));
						}}
					>
						Detail
					</button>
				</Link>
			</div>
		</div>
	);

	return (
		<React.Fragment>
			{isLoading && <p>Loading</p>}
			{!isLoading && isLoggedIn && notTodos}
		</React.Fragment>
	);
}

export default NotTodoItem;
