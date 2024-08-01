import KOA from 'koa';
import Router from 'koa-router';
import connection from './config/index.js';

const app = new KOA();
const router = new Router();
app.context.db = connection;

router.get('/list', ctx => new Promise(resolve => {
    const sql = 'SELECT * FROM log_t';
    // eslint-disable-next-line handle-callback-err
    ctx.db.query(sql, (err, data) => {
        ctx.body = data;
        resolve();
    });
})
);

app.use(router.routes());

app.listen(2008);
