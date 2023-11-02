const { ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function formatPath(str) {
  if (!str.endsWith('/')) {
    return str + '/';
  }
}

function isVideoFile(filename) {
    const videoExtensions = ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv']; // 可根据需要添加更多视频文件扩展名
    const fileExtension = path.extname(filename).toLowerCase();
    return videoExtensions.includes(fileExtension);
  }

// 递归获取子文件数量
const getFilesData = (dir, files) => {
  try {
    let result = [];
    files.forEach((file) => {
      // 子文件夹路径
      const filepath = formatPath(dir) + file;
      const stats = fs.statSync(filepath);
      const item = {
        name: file,
        videoCount: 0,
      };
      if (stats.isFile()) {
        // 判断文件是否为视频资源
        if (isVideoFile(filepath)) {
            item.videoCount++;
        }
      } else if (stats.isDirectory()) {
        const files = fs.readdirSync(filepath);
        // 如果是子文件夹，递归地统计子文件夹中的文件数量
        const child = getFilesData(filepath, files);
        let videoCount = 0
        child?.forEach( (item) => {
            videoCount += item.videoCount;
        } )
        item.videoCount = videoCount
      }
      result.push(item);
    });
    return result;
  } catch (error) {
    return error.message;
  }
};

// 读取文件夹
ipcMain.handle('readdir', (event, dir) => {
  try {
    const files = fs.readdirSync(dir);
    const result = getFilesData(dir, files);
    return result;
  } catch (error) {
    return error.message;
  }
});

// 选择文件夹目录
ipcMain.handle('openDirectory', (event) => {
  return dialog.showOpenDialogSync({ properties: ['openDirectory'] });
});
