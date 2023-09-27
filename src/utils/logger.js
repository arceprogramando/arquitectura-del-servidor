import winston from 'winston';
import configObject from '../config/config.js';

const env = configObject.NODE_ENV;

const devLogger = winston.createLogger({
  level: 'verbose',
  transports: [new winston.transports.Console()],
});

const qaLogger = winston.createLogger({
  level: 'verbose',
  transports: [new winston.transports.Console()],
});

const prodLogger = winston.createLogger({
  level: 'http',
  transports: [
    new winston.transports.Console({ level: 'http' }),
    new winston.transports.File({
      filename: './error-prod.log',
      level: 'warn',
    }),
  ],
});

const testLogger = winston.createLogger({
  level: 'http',
  transports: [new winston.transports.Console({ level: 'http' }),
    new winston.transports.File({
      filename: './error-test.log',
      level: 'warn',
    })],
});

const loggerLevels = {
  production: prodLogger,
  qa: qaLogger,
  development: devLogger,
  test: testLogger,
};

const setLogger = (req, res, next) => {
  try {
    //   if (env === 'production') {
    //     req.logger = loggerLevels.production;
    //   } else if (env === 'qa') {
    //     req.logger = loggerLevels.qa;
    //   } else if (env === 'development') {
    //     req.logger = loggerLevels.development;
    //   } else if (env === 'test') {
    //     req.logger = loggerLevels.test;
    //   }

    const logger = loggerLevels[env];
    if (!logger) {
      throw new Error(`Logger no encontrado para el entorno: ${env}`);
    }

    req.logger = logger;
    next();

  } catch (error) {
    console.error(`Error en setLogger: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default setLogger;
