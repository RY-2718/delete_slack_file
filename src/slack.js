const filter_files = (json, fileSize) => {
  json['files'] = json['files'].filter(file => {
    if ('pinned_to' in file || file['size'] < fileSize) {
      return false;
    }
    return true;
  });
  return json;
};

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

module.exports = {
  filter_files: filter_files,
  shorten: shorten,
};
