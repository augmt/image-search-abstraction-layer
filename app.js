'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const monk = require('monk');
const unsplash = require('./unsplash.js');

const app = new Koa();
const router = new Router();
const db = app.context.db = monk(process.env.MONGO_URI);

router.get('/search', async ctx => {
  const {keyword, page, per_page} = ctx.query;
  const response = await unsplash.search.photos(keyword, page, per_page);
  const json = await response.json();

  ctx.body = json.results.map(({user, urls, links}) => ({
    user: {
      name: user.name,
      small: user.profile_image.small,
      html: user.links.html
    },
    photo: {
      small: urls.small,
      html: links.html
    }
  }));
  ctx.type = 'json';

  await db.get('imagesearch').insert({keyword, when: Date.now()});
});

router.get('/latest', async ctx => {
  const docs = await db.get('imagesearch').find({}, {sort: '-when'});
  ctx.body = docs.map(({keyword, when}) => ({keyword, when: new Date(when)}));
  ctx.type = 'json';
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
