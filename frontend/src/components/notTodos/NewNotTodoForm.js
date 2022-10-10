import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { notTodoActions } from '../../store/notTodoSlice';
import { addData } from '../../store/notTodoSlice';

import classes from './NewNotTodoForm.module.css';

function NewNotTodoForm(props) {
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
		navigate('/notTodos');
	};

	return (
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
	);
}

export default NewNotTodoForm;
