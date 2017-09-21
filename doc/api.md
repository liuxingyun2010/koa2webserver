####接口文档
#####获取项目列表
* 请求方式: get
* status说明，1正常，2已归档，3已删除 0或者空查询全部
* url:   /project/?status=1
* 出参
```js
	{
		data: [
			{
				_id: 'dddxxdd',
				name: '项目名称'
			}
		]
	}
```

#####删除项目
* 请求方式: delete
* url:   /project/:id


#####修改项目（名称）
* 请求方式: patch
* url:   /project/:id
* 参数：
```JS
	{
		name: '修改项目名称'
	}
```




