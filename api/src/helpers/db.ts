import {Sequelize} from 'sequelize-typescript';
import {Todo} from '../models/Todo';

const db = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
});

db.addModels([Todo]);

(async () => {
  await db.sync();
})();


export {db};