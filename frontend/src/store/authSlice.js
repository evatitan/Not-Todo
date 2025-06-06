import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './uiSlice';

const initialState = {
	user: {},
	isLoggedIn: false,
	isLoading: false
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getUser: (state, action) => {
			state.user = action.payload.user;
		},
		setLogin: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		isLoading: (state) => {
			state.isLoading = !state.isLoading;
		}
	}
});

export const register = (user) => {
	return async (dispatch) => {
		const register = async () => {
			dispatch(authActions.isLoading());
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});

			if (!response.ok) {
				// Known error statuses that return a JSON body are handled
				// to create more meaningful errors that can be shown in notifications
				if ([ 409, 401 ].includes(response.status)) {
					const error = await response.json();
					throw new Error(error.message);
				}
				throw new Error('could not create new account');
			}

			const data = await response.json();
			return data;
		};

		try {
			let result = await register();
			dispatch(authActions.isLoading());
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

export const login = (user) => {
	return async (dispatch) => {
		const login = async () => {
			dispatch(authActions.isLoading());
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			if (!response.ok) {
				if ([ 400, 401 ].includes(response.status)) {
					const error = await response.json();
					throw new Error(error.message);
				}

				throw new Error('something went wrong');
			}

			const data = await response.json();
			return data;
		};
		try {
			let result = await login();
			dispatch(authActions.setLogin(true));
			dispatch(authActions.isLoading());
			dispatch(
				uiActions.showNotification({
					title: 'success',
					message: result.message
				})
			);
		} catch (error) {
			dispatch(authActions.setLogin(false));
			dispatch(
				uiActions.showNotification({
					title: 'error',
					message: error.message
				})
			);
		}
	};
};

export const profile = () => {
	return async (dispatch) => {
		const profile = async () => {
			dispatch(authActions.isLoading());
			const response = await fetch('/api/profile', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
				credentials: 'include' // <-- add this if using cookies
			});
			if (!response.ok) {
				throw new Error('something went wrong');
			}
			const data = await response.json();
			return data;
		};
		try {
			let result = await profile();
			dispatch(
				authActions.getUser({
					user: result || {}
				})
			);
			dispatch(authActions.isLoading());
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

export const logout = () => {
	return async (dispatch) => {
		const logout = async () => {
			dispatch(authActions.isLoading());
			const response = await fetch('/api/logout', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
			if (!response.ok) {
				throw new Error('something went wrong');
			}
		};
		try {
			await logout();
			dispatch(authActions.setLogin(true));
			dispatch(authActions.isLoading());
			dispatch(
				uiActions.showNotification({
					title: 'success',
					message: 'Logout successfully'
				})
			);
		} catch (error) {
			dispatch(authActions.setLogin(false));
			dispatch(
				uiActions.showNotification({
					title: 'error',
					message: 'something went wrong'
				})
			);
		}
	};
};

export const authActions = authSlice.actions;
export default authSlice.reducer;
