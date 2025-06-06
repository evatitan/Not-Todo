import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { notTodoActions } from '../../store/notTodoSlice';
import { addData } from '../../store/notTodoSlice';

import classes from './NewNotTodoForm.module.css';

function NewNotTodoForm(props) {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const titleInputRef = useRef();
	const dateInputRef = useRef();
	const descriptionInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();
		let enteredTitle = titleInputRef.current.value;
		let enteredDate = dateInputRef.current.value;
		let enteredDescription = descriptionInputRef.current.value;

		const notTodoObj = {
			title: enteredTitle,
			date: enteredDate,
			description: enteredDescription
		};
		dispatch(addData(notTodoObj));
		navigate('/not-todos');
	};

	return (
		<React.Fragment>
			{isLoggedIn && (
				<div className={classes.grid}>
					<div className={classes.card}>
						<form className={classes.form}>
							<div className={classes.control}>
								<label htmlFor="title">Title</label>
								<input type="text" required id="title" ref={titleInputRef} />
							</div>

							<div className={classes.control}>
								<label htmlFor="date">Date</label>
								<input type="date" required id="date" ref={dateInputRef} />
							</div>
							<div className={classes.control}>
								<label htmlFor="description">Description</label>
								<textarea id="description" required rows="5" ref={descriptionInputRef} />
							</div>

							<div className={classes.actions}>
								<button onClick={submitHandler}> Add </button>
							</div>
						</form>
					</div>
				</div>
			)}
			{!isLoggedIn && <p>Please login first</p>}
		</React.Fragment>
	);
}

export default NewNotTodoForm;
