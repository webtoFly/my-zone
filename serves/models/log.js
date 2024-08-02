export default (sequelize, Sequelize) => {
    const Log = sequelize.define('log', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        create_time: {
            type: Sequelize.DATE
        },
        is_delete: {
            type: Sequelize.INTEGER
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
    return Log
}