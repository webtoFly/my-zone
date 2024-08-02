import {Sequelize} from 'sequelize'
import logModel from './log.js'
const sequelize = new Sequelize('test', 'root', '123456', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.log = logModel(sequelize, Sequelize);
export default db
