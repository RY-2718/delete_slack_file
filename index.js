'use strict';

require('dotenv').config();

const https = require('https');
const URL = `https://slack.com/api/channels.list?token=${process.env.TOKEN}`;

https
  .get(URL, res => {
    let body = '';
    res.setEncoding('utf8');

    res.on('data', chunk => {
      body += chunk;
    });

    res.on('end', res => {
      res = JSON.parse(body);
      console.log(res);
    });
  })
  .on('error', e => {
    // エラー時の挙動
    console.log(e.message);
  });
