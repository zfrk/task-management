import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// We can extend it with db or we can publish error other service with RabbitMQ
@Injectable()
export class LoggerService extends Logger {
  constructor(
    context?: string,
    isTimestampEnabled?: boolean,
    private configService?: ConfigService,
  ) {
    super(context, isTimestampEnabled);
  }
  log(message: string, context?: string): void {
    super.log(message, context);
  }
  error(message: string, context?: string): void {
    super.error(message, context);
  }
  static log(message: string, context?: string): void {
    super.log(message, context);
  }
  static error(message: string, context?: string): void {
    super.error(message, context);
  }
}
