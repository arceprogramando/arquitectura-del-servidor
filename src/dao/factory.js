import mongoDBConnection from '../config/mongo.config.js';
import configObject from '../config/config.js';

const env = configObject;

const { PERSISTENCE } = env;

let Database;

const initializeDatabase = async () => {
  switch (PERSISTENCE) {
    case 'MONGO':
      try {
        Database = await mongoDBConnection();
        return Database;
      } catch (error) {
        console.error('Error initializing database:', error);
        return null;
      }
    case 'cualquiera':
      console.log('Persistence dentro de Cualquiera.');
      return null;

    default:
      console.log('Se encuentra en el case por default');
      Database = await mongoDBConnection();
      return Database;
  }
};

export default initializeDatabase;
