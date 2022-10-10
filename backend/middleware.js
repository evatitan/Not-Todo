const crypto = require('crypto');
const valitation = require('./valitation');

// check session middleware
function createAuthRequired(db) {
	return async function authRequired(req, res, next) {
		const { session_id } = req.cookies;
		if (!session_id) return res.status(401).end();
		try {
			const userSession = await db.getSessionById(session_id);
			req.session = userSession;
			next();
		} catch (error) {
			res.status(401).end();
		}
	};
}

// check session middleware
function createUserInSession(db) {
	return async function userInSesession(req, res, next) {
		const { session_id } = req.cookies;
		if (!session_id) return next();
		try {
			const userSession = await db.getSessionById(session_id);
			req.session = userSession;
		} catch (error) {
			console.error(error);
		} finally {
			next();
		}
	};
}

function mustBeAnonymous(req, res, next) {
	if (Boolean(req.session)) {
		res.status(403).end();
		return;
	}

	next();
}

// password hash middleware
function passwordHash(password) {
	return crypto.createHash('sha256').update(password).digest('base64');
}

function registerValidation(req, res, next) {
	if (valitation.registerSchema.validate(req.body).error) {
		let errorDetail = valitation.registerSchema.validate(req.body).error.details[0];
		res.status(401).send(errorDetail);
		return;
	}
	next();
}

function loginValidation(req, res, next) {
	if (valitation.loginSchema.validate(req.body).error) {
		let errorDetail = valitation.loginSchema.validate(req.body).error.details[0];
		res.status(401).send(errorDetail);
		return;
	}
	next();
}

function createNotTodoSchema(req, res, next) {
	if (valitation.createNotTodoSchema.validate(req.body).error) {
		let errorDetail = valitation.createNotTodoSchema.validate(req.body).error.details[0];
		res.status(400).send(errorDetail);
		return;
	}
	next();
}

function removeNotTodoQuerySchema(req, res, next) {
	console.log('req.params', req.params);
	const result = valitation.notTodoQuerySchema.validate(req.params);
	console.log('result', result);
	let error = result.error;
	if (error) {
		res.status(401).send(error.details[0]);
		return;
	}
	next();
}

module.exports = {
	createAuthRequired,
	createUserInSession,
	mustBeAnonymous,
	passwordHash,
	registerValidation,
	loginValidation,
	createNotTodoSchema,
	removeNotTodoQuerySchema
};
