'use strict';

import Unsplash from 'unsplash-js';
import fetch from 'node-fetch';

global.fetch = fetch;

export default new Unsplash({
  applicationId: process.env.APPLICATION_ID,
  secret: process.env.SECRET,
  callbackUrl: process.env.CALLBACK_URL
});
