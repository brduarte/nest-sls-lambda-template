import { DataSource } from 'typeorm';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'mongodb',
    host: String(process.env.DB_HOST),
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_NAME),
    autoLoadEntities: true,
    synchronize: false,
  },
});
