const performanceConfig = {
  measureStartup: true,
  measureRoutes: true,
  measureMiddlewares: true,
  showDetailedTiming: process.env.NODE_ENV === 'dev',
};

const performanceLogger = {
  time: (label) => {
    if (performanceConfig.measureStartup) {
      console.time(`🔍 ${label}`);
    }
  },
  timeEnd: (label) => {
    if (performanceConfig.measureStartup) {
      console.timeEnd(`🔍 ${label}`);
    }
  },
  mark: (message) => {
    if (performanceConfig.showDetailedTiming) {
      console.log(`⏱️ ${message} - ${Date.now()}`);
    }
  },
};

export { performanceConfig, performanceLogger };
