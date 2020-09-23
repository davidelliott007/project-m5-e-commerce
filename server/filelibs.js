var fs = require("fs");

const openFilePromise = (filename) => {
  myPromise = new Promise((resolve, reject) => {
    fs.readFile(filename, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
  return myPromise;
};

const openTextFilePromise = (filename) => {
  myPromise = new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
  return myPromise;
};

const writeFile = (filename, jsonToWrite) => {
  let myPromise = new Promise((resolve, reject) => {
    let file_plus_dir = "./data/" + filename;
    fs.writeFile(file_plus_dir, JSON.stringify(jsonToWrite), function (err) {
      if (err) {
        reject(err);
      }
      resolve(file_plus_dir + " was saved!");
    });
  });
  return myPromise;
};

module.exports = {
  openFilePromise,
  openTextFilePromise,
  writeFile,
};
