// 是否是有效的objectId
export default function(id){
	return id.match(/^[0-9a-fA-F]{24}$/)
}