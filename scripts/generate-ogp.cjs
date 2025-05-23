const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const sandboxDir = path.join(__dirname, '../src/content/sand-box');
const outputDir = path.join(__dirname, '../public/ogp-images/sand-box');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

(async () => {
  const files = fs.readdirSync(sandboxDir).filter(f => f.endsWith('.md')); // 例: mdファイル
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  for (const file of files) {
    const filePath = path.join(sandboxDir, file);
    const page = await browser.newPage();
    // ここでファイル内容をHTML化して表示する処理を追加
    await page.screenshot({ path: path.join(outputDir, `${file}.png`) });
    await page.close();
  }
  await browser.close();
})();