import KOA from 'koa'
import Router from 'koa-router'
import connection from "./config/index.js";

const app = new KOA()
const router = new Router()
app.context.db = connection
router.get("/list", (ctx, next) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM log_t`
            ctx.db.query(sql, (err, data) => {
                ctx.body = data
                resolve()
            })
        })
    }
)

app.use(router.routes())

app.listen(3000)
