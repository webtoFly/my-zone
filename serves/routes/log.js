import Router from 'koa-router'
import logController from '../controllers/log.js'
const router = new Router();
router.get('/log/list', logController.getList);
export  default router
