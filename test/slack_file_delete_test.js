/* eslint-env mocha */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const slack_file_delete = require('../src/slack_file_delete');
const filter_files = slack_file_delete.filter_files;

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

  assert.deepStrictEqual(filter_files(sample, 10000), expected);
});
