// 自定义表情包配置
const customEmojis = {
  // 在这里添加您的表情包映射
  // 格式：'表情包名称': 'https://xxx.com/xxx/xxx/xxx.png'

  // 示例（请替换为您的实际表情包）
  '皱眉': 'https://img.iduan.me/blog/emoji/zhoumei.png',
  '再见': 'https://img.iduan.me/blog/emoji/zaijian.png',
  '晕': 'https://img.iduan.me/blog/emoji/yun.png',
  '疑问': 'https://img.iduan.me/blog/emoji/yiwen.png',
  '阴险': 'https://img.iduan.me/blog/emoji/yinxian.png',
  '嘘': 'https://img.iduan.me/blog/emoji/xu.png',
  '心碎': 'https://img.iduan.me/blog/emoji/xinsui.png',
  '笑脸': 'https://img.iduan.me/blog/emoji/xiaolian.png',
  '笑哭': 'https://img.iduan.me/blog/emoji/xiaoku.png',
  '捂脸': 'https://img.iduan.me/blog/emoji/wulian.png',
  '微笑': 'https://img.iduan.me/blog/emoji/weixiao.png',
  '偷笑': 'https://img.iduan.me/blog/emoji/touxiao.png',
  '调皮': 'https://img.iduan.me/blog/emoji/tiaopi.png',
  '睡': 'https://img.iduan.me/blog/emoji/shui.png',
  '屎': 'https://img.iduan.me/blog/emoji/shi.png',
  '社会': 'https://img.iduan.me/blog/emoji/shehui.png',
  '色': 'https://img.iduan.me/blog/emoji/se.png',
  '弱': 'https://img.iduan.me/blog/emoji/ruo.png',
  '偷看': 'https://img.iduan.me/blog/emoji/rangwokankan.png',
  '敲打': 'https://img.iduan.me/blog/emoji/qiaoda.png',
  '强': 'https://img.iduan.me/blog/emoji/qiang.png',
  '流泪': 'https://img.iduan.me/blog/emoji/liulei.png',
  '苦涩': 'https://img.iduan.me/blog/emoji/kuse.png',
  '裂开': 'https://img.iduan.me/blog/emoji/liekai.png',
  '囧': 'https://img.iduan.me/blog/emoji/jiong.png',
  '惊恐': 'https://img.iduan.me/blog/emoji/jingkong.png',
  '奸笑': 'https://img.iduan.me/blog/emoji/jianxiao.png',
  '坏笑': 'https://img.iduan.me/blog/emoji/huaixiao.png',
  '合十': 'https://img.iduan.me/blog/emoji/heshi.png',
  '好的': 'https://img.iduan.me/blog/emoji/haode.png',
  '汉': 'https://img.iduan.me/blog/emoji/han.png',
  '害羞': 'https://img.iduan.me/blog/emoji/haixiu.png',
  '勾引': 'https://img.iduan.me/blog/emoji/gouyin.png',
  '尴尬': 'https://img.iduan.me/blog/emoji/ganga.png',
  '发怒': 'https://img.iduan.me/blog/emoji/fanu.png',
  'emm': 'https://img.iduan.me/blog/emoji/emm.png',
  'doge': 'https://img.iduan.me/blog/emoji/doge.png',
  '得意': 'https://img.iduan.me/blog/emoji/deyi.png',
  '蛋糕': 'https://img.iduan.me/blog/emoji/dangao.png',
  '打脸': 'https://img.iduan.me/blog/emoji/dalian.png',
  '出汗': 'https://img.iduan.me/blog/emoji/chuhan.png',
  '吃瓜': 'https://img.iduan.me/blog/emoji/chigua.png',
  '菜刀': 'https://img.iduan.me/blog/emoji/caidao.png',
  '闭嘴': 'https://img.iduan.me/blog/emoji/bizui.png',
  '抱拳': 'https://img.iduan.me/blog/emoji/baoquan.png',
  '白眼': 'https://img.iduan.me/blog/emoji/baiyan.png',
  '爱心': 'https://img.iduan.me/blog/emoji/aixin.png',
  '666': 'https://img.iduan.me/blog/emoji/666.png',

  // 添加更多表情包...
};

// 表情包基础 URL（如果所有表情包在同一目录下）
const emojiBaseUrl = 'https://img.iduan.me/blog/emoji/';

// 自动替换函数
function replaceCustomEmojis() {
  // 获取文章内容区域
  const contentArea = document.querySelector('.main-content');
  if (!contentArea) return;

  // 遍历所有文本节点
  const walker = document.createTreeWalker(
    contentArea,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  const nodesToReplace = [];
  let node;
  let totalTextNodes = 0;

  // 收集需要替换的节点
  while (node = walker.nextNode()) {
    totalTextNodes++;

    // 跳过 code 和 pre 标签内的内容
    if (node.parentElement.tagName === 'CODE' ||
      node.parentElement.tagName === 'PRE' ||
      node.parentElement.closest('code') ||
      node.parentElement.closest('pre')) {
      continue;
    }

    // 检查是否包含【】格式的表情包
    if (/【[^】]+】/.test(node.textContent)) {
      console.log('[Emoji] 找到包含表情包的文本节点:', node.textContent.substring(0, 100));
      nodesToReplace.push(node);
    }
  }

  console.log('[Emoji] 总文本节点数:', totalTextNodes);
  console.log('[Emoji] 需要替换的节点数:', nodesToReplace.length);

  // 替换节点
  nodesToReplace.forEach(node => {
    const parent = node.parentElement;
    const fragment = document.createDocumentFragment();
    const text = node.textContent;
    let lastIndex = 0;

    // 使用正则表达式匹配【表情包名称】
    const regex = /【([^】]+)】/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // 添加匹配前的文本
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.substring(lastIndex, match.index))
        );
      }

      const emojiName = match[1];

      // 检查是否在配置中
      if (customEmojis[emojiName]) {
        // 创建图片元素
        const img = document.createElement('img');
        img.src = customEmojis[emojiName];
        img.alt = emojiName;
        img.title = emojiName;
        img.className = 'custom-emoji';
        fragment.appendChild(img);
      } else {
        // 如果没有配置，保留原文
        fragment.appendChild(document.createTextNode(match[0]));
      }

      lastIndex = regex.lastIndex;
    }

    // 添加剩余文本
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    // 替换原节点
    parent.replaceChild(fragment, node);
  });
}

// 页面加载完成后执行
console.log('[Emoji] 脚本加载，document.readyState:', document.readyState);

function executeReplacement() {
  console.log('[Emoji] 开始执行替换...');
  const contentArea = document.querySelector('.main-content');
  console.log('[Emoji] 找到 main-content:', !!contentArea);

  if (contentArea) {
    console.log('[Emoji] main-content HTML 长度:', contentArea.innerHTML.length);
    console.log('[Emoji] main-content 文本内容:', contentArea.textContent.substring(0, 200));
  }

  replaceCustomEmojis();

  // 检查结果
  setTimeout(() => {
    const emojis = document.querySelectorAll('.custom-emoji');
    console.log('[Emoji] 替换完成，找到图片数量:', emojis.length);
    if (emojis.length === 0) {
      console.warn('[Emoji] 警告：没有找到任何表情包图片！');
      console.log('[Emoji] 重新检查 main-content:', document.querySelector('.main-content'));
    }
  }, 100);
}

// 多重保证执行
if (document.readyState === 'loading') {
  console.log('[Emoji] 文档正在加载，添加 DOMContentLoaded 监听');
  document.addEventListener('DOMContentLoaded', executeReplacement);
} else {
  console.log('[Emoji] 文档已加载，立即执行');
  executeReplacement();
}

// 额外保证：在 window.onload 时再执行一次
window.addEventListener('load', () => {
  console.log('[Emoji] window.onload 触发，再次检查');
  const emojis = document.querySelectorAll('.custom-emoji');
  if (emojis.length === 0) {
    console.log('[Emoji] 仍然没有表情包，再次执行替换');
    executeReplacement();
  } else {
    console.log('[Emoji] 已有', emojis.length, '个表情包，无需重复执行');
  }
});
