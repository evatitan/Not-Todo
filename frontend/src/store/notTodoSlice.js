import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './uiSlice';

const initialState = {
	items: [],
	changed: false
};

const notTodoSlice = createSlice({
	name: 'notTodo',
	initialState,
	reducers: {
		replaceNotTodo: (state, action) => {
			state.items = action.payload.items;
		}
	}
});

export const fetchData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch('/notTodos');
			if (!response.ok) {
				throw new Error('Could not fetch not-to-do!');
			}
			const data = await response.json();
			return data;
		};

		try {
			const notTodoData = await fetchData();
			dispatch(
				notTodoActions.replaceNotTodo({
					items: notTodoData || []
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					title: 'error',
					message: 'Fetching not-to-dos failed!'
				})
			);
		}
	};
};

export const showData = (id) => {
	return async (dispatch) => {
		const showData = async () => {
			const response = await fetch(`/notTodos/${id}`);
			if (!response.ok) {
				throw new Error('Could not fetch not-to-do!');
			}
			const data = await response.json();
			return data;
		};
		try {
			const notTodoData = await showData();
			dispatch(
				notTodoActions.replaceNotTodo({
					items: [ { ...notTodoData } ] || []
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					title: 'error',
					message: 'Fetching not-to-do failed!'
				})
			);
		}
	};
};

export const addData = (notTodoObj) => {
	return async (dispatch) => {
		const addData = async () => {
			const response = await fetch(`/new-notTodo`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(notTodoObj)
			});
			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message);
			}
			const data = await response.json();
			return data;
		};

		try {
			let result = await addData();
			dispatch(fetchData());
			dispatch(
				uiActions.showNotification({
					title: 'success',
					message: result.message
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					title: 'error',
					message: error.message
				})
			);
		}
	};
};

export const removeData = (id) => {
	return async (dispatch) => {
		const removeData = async () => {
			const response = await fetch(`/notTodos/${id}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
			if (!response.ok) {
				throw new Error('something went wrong');
			}
			const data = await response.json();
			return data;
		};

		try {
			const result = await removeData();
			dispatch(fetchData());
			dispatch(
				uiActions.showNotification({
					title: 'success',
					message: result.message
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					title: 'error',
					message: 'something went wrong'
				})
			);
		}
	};
};

export const notTodoActions = notTodoSlice.actions;
export default notTodoSlice.reducer;
