'use strict';

import Router from 'koa-router';
import unsplash from './unsplash.js';
import nextDay from 'next-day';

const router = new Router();

router.get('/search', async (ctx) => {
  ctx.assert(ctx.query.keyword, 404);

  const {keyword, offset: page} = ctx.query;
  const res = await unsplash.search.photos(keyword, page);
  const json = await res.json();

  ctx.body = json.results.map((result) => ({
    url: result.urls.raw,
    snippet: result.categories.map((category) => category.title).join(', '),
    thumbnail: result.urls.thumb,
    context: result.links.html
  }));
  ctx.type = 'json';

  try {
    const now = new Date();
    const tomorrow = now.getDay() % 7 + 1;

    await ctx.db.collection('recent').insert({
      keyword,
      when: now.toGMTString(),
      expireAt: nextDay(now, tomorrow).date.getTime()
    });
  } catch (err) {
    // pass
  }
});

router.get('/recent', async (ctx) => {
  const docs = await ctx.db.collection('recent').find({}).toArray();
  const recent = docs.map((document) => ({
    keyword: document.keyword,
    when: document.when
  }));

  ctx.body = {recent: recent.reverse()};
  ctx.type = 'json';
});

export default router;
