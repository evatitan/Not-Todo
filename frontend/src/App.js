import React, { Fragment } from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

import './App.css';

// let initial = false;

function App() {
	const notification = useSelector((state) => state.ui.notification);

	// useEffect(
	// 	() => {
	// 		if (initial) {
	// 			initial = false;
	// 			return;
	// 		}
	// 		if (notTodo.changed) {
	// 			dispatch(sendData(notTodo));
	// 		}
	// 	},
	// 	[ notTodo, dispatch ]
	// );

	return (
		<Fragment>
			{notification && (
				<Notification statue={notification.status} title={notification.title} message={notification.message} />
			)}
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/notTodos" element={<NotTodos />} exact />
					<Route path="/notTodos/:notTodosId" element={<NotTodoDetail />} />
					<Route path="/new-notTodo" element={<NewNotTodo />} />
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
