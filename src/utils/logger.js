import winston from 'winston';
import configObject from '../config/config.js';

const environment = configObject.NODE_ENV;

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
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ all: true, colors: customColors }),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({
      filename: './error-prod.log',
      level: 'info',
    }),
  ],
});

const devLogger = winston.createLogger({
  levels: customLevels,
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize({ all: true, colors: customColors }),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({
      filename: './error-dev.log',
      level: 'debug',
    }),
  ],
});

const loggerLevels = {
  prod: prodLogger,
  dev: devLogger,
};

const setLogger = (req, res, next) => {
  try {
    req.logger = loggerLevels[environment];

    req.logger.http(
      `Method: ${req.method}, url: ${
        req.url
      } - time: ${new Date().toLocaleTimeString()}`,
    );
    next();
  } catch (error) {
    console.error(`Error en setLogger: ${error}`);
    res.status(500).json({ error: `Internal Server Error ${error} ` });
  }
};

export default setLogger;
