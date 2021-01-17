import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { Db } from './interfaces/db.interface';

const dbConfig = config.get<Db>('root.db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};
