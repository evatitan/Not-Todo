import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import { useSelector } from 'react-redux';
import NotTodoList from '../components/notTodos/NotTodoList';

function NotTodos() {
	const notTodos = useSelector((state) => state.notTodo.items);

	return (
		<Fragment>
			<MetaTags>
				<title>All NOT-TODOs</title>
				<meta name="description" content="All of your not-todo list" />
			</MetaTags>
			<NotTodoList notTodos={notTodos} />
		</Fragment>
	);
}

export default NotTodos;
