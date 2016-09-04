'use strict';

import {MongoClient as mongo} from 'mongodb';

export default async function (app) {
  const db = app.context.db = await mongo.connect(process.env.MONGO_URL, {bufferMaxEntries: 0});
  await db.collection('recent').createIndex({expireAt: 1}, {expireAfterSeconds: 0});
}
