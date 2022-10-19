import React, { Fragment, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CookieConsent from 'react-cookie-consent';
import NotTodoDetail from './pages/NotTodoDetail';

import NotTodos from './pages/NotTodos';
import NewNotTodo from './pages/NewNotTodo';
import Layout from './components/layout/Layout';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Notification from './components/ui/Notification';
import { authActions } from './store/authSlice';
import './App.css';

export const checkLogin = () => {
	return async (dispatch) => {
		try {
			const response = await fetch('/api/profile');
			dispatch(authActions.setLogin(response.ok));
		} catch (error) {
			dispatch(authActions.setLogin(false));
		}
	};
};

function App() {
	const dispatch = useDispatch();
	const notification = useSelector((state) => state.ui.notification);

	useEffect(
		() => {
			dispatch(checkLogin());
		},
		[ dispatch ]
	);

	return (
		<Fragment>
			<MetaTags>
				<title>NOT-TODOs</title>
				<meta name="description" content="Write down you NOT-TODOs" />
			</MetaTags>
			{notification && (
				<Notification statue={notification.status} title={notification.title} message={notification.message} />
			)}
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/not-todos" element={<NotTodos />} exact />
					<Route path="/not-todos/:notTodosId" element={<NotTodoDetail />} />
					<Route path="/not-todos/new" element={<NewNotTodo />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Layout>
			<CookieConsent debug={true} location="bottom" expires={365}>
				This site uses cookies to enhance user experience. See our <Link href="/">Privacy policy</Link>
			</CookieConsent>
		</Fragment>
	);
}

export default App;
