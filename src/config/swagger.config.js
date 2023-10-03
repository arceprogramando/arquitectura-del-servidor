const swaggerOpts = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentación con Swagger para mi API (Felipe Arce)',
      description: 'API de ecommerce: cómo usar los endpoints y sus parámetros',
      version: '1.0.0',
    },
  },
  apis: ['./src/docs/**/*.yml'],
};

export default swaggerOpts;
