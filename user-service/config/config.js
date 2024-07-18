import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'db_user_task',
  host: 'localhost',
  dialect: 'postgres',
};

export const jwtConfig = {
  secret: "e2b9b47c79498ca76b9af3ac79acf4dacc2d358dec3f934cd9baee291990a669",
  expiresIn: '24h',
};
