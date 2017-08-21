var jwt = require('koa-jwt')
var jwtKey = require('../config').jwtKey

module.exports =  jwt({
	secret: jwtKey
})