import { render, screen } from '@testing-library/react';
import Profile from './Profile';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store';

/** -------------------------PROFILE COMPONENT---------------------- */
describe("Profile component", () => { 
	test("render logout button", () => { 
		render(
			<MemoryRouter>
				<Provider store={store}>
					<Profile />
				</Provider>
			</MemoryRouter>
		)
		expect(screen.getByText("Logout")).toBeInTheDocument()
	})
})