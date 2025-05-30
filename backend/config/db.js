require("dotenv").config();
const { URL } = require("url");
const mysql = require('mysql2/promise');
const { error } = require("console");
const dbUrl = new URL(process.env.MYSQL_URL)

const dbOptions = {
	host: dbUrl.hostname,
	user: dbUrl.username,
	password: dbUrl.password,
	database: dbUrl.pathname.slice(1),// remove leading "/"
	port: dbUrl.port,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
};

const pool = mysql.createPool(dbOptions);

async function checkEmailExisted(email) {
	try {
	let sql = `SELECT EXISTS(SELECT * FROM users WHERE email = ?) as EXISTED`;
		const [rows] = await pool.query(sql, [email])
	  return rows[0].EXISTED === 1
	} catch (error) {
		console.error( error)
		throw error
	}
}

async function createUser(email, password) {
	try {
		const sql = `INSERT INTO users(email,password) VALUES(?,?)`
		const [res] = await pool.query(sql, [email, password])
		if (res.affectedRows !== 1) throw new Error('User insert failed');
		return res
 } catch (error) {
	 console.error(error)
	 throw error
	}
}

async function checkLogin(email, password) {
	try {
		let sql = 'SELECT * FROM users WHERE email = ? and password = ?';
		const [rows] = await pool.query(sql, [email, password])
		if(rows.length===0) throw new Error("Invalid email or password")
		return rows[0]
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function createSession(sessionId, userId) {
	try {
		let sql = 'INSERT INTO sessions(session_id, user_id) VALUES (?, ?)';
		const [res] = await pool.query(sql, [sessionId, userId])
		if(res.affectedRows !== 1) throw new Error("create session failed")
		return res
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function getNotTodosByUserId(id) {
	try {
		const sql = `select id, user_id,title,date,description from not_to_dos where user_id = ?`
		const [res] = await pool.query(sql, [id])
		// should check?
		return res
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function getOneNotTodo(id) {
	try {
		const sql = `SELECT * from not_to_dos where id = ?`
		const [rows] = await pool.query(sql, [id])
		if(rows.length===0) throw new Error("fetch failed")
		return rows[0]
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function getUserById(id) {
	try {
		const sql = `select users.id, users.email from users where id= ?`;
		const [rows] = await pool.query(sql, [id])
		if (!rows.length) throw new Error("Get user failed")
		return rows[0]
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function createNotTodo(notTodo) {
	try {
		const sql = 'INSERT INTO not_to_dos(user_id,title,date,description) VALUES(?,?,?,?)';
		const params = [notTodo.user_id, notTodo.title, notTodo.date, notTodo.description];
		const [rows] = await pool.query(sql, params)
		if (rows.affectedRows !== 1) throw new Error("Insert failed")
		return rows
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function removeSessionBySessionId(sessionId) {
	try {
		const sql = 'delete from sessions where session_id = ?';
		const [res] = await pool.query(sql, [sessionId])
		if (res.affectedRows !== 1) throw new Error("delete session failed")
		return res
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function removeNotTodo(id) {
	try {
		const sql = 'delete from not_to_dos where id = ?'
		const [res] = await pool.query(sql, [id])
		if (res.affectedRows !== 1) throw new Error("delete not todo failed") 
		return res.affectedRows
	} catch (error) {
		console.error(error)
		throw error
	}
}

// authentication
async function checkSessionIdExisted(sessionId) {
	try {
		let sql = `SELECT EXISTS(SELECT * FROM sessions WHERE session_id = ?) as EXISTED`;
		const [rows] = await pool.query(sql, [sessionId])
		return rows[0].EXISTED===1
		
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function checkSessionExistedByUserId(userId) {
	try {
		let sql = `SELECT EXISTS(SELECT * FROM sessions WHERE session_id = ?) as EXISTED`;
		const [rows] = await pool.query(sql, [userId])
		return rows[0].EXISTED === 1
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function getSessionById(sessionId) {
	try {
		let sql = 'select * from sessions where session_id = ?';
		const [rows] = await pool.query(sql, [sessionId])
		if(rows.length === 0) throw new Error("fetch session faild")
		return rows[0]
	} catch (error) {
		console.error(error)
		throw error
	}
}

module.exports = {
	pool,
	getNotTodosByUserId,
	getOneNotTodo,
	createNotTodo,
	removeNotTodo,
	checkEmailExisted,
	createUser,
	getUserById,
	checkLogin,
	checkSessionIdExisted,
	checkSessionExistedByUserId,
	createSession,
	getSessionById,
	removeSessionBySessionId
};
