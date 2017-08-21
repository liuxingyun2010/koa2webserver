// 是否是有效的objectId
module.exports = function(id){
	return id.match(/^[0-9a-fA-F]{24}$/)
}