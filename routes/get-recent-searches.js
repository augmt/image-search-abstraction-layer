'use strict';

export default async function (ctx) {
  let docs;
  try {
    docs = await ctx.db.collection('recent').find({}).toArray();
    docs = docs.map((doc) => ({keyword: doc.keyword, when: doc.when}));
  } catch (err) {
    throw err;
  }

  ctx.body = {recent: docs.reverse()};
  ctx.type = 'json';
}
