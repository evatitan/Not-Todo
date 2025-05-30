import { render, screen, fireEvent } from '@testing-library/react';
import NotTodoDetails from './NotTodoDetails';
import NewNotTodoForm from "./NewNotTodoForm"
import NotTodoItem from "./NotTodoItem";
import NotTodoList from "./NotTodoList";
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { BrowserRouter } from 'react-router-dom';

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({ 
	...jest.requireActual("react-redux"),
	useDispatch: () => mockDispatch,
  useSelector: jest.fn(fn => fn({ auth: { isLoggedIn: true } })),
}))

describe("NewNotTodoForm component", () => {
  it("show new not todo required inputs", () => { 
    const { useSelector } = require('react-redux');
    useSelector.mockImplementation(fn => fn({ auth: { isLoggedIn: true } }));
  
    render(
      <BrowserRouter>
        <Provider store={store}>
          <NewNotTodoForm isLoggedIn={true} />
        </Provider>
      </BrowserRouter>
    )
    const titleInput = screen.getByLabelText(/title/i);
		expect(titleInput).toBeRequired();

    const dateInput = screen.getByLabelText(/date/i);
		expect(dateInput).toBeRequired();

		const descriptionInput = screen.getByLabelText(/description/i);
		expect(descriptionInput).toBeRequired();

		const createAccountBtn = screen.getByText(/add/i);
		expect(createAccountBtn).toBeInTheDocument();
  })
})
