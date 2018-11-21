/* eslint-env mocha */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const slack = require('../src/slack');

describe('filter_file', () => {
  it('filters pinned item', () => {
    const sample = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, './fixtures/filter_files_sample.json'),
        'utf8'
      )
    );
    const expected = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, './fixtures/filter_files_expected.json'),
        'utf8'
      )
    );

    assert.deepStrictEqual(slack.filter_files(sample, 10000), expected);
  });
});

describe('shorten', () => {
  it('shorten json', () => {
    const sample = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, './fixtures/shorten_sample.json'),
        'utf8'
      )
    );
    const expected = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, './fixtures/shorten_expected.json'),
        'utf8'
      )
    );

    assert.deepStrictEqual(slack.shorten(sample), expected);
  });
});
