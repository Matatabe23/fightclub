const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	email: {type: DataTypes.STRING, unique: true},
	name: {type: DataTypes.STRING},
	password: {type: DataTypes.STRING},
	role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Posts = sequelize.define('posts', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	title: {type: DataTypes.STRING},
	body: {type: DataTypes.STRING},
	ADnameName:{type: DataTypes.STRING},
	ADnameRole:{type: DataTypes.STRING},
})

module.exports = {
	User,
	Posts,
}