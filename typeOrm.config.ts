
import { DataSource } from 'typeorm';
 
export default new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    url:process.env.DATABASE_URL,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: String(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DB,
    entities: ['dist/**/*.entity.js'],
    migrations: ["dist/migrations/**/*.js"],
    migrationsTableName: "migration"
});