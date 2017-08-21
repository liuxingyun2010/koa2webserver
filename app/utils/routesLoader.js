var glob = require('glob')

module.exports = function(dirname) {
    return new Promise((resolve, reject) => {
        const routes = []
        glob(`${dirname}/*`, {
            ignore: '**/index.js',
        }, (err, files) => {
            if (err) {
                return reject(err)
            }
            files.forEach(async (file) => {
                const route = await require(file) // eslint-disable-line global-require, import/no-dynamic-require
                routes.push(route)
            })
            return resolve(routes)
        })
    })
}