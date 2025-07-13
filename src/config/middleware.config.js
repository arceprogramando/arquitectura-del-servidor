import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import express from 'express';
import { engine } from 'express-handlebars';
import passport from 'passport';

import __dirname from '../utils.js';
import setLogger from '../utils/logger.js';
import { setupSession } from './session.config.js';
import initializePassport from './passport.config.js';
import userMiddleware from '../middleware/user.middleware.js';

export const setupMiddlewares = (app) => {
  app.use(
    cors({
      origin: app.get('CORS_ORIGIN') || '*',
      methods: app.get('METHOD_ORIGINS')?.split(',') || ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }),
  );

  app.use(cookieParser());
  app.use(compression({ brotli: { enable: true, zlib: {} } }));
  app.use(setLogger);

  app.use(express.static(`${__dirname}/public`));
  app.use(express.json({ limit: '500kb' }));
  app.use(express.urlencoded({ extended: true }));
};

export const setupViewEngine = (app) => {
  app.engine(
    'handlebars',
    engine({
      defaultLayout: 'layout',
      partialsDir: `${__dirname}/views/partials`,
      helpers: {
        currentYear: () => new Date().getFullYear(),
        eq: (a, b) => a === b,
        formatDate: (date) => new Date(date).toLocaleDateString('es-ES'),
        json: (context) => JSON.stringify(context),

        // Helper para verificar si un producto tiene stock
        hasStock: (producto) => {
          if (!producto.talles) return false;
          return producto.talles.some(
            (talle) => talle.variantes && talle.variantes.some((variante) => variante.cantidad > 0),
          );
        },

        // Helper para verificar si un talle tiene stock
        talleHasStock: (talle) => {
          if (!talle.variantes) return false;
          return talle.variantes.some((variante) => variante.cantidad > 0);
        },

        // Helper para obtener colores únicos de un producto
        getUniqueColors: (producto) => {
          if (!producto.talles) return [];
          const colores = new Set();
          producto.talles.forEach((talle) => {
            if (talle.variantes) {
              talle.variantes.forEach((variante) => {
                if (variante.cantidad > 0) {
                  colores.add(variante.color);
                }
              });
            }
          });
          return Array.from(colores);
        },

        // Helper para obtener stock total de un talle
        getTalleStock: (talle) => {
          if (!talle.variantes) return 0;
          return talle.variantes.reduce((total, variante) => total + (variante.cantidad || 0), 0);
        },

        // Helper para obtener stock total del producto
        getTotalStock: (producto) => {
          if (!producto.talles) return 0;
          return producto.talles.reduce((total, talle) => {
            if (talle.variantes) {
              return (
                total + talle.variantes.reduce(
                  (talleTotal, variante) => talleTotal + (variante.cantidad || 0),
                  0,
                )
              );
            }
            return total;
          }, 0);
        },

        // Helper para verificar si hay algún producto con stock en el array
        hasAnyProductsWithStock: (productos) => {
          if (!productos || !Array.isArray(productos)) return false;
          return productos.some((producto) => {
            if (!producto.talles) return false;
            return producto.talles.some(
              (talle) => talle.variantes && talle.variantes.some((variante) => variante.cantidad > 0),
            );
          });
        },

        // Helper para obtener substring
        substring: (str, start, end) => {
          if (!str) return '';
          return str.substring(start, end);
        },
      },
    }),
  );
  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'handlebars');
};

export const setupAuthentication = (app) => {
  setupSession(app);

  initializePassport();
  app.use(passport.initialize());
  app.use(passport.session());

  // Middleware para pasar datos del usuario a todas las vistas
  app.use(userMiddleware);
};

export default {
  setupMiddlewares,
  setupViewEngine,
  setupAuthentication,
};
