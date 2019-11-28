const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

router.get('/api/test', ctx => {
  return new Promise(resolve => {
    const query = ctx.request.query;
    const timeout = Number.parseInt(query.timeout) || 0;
    setTimeout(() => {
      resolve('hello' + Date.now());
    }, timeout);
  }).then(data => {
    ctx.body = data;
  });
});

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());

app.listen(3001);
