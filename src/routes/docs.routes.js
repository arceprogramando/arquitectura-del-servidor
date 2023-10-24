import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOpts from '../config/swagger.config.js';

const router = Router();
const specs = swaggerJSDoc(swaggerOpts);

router.get('/', swaggerUi.serve, swaggerUi.setup(specs));

export default router;
