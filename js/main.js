/**
 * 算法题解库 - 主页面逻辑
 */

let currentTag = 'all';
let currentCollection = null;
let currentProblem = null;
let currentVersion = 'cpp';
let sortByDifficulty = false; // 难度排序开关

// 难度映射权重
const DIFFICULTY_ORDER = { '低': 0, '中': 1, '高': 2, '': 3 };

// 算法标签的图标映射
const TAG_ICONS = {
    '入门': '🚀',
    '递归': '🔄',
    '枚举': '🔍',
    '二分查找': '🎯',
    '二进制': '💡',
    '排序': '📊',
    '深搜DFS': '🌳',
    '双指针': '👆',
};

document.addEventListener('DOMContentLoaded', async () => {
    await initData();
    renderTagFilters();
    renderCollectionFilters();
    renderProblems();
    updateStats();
    setupSearch();
    setupEditAuthPrompt();
});

// ==================== 标签筛选 ====================

function renderTagFilters() {
    const tagList = document.getElementById('tagList');
    const tags = getAllTags();

    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        btn.dataset.tag = tag;
        btn.innerHTML = `<span class="tag-icon">${TAG_ICONS[tag] || '📌'}</span> ${tag}`;
        btn.addEventListener('click', () => filterByTag(tag, btn));
        tagList.appendChild(btn);
    });
}

function filterByTag(tag, btn) {
    currentTag = tag;
    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProblems();
    updateStats();
}

// ==================== 题库筛选 ====================

function renderCollectionFilters() {
    const cols = getCollections();
    const container = document.getElementById('collectionFilter');
    const listContainer = document.getElementById('collectionTagList');

    if (cols.length === 0) {
        container.style.display = 'none';
        return;
    }
    container.style.display = 'flex';
    listContainer.innerHTML = cols.map(c => {
        const count = (c.problemIds || []).length;
        return `<button class="collection-tag-btn" data-collection="${c.id}"
                        onclick="filterByCollection(${c.id}, this)"
                        title="${escapeHtml(c.description || '')}">
                    📚 ${escapeHtml(c.name)} (${count})
                </button>`;
    }).join('');
}

function filterByCollection(colId, btn) {
    if (currentCollection === colId) {
        // 再次点击取消选中
        currentCollection = null;
        btn.classList.remove('active');
    } else {
        currentCollection = colId;
        document.querySelectorAll('.collection-tag-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    renderProblems();
    updateStats();
}

// ==================== 搜索 ====================

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(() => {
        renderProblems();
    }, 300));
}

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// ==================== 难度排序 ====================

function toggleSortByDifficulty() {
    sortByDifficulty = !sortByDifficulty;
    const btn = document.getElementById('sortBtn');
    if (sortByDifficulty) {
        btn.classList.add('active-sort');
        btn.innerHTML = '<span>📶</span> 难度排序 ✓';
    } else {
        btn.classList.remove('active-sort');
        btn.innerHTML = '<span>📶</span> 难度排序';
    }
    renderProblems();
}

// ==================== 渲染题目卡片 ====================

function renderProblems() {
    const grid = document.getElementById('problemGrid');
    const emptyState = document.getElementById('emptyState');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    let problems = getProblemsByTag(currentTag);

    // 题库过滤
    if (currentCollection !== null) {
        const colProblems = getProblemsByCollection(currentCollection);
        const colIdSet = new Set(colProblems.map(p => p.id));
        problems = problems.filter(p => colIdSet.has(p.id));
    }

    // 搜索过滤
    if (searchTerm) {
        problems = problems.filter(p =>
            p.title.toLowerCase().includes(searchTerm) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(searchTerm))) ||
            (p.explanation_cpp && p.explanation_cpp.toLowerCase().includes(searchTerm))
        );
    }

    // 难度排序（低 → 中 → 高）
    if (sortByDifficulty) {
        problems.sort((a, b) => {
            const orderA = DIFFICULTY_ORDER[a.difficulty] ?? 3;
            const orderB = DIFFICULTY_ORDER[b.difficulty] ?? 3;
            return orderA - orderB;
        });
    }

    if (problems.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        if (searchTerm) {
            emptyState.querySelector('h3').textContent = '未找到匹配题目';
            emptyState.querySelector('p').textContent = '请尝试其他搜索关键词';
        } else {
            emptyState.querySelector('h3').textContent = '暂无题目';
            emptyState.querySelector('p').textContent = '该分类下还没有题目，请前往管理页面上传';
        }
        return;
    }

    emptyState.style.display = 'none';
    grid.innerHTML = problems.map(p => createProblemCard(p)).join('');

    // 绑定点击事件
    grid.querySelectorAll('.problem-card').forEach((card, idx) => {
        card.addEventListener('click', () => openSolution(problems[idx]));
    });
}

function createProblemCard(problem) {
    const tags = (problem.tags || []).map(t =>
        `<span class="card-tag tag-algorithm">${TAG_ICONS[t] || ''} ${t}</span>`
    ).join('');

    const difficultyBadge = problem.difficulty
        ? `<span class="card-tag tag-difficulty diff-${problem.difficulty}">${problem.difficulty}</span>`
        : '';

    const excerpt = (problem.explanation_cpp || '暂无题解')
        .replace(/[#*`]/g, '')
        .substring(0, 80) + '...';

    return `
        <div class="problem-card">
            <div class="card-diamond-marker">◆</div>
            <div class="card-header">
                <div class="card-tags">
                    ${tags}
                    ${difficultyBadge}
                    <span class="card-tag tag-source">📚 XMUOJ</span>
                </div>
                <span class="card-id">#${problem.id}</span>
            </div>
            <h3 class="card-title">${escapeHtml(problem.title)}</h3>
            <p class="card-excerpt">${escapeHtml(excerpt)}</p>
            <div class="card-footer">
                <div class="card-meta">
                    <span>💻 C++</span>
                    ${problem.code_python ? '<span>🐍 Python</span>' : ''}
                    ${problem.original_problem ? '<span>📄 含原题</span>' : ''}
                </div>
                <div class="card-arrow">→</div>
            </div>
        </div>
    `;
}

// ==================== 更新统计 ====================

function updateStats() {
    let problems = getProblemsByTag(currentTag);
    if (currentCollection !== null) {
        const colProblems = getProblemsByCollection(currentCollection);
        const colIdSet = new Set(colProblems.map(p => p.id));
        problems = problems.filter(p => colIdSet.has(p.id));
    }
    document.getElementById('statTotal').textContent = problems.length;
    document.getElementById('statTags').textContent = getAllTags().length;

    // 更新题库统计
    let statCol = document.getElementById('statCollections');
    const cols = getCollections();
    if (cols.length > 0) {
        if (!statCol) {
            statCol = document.createElement('div');
            statCol.className = 'stat-item';
            statCol.id = 'statCollections';
            statCol.innerHTML = '<span class="stat-num" id="statColNum">0</span><span class="stat-label">题库数</span>';
            document.getElementById('statsBar').appendChild(statCol);
        }
        document.getElementById('statColNum').textContent = cols.length;
    } else if (statCol) {
        statCol.remove();
    }
}

// ==================== 打开题解弹窗 ====================

function openSolution(problem) {
    currentProblem = problem;
    currentVersion = 'cpp';

    document.getElementById('modalTag').textContent = (problem.tags || []).join(' · ');
    document.getElementById('modalTitle').textContent = problem.title;

    // 设置代码版本标签
    const tabs = document.querySelectorAll('.version-tab');
    tabs[0].classList.add('active');
    if (problem.code_python) {
        tabs[1].classList.remove('python-disabled');
        tabs[1].title = '';
    } else {
        tabs[1].classList.add('python-disabled');
        tabs[1].title = 'Python版本尚未上传';
    }

    updateSolutionContent();

    document.getElementById('solutionModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    // ESC关闭
    document.addEventListener('keydown', handleModalEsc);
}

function closeModal() {
    document.getElementById('solutionModal').classList.remove('active');
    document.body.style.overflow = '';
    currentProblem = null;
    document.removeEventListener('keydown', handleModalEsc);
}

function handleModalEsc(e) {
    if (e.key !== 'Escape') return;
    // 密码框打开时，ESC 只关密码框，不关题解弹窗
    if (isEditAuthOpen()) {
        closeEditAuth();
        return;
    }
    closeModal();
}

// 点击遮罩关闭
document.addEventListener('click', (e) => {
    if (e.target === document.getElementById('solutionModal')) {
        closeModal();
    }
});

function switchVersion(version) {
    if (version === 'python' && !currentProblem.code_python) return;
    currentVersion = version;

    document.querySelectorAll('.version-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.version-tab[data-version="${version}"]`).classList.add('active');

    updateSolutionContent();
}

// ==================== 题解页 → 本题编辑界面 ====================

function setupEditAuthPrompt() {
    const overlay = document.getElementById('editAuthOverlay');
    if (!overlay) return;

    document.getElementById('editAuthInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submitEditPassword();
    });

    // 点击卡片外空白处关闭
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeEditAuth();
    });
}

function isEditAuthOpen() {
    const overlay = document.getElementById('editAuthOverlay');
    return !!overlay && overlay.style.display !== 'none';
}

function openEditAuth() {
    if (!currentProblem) return;

    document.getElementById('editAuthProblem').textContent = currentProblem.title;
    document.getElementById('editAuthError').style.display = 'none';
    document.getElementById('editAuthInput').value = '';
    document.getElementById('editAuthOverlay').style.display = 'flex';
    document.getElementById('editAuthInput').focus();
}

function closeEditAuth() {
    document.getElementById('editAuthOverlay').style.display = 'none';
    document.getElementById('editAuthInput').value = '';
}

async function submitEditPassword() {
    if (!currentProblem) { closeEditAuth(); return; }

    const inputEl = document.getElementById('editAuthInput');
    const errorEl = document.getElementById('editAuthError');
    if (!inputEl.value) return;

    if (await verifyAdminPassword(inputEl.value)) {
        markAuthenticated(); // 后台识别本次会话，跳转后不再二次索要密码
        location.href = 'admin.html?edit=' + encodeURIComponent(currentProblem.id);
        return;
    }

    errorEl.textContent = '❌ 密码错误';
    inputEl.value = '';
    inputEl.focus();
    shakeAuthError(errorEl);
}

function updateSolutionContent() {
    const explanation = currentVersion === 'cpp'
        ? (currentProblem.explanation_cpp || '暂无题解，敬请期待...')
        : (currentProblem.explanation_python || '暂无Python题解，敬请期待...');

    const code = currentVersion === 'cpp'
        ? (currentProblem.code_cpp || '// 暂无代码')
        : (currentProblem.code_python || '# 暂无代码');

    const langLabel = currentVersion === 'cpp' ? 'C++' : 'Python';
    document.getElementById('codeSectionTitle').textContent = `💻 代码实现（${langLabel}）`;

    // 显示原始题目
    const originalSection = document.getElementById('originalProblemSection');
    if (currentProblem.original_problem) {
        originalSection.style.display = 'block';
        document.getElementById('originalProblemContent').innerHTML = formatExplanation(currentProblem.original_problem);
    } else {
        originalSection.style.display = 'none';
    }

    // 将题解文本渲染为HTML
    document.getElementById('explanationContent').innerHTML = formatExplanation(explanation);

    // 使用 hljs.highlight() 替代 highlightElement() 避免 DOM 动画期间高亮失效
    const codeEl = document.getElementById('codeContent');
    const lang = currentVersion === 'cpp' ? 'cpp' : 'python';
    if (typeof hljs !== 'undefined') {
        const result = hljs.highlight(code, { language: lang });
        codeEl.innerHTML = result.value;
        codeEl.className = `hljs language-${lang}`;
    } else {
        codeEl.textContent = code;
        codeEl.className = currentVersion === 'cpp' ? 'language-cpp' : 'language-python';
    }
}

function formatExplanation(text) {
    if (!text) return '<p>暂无题解</p>';

    // 1. 提取并保护围栏代码块
    const codeBlocks = [];
    let html = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        const idx = codeBlocks.length;
        codeBlocks.push({ lang: lang || '', code: code.replace(/\n$/, '') });
        return `\x00CODE${idx}\x00`;
    });

    // 2. 提取并保护数学公式 ($...$ 和 $$...$$)
    const mathResult = extractMathFormulas(html);
    html = mathResult.text;
    const mathBlocks = mathResult.mathBlocks;
    const mathInlines = mathResult.mathInlines;

    // 3. 转义 HTML
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 4. 分割线
    html = html.replace(/^(---|\*\*\*|___)\s*$/gm, '<hr>');

    // 5. 标题
    html = html.replace(/^#### (.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>');

    // 6. 引用块
    html = html.replace(/^&gt; ?(.+)$/gm, '<blockquote-line>$1</blockquote-line>');

    // 7. 粗体和斜体
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 8. 行内代码
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // 9. 链接
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // 10. 有序列表
    html = html.replace(/^(\d+)\. (.+)$/gm, '\x01LI\x01$2');

    // 11. 无序列表
    html = html.replace(/^[-*] (.+)$/gm, '\x01LI\x01$1');

    // 12. 包装列表项
    html = html.replace(/(?:\x01LI\x01.+\n?)+/g, (match) => {
        const items = match.split('\x01LI\x01').filter(s => s.trim());
        const lis = items.map(item => `<li>${item.trim()}</li>`).join('\n');
        return `<ul>${lis}</ul>`;
    });

    // 13. 合并引用块
    html = html.replace(/(?:<blockquote-line>.*<\/blockquote-line>\n?)+/g, (match) => {
        const lines = match.replace(/<blockquote-line>/g, '').replace(/<\/blockquote-line>/g, '<br>');
        return `<blockquote><p>${lines.replace(/<br>$/, '')}</p></blockquote>`;
    });

    // 14. 段落
    html = html.replace(/\n\n+/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // 15. 单换行转 <br>
    html = html.replace(/\n/g, '<br>');

    // 16. 恢复代码块（带语法高亮）
    html = html.replace(/\x00CODE(\d+)\x00/g, (_, idx) => {
        const block = codeBlocks[parseInt(idx)];
        let codeHtml = escapeHtml(block.code);
        if (block.lang && typeof hljs !== 'undefined') {
            try {
                const result = hljs.highlight(block.code, {
                    language: block.lang,
                    ignoreIllegals: true
                });
                codeHtml = result.value;
            } catch (e) {
                // 高亮失败时回退到转义文本
            }
        }
        return `<pre class="md-code-block"><code class="hljs language-${escapeHtml(block.lang)}">${codeHtml}</code></pre>`;
    });

    // 17. 恢复数学公式
    html = restoreMathFormulas(html, mathBlocks, mathInlines);

    // 18. 清理
    html = html.replace(/<p>\s*<\/p>/g, '');
    html = html.replace(/<p><ul>/g, '<ul>');
    html = html.replace(/<\/ul><\/p>/g, '</ul>');
    html = html.replace(/<p><blockquote>/g, '<blockquote>');
    html = html.replace(/<\/blockquote><\/p>/g, '</blockquote>');
    html = html.replace(/<p><hr><\/p>/g, '<hr>');
    html = html.replace(/<p><pre/g, '<pre');
    html = html.replace(/<\/pre><\/p>/g, '</pre>');
    html = html.replace(/<br><\/p>/g, '</p>');
    html = html.replace(/<p><br>/g, '<p>');

    return html;
}

function copyCode() {
    const code = currentVersion === 'cpp'
        ? currentProblem.code_cpp
        : currentProblem.code_python;

    if (!code) return;

    navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = '✅ 已复制!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = '📋 复制代码';
            btn.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        // 降级方案
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('代码已复制!', 'success');
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== Toast提示 ====================

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}
