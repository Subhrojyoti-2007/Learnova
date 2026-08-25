const fs = require('fs');
const sharp = require('sharp');

async function processImage() {
  try {
    const { data, info } = await sharp('public/images/hero-avatar.jpg')
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;
    const newData = Buffer.alloc(width * height * 4);
    
    for (let i = 0; i < width * height; i++) {
      newData[i * 4] = data[i * 3];
      newData[i * 4 + 1] = data[i * 3 + 1];
      newData[i * 4 + 2] = data[i * 3 + 2];
      newData[i * 4 + 3] = 255;
    }

    const visited = new Uint8Array(width * height);
    const qX = new Int32Array(width * height);
    const qY = new Int32Array(width * height);
    let head = 0;
    let tail = 0;

    function push(x, y) {
      const idx = y * width + x;
      if (!visited[idx]) {
        visited[idx] = 1;
        qX[tail] = x;
        qY[tail] = y;
        tail++;
      }
    }

    function isDark(x, y) {
      if (x < 0 || x >= width || y < 0 || y >= height) return false;
      const idx = (y * width + x) * 3;
      return Math.max(data[idx], data[idx+1], data[idx+2]) < 40;
    }

    for (let x = 0; x < width; x++) {
      if (isDark(x, 0)) push(x, 0);
      if (isDark(x, height - 1)) push(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
      if (isDark(0, y)) push(0, y);
      if (isDark(width - 1, y)) push(width - 1, y);
    }

    while (head < tail) {
      const x = qX[head];
      const y = qY[head];
      head++;
      
      const pIdx = y * width + x;
      const maxVal = Math.max(data[pIdx*3], data[pIdx*3+1], data[pIdx*3+2]);
      
      let alpha = 0;
      if (maxVal >= 10) {
         alpha = Math.floor(((maxVal - 10) / 30) * 255);
      }
      newData[pIdx * 4 + 3] = alpha;

      if (maxVal < 15) {
        if (x > 0 && isDark(x - 1, y)) push(x - 1, y);
        if (x < width - 1 && isDark(x + 1, y)) push(x + 1, y);
        if (y > 0 && isDark(x, y - 1)) push(x, y - 1);
        if (y < height - 1 && isDark(x, y + 1)) push(x, y + 1);
      }
    }

    await sharp(newData, {
      raw: {
        width: width,
        height: height,
        channels: 4
      }
    }).png().toFile('public/images/hero-avatar.png');
    
    console.log("Successfully created flood-filled transparent PNG!");
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

processImage();
