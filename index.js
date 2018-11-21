'use strict';

require('dotenv').config();

const request = require('request');
const fs = require('fs');
const path = require('path');

const slack = require('./src/slack');

const ts_to_date = new Date(2018, 3, 1, 9, 0, 0, 0);
let total_size = 0;

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

request.get(
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
    fs.writeFileSync('./logs/files.json', body);
    json['files'].forEach(file => {
      total_size += file['size'];
      slack.delete_file(
        file['id'],
        path.resolve(__dirname, './logs/success.txt'),
        path.resolve(__dirname, './logs/error.txt')
      );
    });
    console.log(total_size);
  }
);
