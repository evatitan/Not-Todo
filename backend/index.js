require('dotenv').config();
const express = require('express');
const mw = require('./middleware');
const cors = require('cors');
const { nanoid } = require('nanoid');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const pool  = require("./config/db")

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 4000;
const HTTP_ADDR = process.env.HTTP_ADDR || 'localhost';

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json())

const authRequiredMiddleware = mw.createAuthRequired(pool);
const userInSessionMiddleware = mw.createUserInSession(pool);

app.post('/api/register', mw.registerValidation, userInSessionMiddleware, mw.mustBeAnonymous, async (req, res) => {
	try {
		const {email, password} = req.body;
		const passwordHashed = mw.passwordHash(password);
		const emailExisted = await pool.checkEmailExisted(email);
		if (emailExisted) return res.status(409).send({ error: errorMsg });
		const user = await pool.createUser(email, passwordHashed);
		res.status(200).send({ message: 'Account created!' });
	} catch (error) {
		res.status(500).send({ error: error });
	}
});

app.post('/api/login', mw.loginValidation, userInSessionMiddleware, mw.mustBeAnonymous, async (req, res) => {
	try {
		const { email, password } = req.body;
		const passwordHashed = mw.passwordHash(password);
		const user = await pool.checkLogin(email, passwordHashed);
		if (!user) res.status(401).json({message :"Invalid email or password"})
		const sessionId = nanoid();
		await pool.createSession(sessionId, user.id);
		res.cookie('session_id', sessionId, {
			httpOnly: true,
			sameSite: true,
			sameSite: 'lax', // more explicit and secure
			maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
		});
		res.status(200).send({ message: 'Login successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: "Internal server error" });
	}
});

app.get('/api/not-todos', authRequiredMiddleware, async (req, res) => {
	try {
		const notTodos = await pool.getNotTodosByUserId(req.session.user_id);
		res.status(200).send(notTodos);
	} catch (error) {
		res.status(400).send({ error: error });
	}
});

app.get('/api/not-todos/:id', async (req, res) => {
	try {
		const idValid = req.params.id;
		if (idValid) { 
			const notTodo = await pool.getOneNotTodo(idValid);
			res.status(200).send(notTodo);
		}
	} catch (error) {
		res.status(400).send({ error: error });
	}
});

app.get('/api/profile', authRequiredMiddleware, async (req, res) => {
	try {
		const userId = req.session.user_id;
		if (!userId) 	res.status(404).send({ message: 'not found' }).end();
		const user = await pool.getUserById(userId);
		res.status(200).send(user);
	} catch (error) {
		res.status(401).send({ error: error });
	}
});

app.post('/api/not-todos', authRequiredMiddleware, mw.createNotTodoSchema, async (req, res) => {
	try {
		const userId = req.session.user_id;
		if (!userId) res.status(404).send({ message: 'something went wrong' });
		
		const user_id = userId;
		const title = req.body.title;
		const date = req.body.date;
		const description = req.body.description;
		const notTodo = { user_id, title, date, description };
		const newNotTodo = await pool.createNotTodo(notTodo);
		res.status(200).send({ message: 'add a new not-to-do' });
	} catch (error) {
		res.status(400).send({ error: errorDetail });
	}
});

app.post('/api/logout', authRequiredMiddleware, async (req, res) => {
	try {
		const session_id = req.session.session_id;
		if (!session_id) res.status(403).end();
		await pool.removeSessionBySessionId(session_id);
		res.clearCookie('session_id');
		res.status(200).end();
	} catch (error) {
		res.status(403).end();
	}
});

app.delete('/api/not-todos/:id', mw.removeNotTodoQuerySchema, async (req, res) => {
	try {
		const id = Number(req.params.id);
		const amountDelete = await pool.removeNotTodo(id);
		if (amountDelete === 1) {
			res.status(204).end();
		} else {
			res.status(404).end();
		}
	} catch (error) {
		res.status(400).send({ error: error });
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
