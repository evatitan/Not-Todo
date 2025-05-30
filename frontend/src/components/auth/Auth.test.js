import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import Register from "./Register"
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({ 
	...jest.requireActual("react-redux"),
	useDispatch: () => mockDispatch,
	useSelector: jest.fn(fn => fn({ auth: { isLoading: false, user: {email :"test@example.com"} } })),
}))

/** -------------------------LOGIN COMPONENT---------------------- */

/** INTERACTION TEST */
describe("Login component interaction test", () => { 
	it("dispatch login action with user data on submit", () => { 
		render(
			<Provider store={store}>
					<MemoryRouter>  
						<Login />
					</MemoryRouter>
			</Provider>
		)
		fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
		fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });
		fireEvent.click(screen.getByTestId("login"));
		expect(mockDispatch).toHaveBeenCalled();
	})
})

/** CONDITIONAL TEST */
describe("Login component conditional test", () => { 
	it("show loading when isLoading is true", () => { 
  const { useSelector } = require('react-redux');
  useSelector.mockImplementation(fn => fn({ auth: { isLoading: true } }));

	render(
		<BrowserRouter>
			<Provider store={store}>
				<Login />
			</Provider>
	</BrowserRouter>
	)
		const loading = screen.getByTestId("loading");
	expect(loading).toBeInTheDocument();
})
})

/** RENDERING TESTS*/
describe('Login component rendering test', () => {
	/* login test */ 
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

	/* tests for email and password input are required */ 
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

	/*test create new account button in login form*/ 
	test('render buttons', () => {
		render(
			<BrowserRouter>
				<Provider store={store}>
					<Login />
				</Provider>
			</BrowserRouter>
		);
		const loginButtonText = screen.getByText('Create new Account');
		expect(loginButtonText).toHaveTextContent('Create new Account');

		const createAccountBtn = screen.getByTestId("login");
		expect(createAccountBtn).toHaveTextContent("Login");
	});
});

/** -------------------------REGISTER COMPONENT---------------------- */
describe("Register component", () => {
	it("rending Register required inputs and submit button", () => {
		render(
			<BrowserRouter>
				<Provider store={store}>
					<Register />
				</Provider>
			</BrowserRouter>
		)
		const emailInput = screen.getByLabelText("Email");
		expect(emailInput).toBeInTheDocument();

		const passwordInput = screen.getByLabelText("Password");
		expect(passwordInput).toBeInTheDocument();

		const createAccountBtn = screen.getByTestId("create-account");
		expect(createAccountBtn).toBeInTheDocument();
	});
})
