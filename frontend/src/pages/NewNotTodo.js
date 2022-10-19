import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import NewNotTodoForm from '../components/notTodos/NewNotTodoForm';

function NewNotTodo() {
	return (
		<Fragment>
			<MetaTags>
				<title>Add a NOT-TODO</title>
				<meta name="description" content="Add a new not-todo from here" />
			</MetaTags>
			<NewNotTodoForm />
		</Fragment>
	);
}

export default NewNotTodo;
