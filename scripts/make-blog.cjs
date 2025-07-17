#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// 引数チェック
defaultUsage = '使い方: npm run make yyyy-mm-dd';
const dateArg = process.argv[2];
if (!dateArg || !/^\d{4}-\d{2}-\d{2}$/.test(dateArg)) {
  console.error(defaultUsage);
  process.exit(1);
}

const [year, month, day] = dateArg.split('-');
const yyyymm = `${year}${month}`;
const templatePath = path.join(__dirname, '../src/content/blog/_.mdx');
const outPath = path.join(__dirname, `../src/content/blog/${dateArg}.mdx`);

if (fs.existsSync(outPath)) {
  console.error(`エラー: 既に ${dateArg}.mdx が存在します`);
  process.exit(1);
}

let template = fs.readFileSync(templatePath, 'utf-8');
// frontmatter の date, image を置換
template = template.replace(/date: .*/, `date: ${dateArg}`);
template = template.replace(/image: .*/, `image: "/img/photos/${yyyymm}/"`);

// ファイル出力
fs.writeFileSync(outPath, template);
console.log(`${dateArg}.mdx を作成しました`); 