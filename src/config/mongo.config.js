import mongoose from 'mongoose';
import configObject from './configenvironment.js';

const { DB_CNN, BASE_URL, DB_NAME } = configObject;

const configConnection = {
  url: `${DB_CNN}${DB_NAME}` ?? `mongodb://${BASE_URL}:/${DB_NAME}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(configConnection.url, configConnection.options);
    console.log(`======= URL: ${configConnection.url.substring(0, 20)} =======`);
  } catch (error) {
    console.error(error.message);
  }
};

export default mongoDBConnection;
