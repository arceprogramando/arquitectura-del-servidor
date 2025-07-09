import configObject from './configenvironment.js';

const LOG_LEVELS = {
  dev: {
    timing: true,
    verbose: true,
    routes: true,
    debug: true,
  },
  qa: {
    timing: false,
    verbose: true,
    routes: false,
    debug: false,
  },
  prod: {
    timing: false,
    verbose: false,
    routes: false,
    debug: false,
  },
};

const currentLevel = LOG_LEVELS[configObject.NODE_ENV] || LOG_LEVELS.prod;

export const logger = {
  info: currentLevel.verbose ? console.log : () => {},
  error: console.error,
  warn: console.warn,
  debug: currentLevel.debug ? console.log : () => {},
  time: currentLevel.timing ? console.time : () => {},
  timeEnd: currentLevel.timing ? console.timeEnd : () => {},
  routes: currentLevel.routes,
};

export default logger;
