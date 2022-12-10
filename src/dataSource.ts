import { User } from './entities/UserEntity';
import {DataSource} from 'typeorm'
import { ShortCut } from './entities/ShortcutEntity';
const isProd = process.env.ENV == 'production';
export default new DataSource({
  type: "postgres",
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT || 5432),
  username: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  database: process.env.PGDATABASE || "oslash",
  migrations: [isProd ?'build/migrations/*' : 'src/migrations/*', ],
  entities: [User, ShortCut],
  migrationsRun:true,
  synchronize: false
})


