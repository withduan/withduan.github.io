// TOC 优化 - 移除引用块中的标题
(function () {
    'use strict';

    function filterTOC() {
        console.log('[TOC] 开始过滤引用块中的标题...');

        // 获取所有 TOC 容器
        const tocContainers = document.querySelectorAll('.toc nav');
        if (tocContainers.length === 0) {
            console.log('[TOC] 未找到 TOC 容器');
            return;
        }

        // 获取文章内容区域
        const content = document.querySelector('.main-content');
        if (!content) {
            console.log('[TOC] 未找到内容区域');
            return;
        }

        // 找出所有在引用块中的标题
        const blockquotes = content.querySelectorAll('blockquote');
        const headingsInBlockquote = new Set();

        blockquotes.forEach(blockquote => {
            const headings = blockquote.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headings.forEach(heading => {
                if (heading.id) {
                    headingsInBlockquote.add(heading.id);
                    console.log('[TOC] 发现引用块中的标题:', heading.id, heading.textContent);
                }
            });
        });

        if (headingsInBlockquote.size === 0) {
            console.log('[TOC] 没有发现引用块中的标题');
            return;
        }

        console.log('[TOC] 共发现', headingsInBlockquote.size, '个引用块中的标题');

        // 从 TOC 中移除这些标题的链接
        let removedCount = 0;
        tocContainers.forEach(toc => {
            const links = toc.querySelectorAll('a');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    if (headingsInBlockquote.has(targetId)) {
                        // 移除包含该链接的 li 元素
                        const li = link.closest('li');
                        if (li) {
                            console.log('[TOC] 移除 TOC 项:', link.textContent);
                            li.remove();
                            removedCount++;
                        }
                    }
                }
            });

            // 清理空的 ul/ol
            const lists = toc.querySelectorAll('ul, ol');
            lists.forEach(list => {
                if (list.children.length === 0) {
                    list.remove();
                }
            });
        });

        console.log('[TOC] 过滤完成，共移除', removedCount, '个 TOC 项');
    }

    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', filterTOC);
    } else {
        filterTOC();
    }

    // 确保在所有内容加载后再执行一次
    window.addEventListener('load', filterTOC);
})();
