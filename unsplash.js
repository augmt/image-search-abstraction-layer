'use strict';

require('isomorphic-fetch');

const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({
  applicationId: process.env.APPLICATION_ID
});

module.exports = unsplash;
