import { createSlice } from '@reduxjs/toolkit';

const initialCartState = { notification: null };

const uiSlice = createSlice({
	name: 'ui',
	initialState: initialCartState,

	reducers: {
		showNotification: (state, action) => {
			state.notification = {
				title: action.payload.title,
				message: action.payload.message
			};
		}
	}
});
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
