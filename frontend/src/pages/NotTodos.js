import React, { Fragment } from 'react';
import { Helmet } from "react-helmet"
import { useSelector } from 'react-redux';
import NotTodoList from '../components/notTodos/NotTodoList';

function NotTodos() {
	const notTodos = useSelector((state) => state.notTodo.items);

	return (
		<Fragment>
			<Helmet>
				<title>All NOT-TODOs</title>
				<meta name="description" content="All of your not-todo list" />
			</Helmet>
			<NotTodoList notTodos={notTodos} />
		</Fragment>
	);
}

export default NotTodos;
