
import express from 'express';
import './schemas';
import graphql from './graphql';

const port = 3000;
const app = express();

// 设置路由
app.use('/', (()=> {
	const router = express.Router()

  router.get('/', (req, res)=>{
    let text = `API服务运行中...<br /><a href="/graphql">GraphQL API文档</a>`
    res.send(text);
  })

  return router
})());

graphql(app);

app.listen(port, ()=>{
	console.log('server started on port ' + port);
});
