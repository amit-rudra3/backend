import express from 'express';
import { Sequelize } from 'sequelize';
import authRoutes from './routes/authRoutes.js'

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = new Sequelize('postgres://postgres:mysecretpassword@localhost:5432/db_user_task');
// const sequelize = new Sequelize('postgres://user:password@db:5432/db');




async function checkConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

async function createTable() {
    try {
        const [result, metadata] = await sequelize.query(`
            CREATE TABLE if not exists users (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR(255) NOT NULL,
                "email" VARCHAR(255) NOT NULL UNIQUE,
                "password" VARCHAR(255) NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );

            `);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
};


  
checkConnection();
createTable();

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`User Service listening on port ${PORT}`);
});
