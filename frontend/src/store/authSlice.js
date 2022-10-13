import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './uiSlice';

const initialState = {
	users: [],
	user: {},
	sessions: [],
	isLoggedIn: false,
	isLoading: false
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		addUser: (state, action) => {
			state.users = [ ...state.users, action.payload.user ];
		},

		getUsers: (state, action) => {
			state.users = [ ...action.payload.user ];
		},

		getUser: (state, action) => {
			state.user = action.payload.user;
		},

		isLoggedIn: (state) => {
			state.isLoggedIn = true;
		},

		login: (state, action) => {
			state.sessions = [ ...state.sessions, action.payload ];
		},

		logout: (state) => {
			state.isLoggedIn = false;
		}
	}
});

export const register = (user) => {
	return async (dispatch) => {
		const register = async () => {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});

			if (!response.ok) {
				// Los estados de error que son conocidos que devuelves un json
				// en el body los tratamos para crear errores con mas significado
				// que luego podemos mostrar en notificaciones
				if ([ 409, 401 ].includes(response.status)) {
					const error = await response.json();
					throw new Error(error.message);
				}
				throw new Error('could not create new account');
			}

			const data = await response.json();
			console.log('data', data);
			return data;
		};

		try {
			// call the fn createUser(), so you also can catch error from this fn.
			let result = await register();
			console.log('result', result);
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

			const data = await response.json(); // Object { message: "Login successfully" }
			return data;
		};
		try {
			let result = await login();
			dispatch(authActions.isLoggedIn());
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

export const profile = () => {
	return async (dispatch) => {
		const profile = async () => {
			const response = await fetch('/api/profile');
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
			dispatch(authActions.logout());
			dispatch(
				uiActions.showNotification({
					title: 'success',
					message: 'Logout successfully'
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

export const authActions = authSlice.actions;
export default authSlice.reducer;
