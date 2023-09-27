import winston from 'winston';
import configObject from '../config/config.js';

const env = configObject.NODE_ENV;

const customLevels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  debug: 4,
  http: 5,
};

const customColors = {
  fatal: 'red',
  error: 'red',
  warning: 'yellow',
  info: 'blue',
  debug: 'green',
  http: 'green',
};

winston.addColors(customColors);

const prodLogger = winston.createLogger({
  levels: customLevels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({
      filename: './error-prod.log',
      level: 'warn',
    }),
  ],
});

const devLogger = winston.createLogger({
  levels: customLevels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple(),
  ),
  transports: [new winston.transports.Console({ level: 'debug' })],
});

const qaLogger = winston.createLogger({
  levels: customLevels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple(),
  ),
  transports: [new winston.transports.Console({ level: 'debug' })],
});

const testLogger = winston.createLogger({
  levels: customLevels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({
      filename: './error-test.log',
      level: 'warn',
    }),
  ],
});

const loggerLevels = {
  prod: prodLogger,
  qa: qaLogger,
  dev: devLogger,
  test: testLogger,
};

const setLogger = (req, res, next) => {
  try {
    const logger = loggerLevels[env];
    if (!logger) {
      throw new Error(`Logger no encontrado para el entorno: ${env}`);
    }

    req.logger = logger;
    next();
  } catch (error) {
    console.error(`Error en setLogger: ${error}`);
    res.status(500).json({ error: `Internal Server Error ${error} ` });
  }
};

export default setLogger;
