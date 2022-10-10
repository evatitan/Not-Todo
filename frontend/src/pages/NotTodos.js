import { useSelector } from 'react-redux';
import NotTodoList from '../components/notTodos/NotTodoList';

function NotTodos() {
	const notTodos = useSelector((state) => state.notTodo.items);

	return <NotTodoList notTodos={notTodos} />;
}

export default NotTodos;
