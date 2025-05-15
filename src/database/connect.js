import Sequelize from 'sequelize';
import 'dotenv/config'


if (!(process.env.MYSQL_USERNAME && process.env.MYSQL_PASSWORD && process.env.MYSQL_HOST && process.env.DB_NAME))
    throw new Error("You must specify a username, password and host in .env file");

const seq = new Sequelize(process.env.DB_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
});

seq.sync({ force: false })
.then(() => {
    console.log('Database synchronized');
})
.catch((error) => {
    console.error('Failed to synchronize database:', error);
});


export default seq;