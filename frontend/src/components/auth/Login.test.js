import { render, screen } from '@testing-library/react';
import Login from './Login';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { BrowserRouter } from 'react-router-dom';

describe('Login component', () => {
	// test login title
	test('render login title if the button was NOT clicked', () => {
		render(
			<BrowserRouter>
				<Provider store={store}>
					<Login />
				</Provider>
			</BrowserRouter>
		);
		const loginTitle = screen.getByTestId('title');
		expect(loginTitle).toBeInTheDocument();
	});

	// tests for email and password input are required
	test('render required input', () => {
		render(
			<BrowserRouter>
				<Provider store={store}>
					<Login />
				</Provider>
			</BrowserRouter>
		);
		const emailInput = screen.getByLabelText('Email');
		expect(emailInput).toBeRequired();

		const passwordInput = screen.getByLabelText('Password');
		expect(passwordInput).toBeRequired();
	});

	// test create new account button in login form
	test('render Create new Account if the button was NOT clicked', () => {
		render(
			<BrowserRouter>
				<Provider store={store}>
					<Login />
				</Provider>
			</BrowserRouter>
		);
		const loginButtonText = screen.getByText('Create new Account');
		expect(loginButtonText).toHaveTextContent('Create new Account');
	});
});
