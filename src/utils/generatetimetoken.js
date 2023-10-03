import { v4 as uuidv4 } from 'uuid';

const generateRecoveryToken = () => uuidv4();

export default generateRecoveryToken;
