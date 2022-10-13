const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({ passError: true });

// body query for POST & PUT
const registerSchema = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string().min(5).max(15).required()
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(5).max(15).required()
});

const createNotTodoSchema = Joi.object({
	title: Joi.string().max(100).required(),
	date: Joi.date().required(),
	description: Joi.string().max(2000).required()
});

// query valitation for GET & DELETE
const notTodoQuerySchema = Joi.object({
	id: Joi.number().required()
});

module.exports = {
	validator,
	loginSchema,
	registerSchema,
	createNotTodoSchema,
	notTodoQuerySchema
};
