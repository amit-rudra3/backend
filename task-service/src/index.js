import express from 'express';
import { Sequelize } from 'sequelize';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 3002;

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
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                user_id INTEGER REFERENCES users(id),
                status VARCHAR(50) NOT NULL,
                due_date DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Task Service listening on port ${PORT}`);
});
