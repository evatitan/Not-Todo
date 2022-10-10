const mysql = require('mysql2');

const dbOptions = {
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || 'admin',
	database: process.env.DB_NAME || 'not_to_do'
};

let db = mysql.createConnection(dbOptions);

db.connect(function(err, res) {
	if (err) console.log(err);
	else console.log('DB connected!');
});

// db.oldQuery = db.query.bind(db);
// db.query = function(...args) {
// 	console.log(args);
// 	return db.oldQuery(...args);
// };

// NOT-TO-DOS
// ok
// function getNotTodos() {
// 	return new Promise((resolve, reject) => {
// 		db.query('select * from not_to_dos order by id', (err, res) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve(res);
// 			}
// 		});
// 	});
// }

function getNotTodosByUserId(id) {
	return new Promise((resolve, reject) => {
		let sql = `select id, user_id,title,date,description from not_to_dos where  user_id = ?`;
		db.query(sql, id, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
}

// done
function getOneNotTodo(id) {
	return new Promise((resolve, reject) => {
		db.query('select * from not_to_dos where id = ?', id, (err, res) => {
			if (err) {
				reject(err);
			} else {
				if (res.length === 0) {
					resolve(null);
				} else {
					resolve(res[0]);
				}
			}
		});
	});
}
// Todo
function createNotTodo(notTodo) {
	return new Promise((resolve, reject) => {
		let sql = 'INSERT INTO not_to_dos(user_id,title,date,description) VALUES(?,?,?,?)';
		db.query(sql, notTodo, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
}
// Todo
function updateNotTodo(NewNotTodo) {
	return new Promise((resolve, reject) => {
		let sql = 'UPDATE not_to_dos SET user_id=?,title=?,date=?,description=?,status=?';
		db.query(sql, NewNotTodo, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
}

function removeNotTodo(id) {
	return new Promise((resolve, reject) => {
		db.query('delete from not_to_dos where id = ?', id, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.affectedRows);
			}
		});
	});
}

// USERS
function checkEmailExisited(email) {
	return new Promise((resolve, reject) => {
		let sql = `SELECT EXISTS(SELECT * FROM users WHERE email = ?) as EXISTED`;
		db.query(sql, email, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res[0].EXISTED);
			}
		});
	});
}

function createUser(email, password) {
	return new Promise((resolve, reject) => {
		let sql = 'INSERT INTO users(email,password) VALUES(?,?)';
		db.query(sql, [ email, password ], (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
}

function getUserById(id) {
	return new Promise((resolve, reject) => {
		let sql = `select users.id, users.email from users where id= ?`;
		db.query(sql, id, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res[0]);
			}
		});
	});
}

function checkLogin(email, password) {
	return new Promise((resolve, reject) => {
		let sql = 'SELECT * FROM users WHERE email = ? and password = ?'; // todo: comparar el pw con hash
		db.query(sql, [ email, password ], (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res[0]);
			}
		});
	});
}
// authentication
function checkSessionIdExisted(sessionId) {
	return new Promise((resolve, reject) => {
		let sql = `SELECT EXISTS(SELECT * FROM sessions WHERE session_id = ?) as EXISTED`;
		db.query(sql, sessionId, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res[0].EXISTED);
			}
		});
	});
}

function checkSessionExistedByUserId(userId) {
	return new Promise((resolve, reject) => {
		let sql = `SELECT EXISTS(SELECT * FROM sessions WHERE session_id = ?) as EXISTED`;
		db.query(sql, userId, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res[0].EXISTED);
			}
		});
	});
}

function createSession(sessionId, userId) {
	return new Promise((resolve, reject) => {
		let sql = 'INSERT INTO sessions(session_id, user_id) VALUES (?, ?)';
		db.query(sql, [ sessionId, userId ], (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
}

function getSessionById(sessionId) {
	return new Promise((resolve, reject) => {
		let sql = 'select * from sessions where session_id = ?';
		db.query(sql, sessionId, (err, res) => {
			if (err) {
				reject(err);
			} else {
				if (res.length === 0) {
					return reject(new Error('session id does not exist'));
				}
				resolve(res[0]);
			}
		});
	});
}

function removeSessionBySessionId(sessionId) {
	return new Promise((resolve, reject) => {
		let sql = 'delete from sessions where session_id = ?';
		db.query(sql, sessionId, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
}

module.exports = {
	// getNotTodos,
	getNotTodosByUserId,
	getOneNotTodo,
	createNotTodo,
	updateNotTodo,
	removeNotTodo,
	checkEmailExisited,
	createUser,
	getUserById,
	checkLogin,
	checkSessionIdExisted,
	checkSessionExistedByUserId,
	createSession,
	getSessionById,
	removeSessionBySessionId
};
