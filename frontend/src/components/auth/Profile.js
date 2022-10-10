import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import classes from './Profile.module.css';

function Profile() {
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<div className={classes.grid}>
			<div className={classes.card}>
				<h1>welcome</h1>
				<h2> {user.email}</h2>

				<div className={classes.actions}>
					<button onClick={logoutHandler}>Logout</button>
				</div>
			</div>
		</div>
	);
}

export default Profile;
