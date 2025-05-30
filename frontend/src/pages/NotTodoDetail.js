import React, { Fragment } from 'react';
import { Helmet } from "react-helmet"
import { useSelector } from 'react-redux';
import NotTodoDetails from '../components/notTodos/NotTodoDetails';

function NotTodoDetail() {
	const notTodo = useSelector((state) => state.notTodo.items[0]);
	return (
		<Fragment>
			<Helmet>
				<title>{notTodo.title}</title>
				<meta name="description" content={notTodo.description} />
			</Helmet>
			<NotTodoDetails notTodo={notTodo} />
		</Fragment>
	);
}

export default NotTodoDetail;
