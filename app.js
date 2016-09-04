'use strict';

global.fetch = require('node-fetch');

import Koa from 'koa';
import cors from 'kcors';
import json from 'koa-json';
import router from './routes';
import dbPromise from './db.js';

const app = module.exports = new Koa();

dbPromise(app).catch((err) => app.emit('error', err)).then(() => {
  app.use(cors());
  app.use(json());
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      app.emit('error', err);
    }
  });
  app.use(router.routes());
});
