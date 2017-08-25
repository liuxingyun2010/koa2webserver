const config = {
	production: {
		port: 80,
		connectString: 'mongodb://dev:dev1qaz2wsx@127.0.0.1:27017/daily'
	},
	test: {
		port: 3000,
		connectString: 'mongodb://127.0.0.1:27017/dailydb', 
	},
	develop:{
		port: 3333,
		connectString: 'mongodb://127.0.0.1:27017/dailydb',
	}
}

const env = process.env.NODE_ENV? process.env.NODE_ENV: 'develop'

module.exports = {
	port: config[env].port,
	connectString: config[env].connectString,
	baseApi: 'api',
	jwtKey: '!@#zaq2017'
}

