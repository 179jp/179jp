const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const sandboxDir = path.join(__dirname, '../src/content/sand-box');
const outputDir = path.join(__dirname, '../ogp-images');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

(async () => {
  const files = fs.readdirSync(sandboxDir).filter(f => f.endsWith('.md')); // 例: mdファイル
  const browser = await puppeteer.launch();
  for (const file of files) {
    const filePath = path.join(sandboxDir, file);
    const page = await browser.newPage();
    // ここでファイル内容をHTML化して表示する処理を追加
    await page.screenshot({ path: path.join(outputDir, `${file}.png`) });
    await page.close();
  }
  await browser.close();
})();