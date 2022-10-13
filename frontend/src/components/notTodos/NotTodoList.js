import React from 'react';
import NotTodoItem from './NotTodoItem';
import classes from './NotTodoList.module.css';

function NotTodoList(props) {
	const hasItem = props.notTodos;
	console.log('hasItem----', hasItem);
	return (
		<React.Fragment>
			{hasItem.length === 0 && <p>You got {hasItem.length} not-todos</p>}
			{hasItem.length !== 0 && (
				<div className={classes.grid}>
					{props.notTodos.map((item) => <NotTodoItem key={item.id} item={item} />)}
				</div>
			)}
		</React.Fragment>
	);
}

export default NotTodoList;
