import viewsRouter from '../routes/views.router.js';
import userRoutes from '../routes/user.routes.js';
import sessionRouter from '../routes/session.routes.js';
import productRouter from '../routes/products.routes.js';
import cartRouter from '../routes/carts.routes.js';
import messageRouter from '../routes/message.routes.js';
import sendEmail from '../routes/email.routes.js';
import ticketRouter from '../routes/ticket.routes.js';
import loggerRouter from '../routes/logger.routes.js';
import docsRouter from '../routes/docs.routes.js';

const setupRoutes = (app) => {
  app.use('/', viewsRouter);
  app.use('/api/users', userRoutes);
  app.use('/api/session', sessionRouter);
  app.use('/api/products', productRouter);
  app.use('/api/carts', cartRouter);
  app.use('/api/chat', messageRouter);
  app.use('/api/email', sendEmail);
  app.use('/api/tickets', ticketRouter);
  app.use('/loggertest', loggerRouter);
  app.use('/api/docs', docsRouter);
};

export default setupRoutes;
