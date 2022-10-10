import { useSelector } from 'react-redux';
import NotTodoDetails from '../components/notTodos/NotTodoDetails';

function NotTodoDetail() {
	const notTodo = useSelector((state) => state.notTodo.items[0]);

	return <NotTodoDetails notTodo={notTodo} />;
}

export default NotTodoDetail;
