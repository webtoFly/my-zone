import db from '../models/index.js'

const getList = async () => {
    return db.log.findAll()
}

export default {
    getList
}