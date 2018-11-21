'use strict';

require('dotenv').config();

const httpClient = require('request');
const fs = require('fs');

const slack = require('./src/slack');

const ts_to_date = new Date(2018, 3, 1, 9, 0, 0, 0);
let total_size = 0;

httpClient.get(
  {
    url: 'https://slack.com/api/files.list',
    qs: {
      token: process.env.TOKEN,
      count: 1000,
      ts_to: Math.floor(ts_to_date.getTime() / 1000),
    },
  },
  (error, response, body) => {
    const json = slack.filter_files(JSON.parse(body), 10 ** 6);
    fs.writeFileSync(
      'sample_data/files.json',
      JSON.stringify(slack.shorten(json))
    );
    json['files'].forEach(file => {
      total_size += file['size'];
    });
    console.log(total_size);
  }
);
