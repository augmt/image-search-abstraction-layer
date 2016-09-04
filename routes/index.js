'use strict';

import Router from 'koa-router';
import getRecentSearches from './get-recent-searches.js';
import performSearch from './perform-search.js';

const router = module.exports = new Router();

router.get('/', (ctx) => {
  ctx.throw(404);
});

router.get('/recent', getRecentSearches);
router.get('/search', performSearch);
