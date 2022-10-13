import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './uiSlice';

const initialState = {
	items: [],
	isLoading: false
};

const notTodoSlice = createSlice({
	name: 'notTodo',
	initialState,
	reducers: {
		replaceNotTodo: (state, action) => {
			state.items = action.payload.items;
		},
		isLoading: (state) => {
			state.isLoading = !state.isLoading;
		}
	}
});

export const fetchData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			dispatch(notTodoActions.isLoading());
			const response = await fetch('/api/not-todos');
			if (!response.ok) {
				throw new Error('Could not fetch not-todos!');
			}
			const data = await response.json();
			return data;
		};

		try {
			const notTodoData = await fetchData();
			dispatch(notTodoActions.isLoading());
			dispatch(
				notTodoActions.replaceNotTodo({
					items: notTodoData || []
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					title: 'error',
					message: 'Fetching not-todos failed!'
				})
			);
		}
	};
};

export const showData = (id) => {
	return async (dispatch) => {
		const showData = async () => {
			dispatch(notTodoActions.isLoading());
			const response = await fetch(`/api/not-todos/${id}`);
			if (!response.ok) {
				throw new Error('Could not fetch not-todos!');
			}
			const data = await response.json();
			return data;
		};
		try {
			const notTodoData = await showData();
			dispatch(notTodoActions.isLoading());
			dispatch(
				notTodoActions.replaceNotTodo({
					items: [ { ...notTodoData } ] || []
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					title: 'error',
					message: 'Fetching not-todos failed!'
				})
			);
		}
	};
};

export const addData = (notTodoObj) => {
	return async (dispatch) => {
		const addData = async () => {
			const response = await fetch('/api/not-todos/new', {
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
			const response = await fetch(`/api/not-todos/${id}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
			if (!response.ok) {
				throw new Error('throw error');
			}
		};

		try {
			await removeData();
			dispatch(fetchData());
			dispatch(
				uiActions.showNotification({
					title: 'success',
					message: 'item deleted'
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
