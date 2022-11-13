const express = require('express');
const db = require('./config/db');
const mw = require('./middleware');
const cors = require('cors');
const { nanoid } = require('nanoid');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 4000;
const HTTP_ADDR = process.env.HTTP_ADDR || '127.0.0.1'; // === localhost

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const authRequiredMiddleware = mw.createAuthRequired(db);
const userInSesessionMiddleware = mw.createUserInSession(db);

// app.use(
// 	session({
// 		secret: '123',
// 		resave: true,
// 		saveUninitialized: true
// 	})
// );

app.get('/api/not-todos', authRequiredMiddleware, async (req, res) => {
	try {
		const notTodos = await db.getNotTodosByUserId(req.session.user_id);
		res.status(200).send(notTodos);
	} catch (e) {
		res.status(400).send({ error: e });
	}
});

app.get('/api/not-todos/:id', async (req, res) => {
	let idValid = req.params.id;
	if (idValid) {
		try {
			let notTodo = await db.getOneNotTodo(idValid);
			res.status(200).send(notTodo);
		} catch (e) {
			res.status(400).send({ error: eerror });
		}
	}
});

app.post('/api/not-todos', authRequiredMiddleware, mw.createNotTodoSchema, async (req, res) => {
	const userId = req.session.user_id;

	if (!userId) {
		res.status(404).send({ message: 'something went wrong' });
	}

	try {
		let user_id = userId;
		let title = req.body.title;
		let date = req.body.date;
		let description = req.body.description;
		let notTodo = [ user_id, title, date, description ];
		let newNotTodo = await db.createNotTodo(notTodo);
		res.status(200).send({ message: 'add a new not-to-do' });
	} catch (error) {
		res.status(400).send({ error: errorDetail });
	}
});

app.delete('/api/not-todos/:id', mw.removeNotTodoQuerySchema, async (req, res) => {
	let id = Number(req.params.id);
	try {
		let amountDeleted = await db.removeNotTodo(id);
		if (amountDeleted === 1) {
			res.status(204).end();
		} else {
			res.status(404).end();
		}
	} catch (error) {
		res.status(400).send({ error: error });
	}
});

app.post('/api/register', mw.registerValidation, userInSesessionMiddleware, mw.mustBeAnonymous, async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	try {
		let passwordHashed = mw.passwordHash(password);
		// check if this email exist in user. If existed, emailExisted = 1
		let emailExisted = await db.checkEmailExisited(email);
		if (emailExisted !== 0) return res.status(409).send({ error: errorMsg });
		let user = await db.createUser(email, passwordHashed);
		// console.log('user', user);
		res.status(200).send({ message: 'Account created!' });
	} catch (error) {
		res.status(500).send({ error: errorMsg });
	}
});

app.post('/api/login', mw.loginValidation, userInSesessionMiddleware, mw.mustBeAnonymous, async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	let passwordHashed = mw.passwordHash(password);

	try {
		let user = await db.checkLogin(email, passwordHashed);
		let userId = user.id;
		let sessionId = nanoid();

		await db.createSession(sessionId, userId);

		res.cookie('session_id', sessionId, {
			httpOnly: true,
			sameSite: true
		});

		res.status(200).send({ message: 'Login successfully' });
	} catch (error) {
		console.error(error);
		res.status(401).send({ error: error.toString() });
	}
});

app.get('/api/profile', authRequiredMiddleware, async (req, res) => {
	const userId = req.session.user_id;
	if (!userId) {
		res.status(404).send({ message: 'not found' }).end();
	}
	try {
		const user = await db.getUserById(userId);
		res.status(200).send(user);
	} catch (error) {
		res.status(401).send({ error: error });
	}
});

app.post('/api/logout', authRequiredMiddleware, async (req, res) => {
	const session_id = req.session.session_id;

	if (!session_id) {
		res.status(403).end();
	}

	try {
		await db.removeSessionBySessionId(session_id);
		res.clearCookie('session_id');
		res.status(200).end();
	} catch (error) {
		res.status(403).end();
	}
});

// Add headers before the routes are defined
app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.listen(HTTP_PORT, HTTP_ADDR, () => {
	console.log(`Server is running on ${HTTP_ADDR}:${HTTP_PORT}`);
});
