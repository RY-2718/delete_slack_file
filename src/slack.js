const fs = require('fs');
const request = require('request');

/*
  files.listで受け取ったjsonから消したくないファイルを消す関数
  条件を変えたいときははfilterに渡している関数とテストを書き換えればよい

  @param {Object} json files.listで受け取ったJSON
  @param {integer} fileSize fileSize以下の大きさのファイルは消えない
  @return {Object} json 入力のjsonから消したくないファイルを消したもの
*/
const filter_files = (json, fileSize) => {
  json['files'] = json['files'].filter(file => {
    if ('pinned_to' in file || file['size'] < fileSize) {
      return false;
    }
    return true;
  });
  return json;
};

/*
  files.listで受け取ったjsonから一部だけ抜き出す関数
  console.logに吐き出すとき見やすい！

  @param {Object} json files.listで受け取ったJSON（にフィルタをかけたもの）
  @return {Object} json 入力の一部の属性を抜き取ったもの
*/
const shorten = json => {
  let result = {
    files: [],
    paging: json['paging'],
  };
  json['files'].forEach((file, i) => {
    result['files'][i] = {
      id: file['id'],
      created: file['created'],
      title: unescape(file['title']),
      size: file['size'],
      url_private: unescape(file['url_private']),
    };
  });
  return result;
};

/*
  消したいファイルのIDを渡すと消すためのHTTPS POSTをしてくれる

  @param file {String} 消したいファイルのID
  @param success_log {String} 成功したファイルIDを書き溜めるlogのpath
  @param error_log {String} 失敗したときの情報を書き込むlogのpath
*/
const delete_file = (file, success_log, error_log) => {
  request.post(
    {
      url: 'https://slack.com/api/files.delete',
      form: {
        token: process.env.TOKEN, // TODO: この部分でprocess.envに依存していて良いのか？
        file: file['id'],
      },
    },
    error => {
      if (error) {
        fs.appendFileSync(
          error_log,
          `File ID ${file['id']}の削除に失敗しました\n`
        );
        console.error(`File ID ${file['id']}の削除に失敗しました`);
      } else {
        fs.appendFileSync(success_log, `${file['id']}\n`);
        console.log(file['id']);
      }
    }
  );
};

module.exports = {
  filter_files: filter_files,
  shorten: shorten,
  delete_file: delete_file,
};
