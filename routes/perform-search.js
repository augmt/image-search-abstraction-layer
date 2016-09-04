'use strict';

import unsplash from './../unsplash.js';
import nextDay from 'next-day';

export default async function (ctx) {
  ctx.assert(ctx.query.keyword);

  const {keyword, page: page=1} = ctx.query;
  const res = await unsplash.search.photos(keyword, page);
  const json = await res.json();

  ctx.body = json.results.map((result) => ({
    url: result.urls.raw,
    snippet: result.categories.map(category => category.title).join(', '),
    thumbnail: result.urls.thumb,
    context: result.links.html
  }));
  ctx.type = 'json';

  const now = new Date();
  try {
    await ctx.db.collection('recent').insert({
      keyword,
      when: now.toGMTString(),
      expireAt: nextDay(now, 0).date.getTime()
    });
  } catch (err) {
    throw err;
  }
}
