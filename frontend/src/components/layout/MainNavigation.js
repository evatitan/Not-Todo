import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './MainNavigation.module.css';
// import { authActions } from '../../store/authSlice';
import { fetchData } from '../../store/notTodoSlice';
import { profile } from '../../store/authSlice';

function MainNavigation() {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const dispatch = useDispatch();

	return (
		<header className={classes.container}>
			<h2>Not-ToDo Sticky Wall</h2>
			<nav>
				<ul>
					<li>
						<NavLink to="/" activeclassname={classes.active}>
							Home
						</NavLink>
					</li>

					{isLoggedIn && (
						<li>
							<NavLink
								to="/not-todos"
								activeclassname={classes.active}
								onClick={() => {
									dispatch(fetchData());
								}}
							>
								All
							</NavLink>
						</li>
					)}

					{isLoggedIn && (
						<li>
							<NavLink to="/not-todos/new" activeclassname={classes.active}>
								Add
							</NavLink>
						</li>
					)}

					{!isLoggedIn && (
						<li>
							<NavLink to="/login" activeclassname={classes.active}>
								Login
							</NavLink>
						</li>
					)}

					{isLoggedIn && (
						<li
							onClick={() => {
								dispatch(profile());
							}}
						>
							<NavLink to="/profile" activeclassname={classes.active}>
								Profile
							</NavLink>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
