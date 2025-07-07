import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOpts from '../config/swagger.config.js';

const router = Router();
const specs = swaggerJSDoc(swaggerOpts);

// Swagger UI necesita usar .use() para servir archivos estáticos correctamente
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs));

export default router;
