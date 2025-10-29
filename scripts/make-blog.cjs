#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// 引数チェック
defaultUsage = '使い方: npm run make mm-dd';
const dateArg = process.argv[2];
if (!dateArg || !/^\d{2}-\d{2}$/.test(dateArg)) {
  console.error(defaultUsage);
  process.exit(1);
}

// 現在の年を自動取得
const year = new Date().getFullYear().toString();
const [month, day] = dateArg.split('-');
const yy = year.slice(-2); // 年を下二桁に
const yyyymm = `${year}${month}`;
const fileName = `${yy}-${month}-${day}`; // yy-mm-dd 形式
const templatePath = path.join(__dirname, '../src/content/one-sheet/_.mdx');
const outPath = path.join(__dirname, `../src/content/one-sheet/${fileName}.mdx`);

if (fs.existsSync(outPath)) {
  console.error(`エラー: 既に ${fileName}.mdx が存在します`);
  process.exit(1);
}

let template = fs.readFileSync(templatePath, 'utf-8');
// frontmatter の date, image を置換
const fullDate = `${year}-${month}-${day}`;
template = template.replace(/date: .*/, `date: ${fullDate}`);
template = template.replace(/image: .*/, `image: "/img/photos/${yyyymm}/"`);

// ファイル出力
fs.writeFileSync(outPath, template);
console.log(`${fileName}.mdx を作成しました`); 