import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { showData, removeData } from '../../store/notTodoSlice';


import classes from './NotTodoItem.module.css';

function NotTodoItem(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const deleteItemHandler = () => {
		dispatch(removeData(props.item.id));
		navigate('/notTodos');
	};

	return (
		<div className={classes.card}>
			<h2>
				<i> {props.item.title} </i>
			</h2>
			<h5>{props.item.date}</h5>
			<p>{props.item.description}</p>
			<div className={classes.actions}>
				<button onClick={deleteItemHandler}>Delete</button>

				<Link to={`/notTodos/${props.item.id}`}>
					<button
						onClick={() => {
							dispatch(showData(props.item.id));
						}}
					>
						Detail
					</button>
				</Link>
			</div>
		</div>
	);
}

export default NotTodoItem;
