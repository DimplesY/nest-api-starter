import { utilities } from 'nest-winston';
import {
  APP_NAME,
  LOGGER_CHUNK_SIZE,
  LOGGER_DATE_PATTERN,
  LOGGER_DIR,
  LOGGER_RESERVE_TIME,
  LOGGER_TIME_FORMAT,
} from '@/app.config';
import * as winston from 'winston';
import { createLogger } from 'winston';
import 'winston-daily-rotate-file';
import { IS_PRODUCTION } from '@/global/env.global';

const format = winston.format.combine(
  winston.format.timestamp({ format: LOGGER_TIME_FORMAT }),
  winston.format.json(),
  winston.format.prettyPrint(),
);

const consoleLogTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp({ format: LOGGER_TIME_FORMAT }),
    winston.format.ms(),
    utilities.format.nestLike(APP_NAME),
  ),
});

type LoggerLevel = 'info' | 'warn' | 'error';

function createFileLoggerTransport(level: LoggerLevel) {
  return new winston.transports.DailyRotateFile({
    level,
    dirname: LOGGER_DIR,
    filename: `${level}-%DATE%.log`,
    format,
    datePattern: LOGGER_DATE_PATTERN,
    zippedArchive: true,
    maxSize: LOGGER_CHUNK_SIZE,
    maxFiles: LOGGER_RESERVE_TIME,
  });
}

const infoLogTransport = createFileLoggerTransport('info');

const warnLogTransport = createFileLoggerTransport('warn');

const errorLogTransport = createFileLoggerTransport('error');

const logger = createLogger();

if (IS_PRODUCTION) {
  logger.add(infoLogTransport);
  logger.add(warnLogTransport);
  logger.add(errorLogTransport);
}

if (!IS_PRODUCTION) {
  logger.add(consoleLogTransport);
}

export { logger };
