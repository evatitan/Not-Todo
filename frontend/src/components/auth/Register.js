import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../store/authSlice';
import classes from './Register.module.css';

function Register() {
	const isLoading = useSelector((state) => state.auth.isLoading);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
		const newUser = {
			email: enteredEmail,
			password: enteredPassword
		};

		dispatch(register(newUser));
		navigate('/login');
	};

	const registerHtml = (
		<div className={classes.grid}>
			<div className={classes.card}>
				<h1>Register</h1>
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
						<button data-testid="create-account">Create Account</button>

						<Link to="/login">
							<button type="button" className={classes.toggle}>
								Login with existing account
							</button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);

	return (
		<React.Fragment>
			{isLoading && <p>Loading</p>}
			{!isLoading && registerHtml}
		</React.Fragment>
	);
}

export default Register;
