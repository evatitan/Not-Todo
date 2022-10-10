import NotTodoItem from './NotTodoItem';
import classes from './NotTodoList.module.css';

function NotTodoList(props) {
	return (
		<div className={classes.grid}>{props.notTodos.map((item) => <NotTodoItem key={item.id} item={item} />)}</div>
	);
}

export default NotTodoList;
