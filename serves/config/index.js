import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'test'
});

connection.connect(err => {
    if(err) {
        console.log(`mysql connect error:${err.stack}`);
        return;
    }
    console.log(`mysql connected as id${connection.threadId}`);
});
export default connection;
