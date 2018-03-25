'use  strict';

//引入相关的核心对象
const http = require('http');
const path  = require('path');
const querystring = require('querystring');
const  artTemplate  = require('art-template');

//创建数据
let  msgs = [{name:'张三',msg:'你好'}]


//搭建服务器
let  server  = http.createServer((req,res)=>{
		// 创建一
	if(req.method == "GET" && req.url == '/') {
		let htmlStr = artTemplate(path.join(__dirname,'index.html'),{
			myMsg:msgs
		})
		res.end(htmlStr)
	}else if(req.method == "POST" && req.url== '/sendMsg') {
		req.on('data',(data)=>{
			let dataStr = data.toString();
			let strObj = querystring.parse(dataStr);
			msgs.push({
				name:strObj.name,
				msg:strObj.msg
			})
			let htmlStr = artTemplate(path.join(__dirname,'index.html'),{
			myMsg:msgs
		})
		res.end(htmlStr)
		})
	}else {
		res.end('ok')
	}
})

server.listen(8888,()=>{
	console.log('服务器启动了')
})
