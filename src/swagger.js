import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Todo App',
      version: '1.0.0',
      description: 'Add and track tasks',
      contact: {
        name: 'Bertin NDAYISHIMIYE.',
        email: 'neddybertin@gmail.com',
        tel: '+250780636671',
      },
      servers: ['https://localhost:5000'],
    },
  },
  apis: ['src/index.js', 'src/routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
