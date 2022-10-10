import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from './NotTodoDetails.module.css';
import { fetchData } from '../../store/notTodoSlice';

function NotTodoDetails(props) {
	const dispatch = useDispatch();
	const { title, date, description } = props.notTodo;
	return (
		<div className={classes.card}>
			<div>
				<h2>
					<i>{title}</i>
				</h2>
				<h5>{date}</h5>
				<p>{description}</p>
			</div>
			<Link to="/notTodos">
				<button onClick={() => dispatch(fetchData())}>back</button>
			</Link>
		</div>
	);
}

export default NotTodoDetails;
