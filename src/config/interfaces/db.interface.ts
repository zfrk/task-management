import { DatabaseType } from 'typeorm';

export interface Db {
  readonly type: 'postgres';
  readonly port: number;
  readonly database: string;
  readonly host: string;
  readonly username: string;
  readonly password: string;
  readonly synchronize: boolean;

}
