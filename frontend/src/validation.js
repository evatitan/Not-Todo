const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

// body query for POST & PUT
const createUserSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().min(5).max(15).required()
});

const createNotTodoSchema = Joi.object({
	user_id: Joi.number().required(),
	title: Joi.string().required(),
	date: Joi.string().required(),
	description: Joi.string().required()
});

// query valitation for GET & DELETE
const userQuerySchema = Joi.object({
	id: Joi.number().required()
});

const notTodoQuerySchema = Joi.object({
	id: Joi.number().required()
});

module.exports = {
	validator,
	createUserSchema,
	createNotTodoSchema,
	userQuerySchema,
	notTodoQuerySchema
};
