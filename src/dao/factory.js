import mongoDBConnection from '../config/mongo.config.js';
import configObject from '../config/config.js';

const env = configObject;

const { PERSISTENCE } = env;

let Database;

const initializeDatabase = async (req, res) => {
  try {
    switch (PERSISTENCE) {
      case 'MONGO':
        Database = await mongoDBConnection();
        return Database;
      case 'FILESYSTEM':
        // TODO: Hacer conexion con filesystem
        return Database;
      default:
        Database = await mongoDBConnection();
        return Database;
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    return res.status(500).json({ error: 'Error initializing database' });
  }
};

export default initializeDatabase;
