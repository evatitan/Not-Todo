import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import { useSelector } from 'react-redux';
import NotTodoDetails from '../components/notTodos/NotTodoDetails';

function NotTodoDetail() {
	const notTodo = useSelector((state) => state.notTodo.items[0]);
	return (
		<Fragment>
			<MetaTags>
				<title>{notTodo.title}</title>
				<meta name="description" content={notTodo.description} />
			</MetaTags>
			<NotTodoDetails notTodo={notTodo} />
		</Fragment>
	);
}

export default NotTodoDetail;
