'use strict';

import test from 'tape';
import { expect } from 'chai';
import request from 'supertest';
import app from './../src/app.js';

const server = app.listen();

test(app.name, (t) => {
  t.test('image search', (t) => {
    request(server)
      .get('/search?keyword=otter')
      .expect((res) => t.ok(expect(res.header['content-type']).to.match(/json/), 'content-type should be json'))
      .expect((res) => t.ok(res.body.every((result) => {
        return expect(result).to.have.all.keys([
          'context',
          'snippet',
          'thumbnail',
          'url'
        ]);
      }), 'results should consist of all and only the specified properties'))
      .expect(() => t.skip('results should be paginated'))
      .expect(() => t.skip('results should be relevant to search string'))
      .end((err) => t.end(err));
  });

  t.test('recent search strings', (t) => {
    t.plan(3);

    request(server)
      .get('/recent')
      .expect('Content-Type', /json/)
      .end((err) => t.ifError(err, 'content-type should be json'));

    request(server)
      .get('/recent')
      .expect((res) => res.body.recent.every((listing) => {
        return expect(listing).to.have.all.keys([
          'keyword',
          'when'
        ]);
      }))
      .end((err) => t.ifError(err, 'listings should consist of all and only the specified properties'));

    t.skip('should be listed in reverse chronological order');
  });
});

test.onFinish(() => server.close(() => app.context.db.close()));
