import mongoose from 'mongoose';
import configObject from './configenvironment.js';

const { DB_CNN, BASE_URL, COLLECTION_NAME } = configObject;

const configConnection = {
  url: `${DB_CNN}${COLLECTION_NAME}` ?? `mongodb://${BASE_URL}:/${COLLECTION_NAME}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(configConnection.url, configConnection.options);
  } catch (error) {
    console.error(error.message);
  }
};

export default mongoDBConnection;
