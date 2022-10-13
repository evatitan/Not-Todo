import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/authSlice';
// import { authActions } from '../../store/authSlice';
import classes from './Login.module.css';

function Login(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		const user = {
			email: enteredEmail,
			password: enteredPassword
		};
		dispatch(login(user));
		navigate('/');
	};

	return (
		<div className={classes.grid}>
			<div className={classes.card}>
				<h1>Login</h1>
				<form className={classes.form} onSubmit={submitHandler}>
					<div className={classes.control}>
						<label htmlFor="email">Email</label>
						<input type="email" required id="email" ref={emailInputRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor="password">Password</label>
						<input type="password" required id="password" ref={passwordInputRef} />
					</div>
					<div className={classes.actions}>
						<button>Login</button>
						<Link to="/register">
							<button type="button" className={classes.toggle}>
								Create new Account
							</button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
