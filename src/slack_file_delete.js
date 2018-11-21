const filter_files = (json, fileSize) => {
  json['files'] = json['files'].filter(file => {
    if ('pinned_to' in file || file['size'] < fileSize) {
      return false;
    }
    return true;
  });
  return json;
};

module.exports.filter_files = filter_files;
