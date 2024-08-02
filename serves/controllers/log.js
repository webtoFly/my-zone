import logService from  '../services/log.js';

const getList = async (ctx) => {
    console.log(ctx.params,222)
    const {request, response} = ctx
    try{
        const res =await logService.getList()
        ctx.body = JSON.stringify(res)
        console.log(res,'res')
    }catch (e) {
        ctx.throw(400,e.message)
    }
}
export default {
    getList
}