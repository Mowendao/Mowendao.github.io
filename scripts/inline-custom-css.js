/*
 * 站点构建期的两处小改装（不改主题源码）：
 *
 * 1. 把 source/css/custom.css 内联进每个页面的 <head> 末尾。
 *    为什么不用主题的 custom_file_path：它的 style 通道走 Stylus 重编译，
 *    head 通道依赖主题注入时机（实测在 _config.next.yml 里不生效）。
 *
 * 2. 首页文章列表前插入 source/_data/home-intro.html。
 *    为什么不用主题的 header 注入点：同上，注入不生效。
 */
'use strict';

const fs = require('fs');
const path = require('path');

function readIfExists(...parts) {
  const file = path.join(hexo.base_dir, ...parts);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
}

hexo.extend.filter.register('after_render:html', function (html) {
  // --- 样式 ---
  const css = readIfExists('source', 'css', 'custom.css');
  if (css && !html.includes('/* custom.css */')) {
    html = html.replace('</head>', `<style>/* custom.css */\n${css}</style>\n</head>`);
  }

  // --- 首页导览条 ---
  const intro = readIfExists('source', '_data', 'home-intro.html');
  const slot = '<div class="main-inner index posts-expand">';
  if (intro && html.includes(slot) && !html.includes('class="home-intro"')) {
    html = html.replace(slot, `${slot}\n${intro.trim()}`);
  }

  return html;
}, 20);
