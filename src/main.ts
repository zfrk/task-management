import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Server } from './config/interfaces/server.interface';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: true });
  const loggerService = app.get(LoggerService);
  loggerService.setContext('Server Start');
  app.useLogger(app.get(LoggerService));
  const configReader = app.get(ConfigService);
  const serverConfig = configReader.get<Server>('server');
  try {
    await app.listen(serverConfig.port);
    loggerService.log(`Application Listening Port '${serverConfig.port}'`);
  } catch (error) {
    loggerService.log('Application Start Error', error.stack);
  }
}
bootstrap();
