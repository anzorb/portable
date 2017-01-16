var fs = require('fs');
var path = require('path');
var mime = require('mime');


var isUnixHiddenPath = function(path) {
    return (/(^|\/)\.[^\/\.]/g).test(path);
};

self.onmessage = function(msg) {
    self.postMessage('message receieved');
    console.log(msg.data);
    if (msg.data.action && msg.data.action === 'readdir') {
        const dirPath = msg.data.payload.path;
        const files = [];
        const fileList = fs.readdirSync(dirPath);
        fileList.forEach(file => {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);
            if (!isUnixHiddenPath(file)) {
                files.push({
                    name: file,
                    path: filePath,
                    isDir: stat.isDirectory(),
                    mime: mime.lookup(filePath)
                });
            }
        });
        self.postMessage({
            action: 'readdir',
            payload: { files }
        });
    }
}