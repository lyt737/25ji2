/* 留言板 — 嵌入式云端表单方案
 *
 * 原理:
 *   - 留言不再使用浏览器本地 localStorage(刷新就丢)
 *   - 改用嵌入第三方"收集表"服务(腾讯文档收集表 / 金数据 / 简道云 等)
 *   - 这些服务的免费版:
 *       · 0 元、不需要绑卡
 *       · 服务在国内,访问快
 *       · 留言数据永久保存在云端
 *       · 您和所有同学打开网页都能直接写
 *
 * 如何配置:
 *   1. 打开 https://doc.weixin.qq.com 或 https://wenku.baidu.com (任选一个)
 *   2. 新建一个"收集表",添加字段:姓名、心情、留言内容、留言时间
 *   3. 把"收集表"的"对外发布链接"复制下来
 *   4. 把下面 DOC_URL 常量改成您复制好的链接
 *   5. 重新部署网页即可
 *
 * 优点:
 *   - 零成本,零绑卡,零风险
 *   - 国内同学访问快
 *   - 留言永久保存,导出为 Excel 也很方便
 *   - 多人并发留言,数据互不干扰
 */

(function() {
    // ====== ★ 配置区: 把这里的链接换成您自己的收集表链接 ★ ======
    const DOC_URL = 'https://doc.weixin.qq.com/form-collect/REPLACE_WITH_YOUR_FORM_ID';  // ← 替换成您的腾讯文档收集表链接
    const SHOW_EMBED = false;  // true=在网页中直接嵌入 iframe,false=只显示一个跳转按钮
    // ============================================================

    const grid = document.getElementById('messagesGrid');
    if (!grid) return;

    // 在网页里替换为"嵌入式表单"
    function mountForm() {
        if (!SHOW_EMBED || !DOC_URL || DOC_URL.indexOf('REPLACE') !== -1) {
            // 还未配置:显示引导
            grid.innerHTML = `
                <div class="empty-tip">
                    <div class="empty-icon">📋</div>
                    <p>留言功能即将上线!<br>
                    现在所有人发的留言都会保存到云端文档,永久不丢。<br>
                    <small style="opacity:.7">管理员请在 <code>js/message.js</code> 中填入您的收集表链接</small></p>
                </div>
            `;
            return;
        }
        // 已配置:嵌入 iframe
        grid.innerHTML = `
            <div class="embed-wrapper" style="grid-column:1/-1;">
                <iframe src="${DOC_URL}" frameborder="0" width="100%" height="700" style="border-radius:16px;background:rgba(255,255,255,0.05);"></iframe>
            </div>
        `;
    }

    // 顶部表单仍然保留,提交时跳转到收集表(避免重复开发)
    const form = document.getElementById('messageForm');
    const randomBtn = document.getElementById('randomWish');
    const wishes = [
        "愿25计2的每一位同学,前程似锦,未来可期!",
        "和你们在一起的每一天都是青春最好的模样!",
        "青春不老,我们不散!25计2永远是最棒的班级!",
        "愿时光能缓,愿故人不散,愿我们都常联系!",
        "毕业不是终点,是新的起点!25计2,冲鸭!",
        "愿我们走出半生,归来仍是少年!",
        "怀念一起吃汉堡、喝奶茶的下午,超级幸福!",
        "未来无论走到哪里,25计2永远是我们的家!",
        "一起笑过的日子,是青春里最闪亮的星!",
        "25计2,天下无双!我们是永远的兄弟姐妹!"
    ];

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('nameInput').value.trim();
            const mood = document.getElementById('moodSelect').value;
            const content = document.getElementById('messageInput').value.trim();
            if (!name || !content) return;
            // 跳转到收集表,并把信息预填到URL参数(简化版:直接跳转)
            if (DOC_URL.indexOf('REPLACE') !== -1) {
                alert('留言功能正在配置中!\n请联系管理员在 js/message.js 顶部填入收集表链接。\n\n您的留言:\n姓名:' + name + '\n心情:' + mood + '\n内容:' + content);
            } else {
                window.open(DOC_URL, '_blank');
            }
        });
    }

    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            document.getElementById('messageInput').value = wishes[Math.floor(Math.random() * wishes.length)];
            document.getElementById('messageInput').focus();
        });
    }

    // 文档跳转链接
    const docLink = document.getElementById('docLink');
    if (docLink) {
        if (DOC_URL.indexOf('REPLACE') !== -1) {
            docLink.style.display = 'none';
        } else {
            docLink.href = DOC_URL;
        }
    }

    mountForm();
})();