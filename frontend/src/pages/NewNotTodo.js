import React, { Fragment } from 'react';
import { Helmet } from "react-helmet"
import NewNotTodoForm from '../components/notTodos/NewNotTodoForm';

function NewNotTodo() {
	return (
		<Fragment>
			<Helmet>
				<title>Add a NOT-TODO</title>
				<meta name="description" content="Add a new not-todo from here" />
			</Helmet>
			<NewNotTodoForm />
		</Fragment>
	);
}

export default NewNotTodo;
