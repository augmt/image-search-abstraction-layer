'use strict';

const test = require('tape');
const request = require('supertest');
const fetchMock = require('fetch-mock');
const simple = require('simple-mock');
const fixtureData = require('../fixtures/results.json');
const app = require('../../app.js');

const server = app.listen();

test('server', async t => {
  t.plan(2);

  function runGetLatestTest() {
    request(server)
      .get('/latest')
      .expect('content-type', /json/)
      .expect(200, [{keyword: 'chickadee', when: '2016-10-01T00:00:00.000Z'}])
      .end(err => t.error(err, '200 GET /latest', err));
  }

  await app.context.db.get('imagesearch').remove();
  fetchMock.getOnce(fixtureData);
  simple.mock(Date, 'now').returnWith(1475280000000);

  request(server)
    .get('/search?keyword=chickadee')
    .expect('content-type', /json/)
    .expect(200, [{
      user: {
        name: 'Paulo Brandao',
        small: 'https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=0ad68f44c4725d5a3fda019bab9d3edc',
        html: 'https://unsplash.com/@pbrandao'
      },
      photo: {
        small: 'https://images.unsplash.com/uploads/141155339325423394b24/03982423?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=a774bcd623ceee7c409b1a3ee4c3f032',
        html: 'https://unsplash.com/photos/YLgTmdb7r1o'
      }
    }])
    .then(
      res => {
        t.pass('200 GET /search?keyword');
        runGetLatestTest();
      },
      err => {
        t.fail(err);
        t.skip('200 GET /latest');
      }
    )
    .then(() => simple.restore());
});

test.onFinish(async () => {
  await app.context.db.get('imagesearch').remove();
  await app.context.db.close();
  await server.close();
});
