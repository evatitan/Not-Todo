import { configureStore } from '@reduxjs/toolkit';
import notTodoReducer from './notTodoSlice';
import uiReducer from './uiSlice';
import authReducer from './authSlice';

export const store = configureStore({
	reducer: {
		notTodo: notTodoReducer,
		ui: uiReducer,
		auth: authReducer
	}
});
