import { createSlice } from '@reduxjs/toolkit';

const initialcartState = { notification: null };

const uiSlice = createSlice({
	name: 'ui',
	initialState: initialcartState,

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
