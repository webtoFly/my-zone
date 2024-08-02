import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logRoutes from './routes/log.js'
const app = new Koa();
app.use(bodyParser());
app.use(logRoutes.routes())
app.listen(2000, () => {
    console.log('Server is running at http://localhost:2000')
});
export default app