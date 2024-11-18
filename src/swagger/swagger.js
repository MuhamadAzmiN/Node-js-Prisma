import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Konfigurasi Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Dokumentasi untuk API Node.js Express.js',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'UUID',  // Menggunakan UUID sebagai format token
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3026', // Ganti dengan URL server Anda
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controller/*.js'],
};

// Generate spesifikasi Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
