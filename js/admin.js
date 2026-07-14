/**
 * 算法题解库 - 管理页面逻辑
 */

let selectedTags = new Set();
let currentCollectionId = null;
let collectionModalSelections = new Set();

// ==================== 密码验证 ====================

const PASSWORD_HASH = '1d97745c328462d65aa8028d262df0e6b47c9fae409f04fd1d31f31c4736d38e';

async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function isAuthenticated() {
    return sessionStorage.getItem('adminAuth') === 'true';
}

async function checkPassword() {
    const input = document.getElementById('authPasswordInput').value;
    if (!input) return;

    const hash = await sha256(input);
    if (hash === PASSWORD_HASH) {
        sessionStorage.setItem('adminAuth', 'true');
        document.getElementById('authOverlay').style.display = 'none';
        document.getElementById('adminContainer').style.display = 'block';
        initAdminPage();
    } else {
        const errorEl = document.getElementById('authError');
        errorEl.textContent = '❌ 密码错误';
        errorEl.style.display = 'block';
        document.getElementById('authPasswordInput').value = '';
        document.getElementById('authPasswordInput').focus();
        // 抖动效果
        errorEl.style.animation = 'none';
        errorEl.offsetHeight; // 触发回流
        errorEl.style.animation = 'authShake 0.3s ease';
    }
}

function setupAuth() {
    if (isAuthenticated()) {
        document.getElementById('authOverlay').style.display = 'none';
        document.getElementById('adminContainer').style.display = 'block';
        initAdminPage();
        return;
    }

    document.getElementById('authOverlay').style.display = 'flex';
    document.getElementById('authSubmitBtn').addEventListener('click', checkPassword);
    document.getElementById('authPasswordInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkPassword();
    });
}

// ==================== 初始化 ====================

async function initAdminPage() {
    await initData();
    renderTagSelector();
    renderAdminProblemList();
    renderCollectionList();
    initPreviewToggles();
    switchAdminTab('problems');
}

// ==================== Markdown 预览 ====================

function initPreviewToggles() {
    document.querySelectorAll('.preview-toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const mode = this.dataset.mode;
            togglePreview(targetId, mode, this);
        });
    });
}

function togglePreview(targetId, mode, btn) {
    const textarea = document.getElementById(targetId);
    const preview = document.getElementById(targetId + '-preview');
    if (!textarea || !preview) return;

    // Update button active states
    const group = btn.parentElement;
    group.querySelectorAll('.preview-toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (mode === 'preview') {
        preview.innerHTML = renderMarkdown(textarea.value);
        preview.style.display = 'block';
        textarea.style.display = 'none';
    } else {
        preview.style.display = 'none';
        textarea.style.display = '';
        textarea.focus();
    }
}

/** 将所有 Markdown 预览切换回编辑模式 */
function resetAllPreviews() {
    document.querySelectorAll('.markdown-preview').forEach(preview => {
        preview.style.display = 'none';
    });
    document.querySelectorAll('.preview-toggles').forEach(group => {
        const textareaId = group.querySelector('.preview-toggle-btn[data-mode="edit"]')?.dataset.target;
        if (textareaId) {
            const textarea = document.getElementById(textareaId);
            if (textarea) textarea.style.display = '';
        }
        // 重置按钮状态
        group.querySelectorAll('.preview-toggle-btn').forEach(b => b.classList.remove('active'));
        const editBtn = group.querySelector('.preview-toggle-btn[data-mode="edit"]');
        if (editBtn) editBtn.classList.add('active');
    });
}

/**
 * 增强版 Markdown 渲染器
 * 支持：标题、粗体/斜体、有序/无序列表、代码块、行内代码、
 *       引用块、分割线、表格、链接、段落
 */
function renderMarkdown(text) {
    if (!text || !text.trim()) return '<p class="preview-empty">（暂无内容）</p>';

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

    // 4. 分割线（在标题之前处理）
    html = html.replace(/^(---|\*\*\*|___)\s*$/gm, '<hr>');

    // 5. 标题
    html = html.replace(/^#### (.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>');

    // 6. 引用块
    html = html.replace(/^&gt; ?(.+)$/gm, '<blockquote-line>$1</blockquote-line>');

    // 7. 表格（在块级元素处理前）
    html = html.replace(/^\|(.+)\|$/gm, (match) => {
        const cells = match.split('|').filter(c => c.trim()).map(c => c.trim());
        // 跳过分隔行
        if (cells.every(c => /^[-:]+$/.test(c))) return '%%TABLE_SEP%%';
        const cellHtml = cells.map(c => `<td>${c}</td>`).join('');
        return `<tr>${cellHtml}</tr>`;
    });

    // 8. 粗体和斜体
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 9. 行内代码
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // 10. 链接
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // 11. 有序列表
    html = html.replace(/^(\d+)\. (.+)$/gm, '\x01LI\x01$2');

    // 12. 无序列表
    html = html.replace(/^[-*] (.+)$/gm, '\x01LI\x01$1');

    // 13. 将标记的列表项包装为 <ul>（如果前缀是数字则为 <ol>）
    // 简化处理：全部用 <ul> 包装（有序/无序混用场景较少）
    html = html.replace(/(?:\x01LI\x01.+\n?)+/g, (match) => {
        const items = match.split('\x01LI\x01').filter(s => s.trim());
        const lis = items.map(item => `<li>${item.trim()}</li>`).join('\n');
        return `<ul>${lis}</ul>`;
    });

    // 14. 处理引用块：合并相邻行
    html = html.replace(/(?:<blockquote-line>.*<\/blockquote-line>\n?)+/g, (match) => {
        const lines = match.replace(/<blockquote-line>/g, '').replace(/<\/blockquote-line>/g, '<br>');
        return `<blockquote><p>${lines.replace(/<br>$/, '')}</p></blockquote>`;
    });

    // 15. 处理表格
    html = html.replace(/(?:<tr>.*<\/tr>\n?)+/g, (match) => {
        // 移除分隔行标记
        let tableHtml = match.replace(/%%TABLE_SEP%%\n?/g, '');
        // 第一行作为表头
        tableHtml = tableHtml.replace(/<tr>/, '<thead><tr>');
        tableHtml = tableHtml.replace(/<\/tr>/, '</tr></thead><tbody>');
        // 将 <td> 替换为 <th>（表头）
        tableHtml = tableHtml.replace(/<thead>[\s\S]*?<\/thead>/, (thead) => {
            return thead.replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>');
        });
        return `<div class="table-wrapper"><table>${tableHtml}</tbody></table></div>`;
    });

    // 16. 段落（双换行）
    html = html.replace(/\n\n+/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // 17. 单换行转 <br>
    html = html.replace(/\n/g, '<br>');

    // 18. 恢复代码块（带语法高亮）
    html = html.replace(/\x00CODE(\d+)\x00/g, (_, idx) => {
        const block = codeBlocks[parseInt(idx)];
        const langLabel = block.lang
            ? `<span class="preview-code-lang">${escapeHtml(block.lang)}</span>`
            : '';
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
        return `<pre class="preview-code-block">${langLabel}<code class="hljs language-${escapeHtml(block.lang)}">${codeHtml}</code></pre>`;
    });

    // 19. 恢复数学公式
    html = restoreMathFormulas(html, mathBlocks, mathInlines);

    // 20. 清理
    html = html.replace(/<p>\s*<\/p>/g, '');
    html = html.replace(/<p><ul>/g, '<ul>');
    html = html.replace(/<\/ul><\/p>/g, '</ul>');
    html = html.replace(/<p><blockquote>/g, '<blockquote>');
    html = html.replace(/<\/blockquote><\/p>/g, '</blockquote>');
    html = html.replace(/<p><hr><\/p>/g, '<hr>');
    html = html.replace(/<p><div/g, '<div');
    html = html.replace(/<\/div><\/p>/g, '</div>');
    html = html.replace(/<p><pre/g, '<pre');
    html = html.replace(/<\/pre><\/p>/g, '</pre>');
    html = html.replace(/<br><\/p>/g, '</p>');
    html = html.replace(/<p><br>/g, '<p>');

    return html;
}

document.addEventListener('DOMContentLoaded', () => {
    setupAuth();
});

function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.remove('active'));

    const tabBtn = document.querySelector(`.admin-tab[data-tab="${tab}"]`);
    if (tabBtn) tabBtn.classList.add('active');

    const panelId = tab === 'problems' ? 'tabProblems' : 'tabCollections';
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.add('active');

    // 更新标题
    const h1 = document.querySelector('.admin-header h1');
    if (h1) {
        h1.textContent = tab === 'problems' ? '⚙️ 题目管理' : '📚 题库管理';
    }
}

// ==================== 标签选择器 ====================

function renderTagSelector(activeTags = []) {
    const container = document.getElementById('tagSelector');
    const allTags = getAllTags();
    selectedTags = new Set(activeTags);

    container.innerHTML = allTags.map(tag => {
        const isDefault = DEFAULT_TAGS.includes(tag);
        const isChecked = selectedTags.has(tag);
        return `
            <span class="tag-check-item ${isChecked ? 'checked' : ''}"
                  data-tag="${escapeHtml(tag)}"
                  onclick="toggleTag('${escapeHtml(tag).replace(/'/g, "\\'")}')"
                  title="${isDefault ? '默认标签' : '自定义标签（悬停可删除）'}">
                ${tag}
                ${!isDefault ? `<span class="tag-delete-x" onclick="event.stopPropagation();deleteTag('${escapeHtml(tag).replace(/'/g, "\\'")}')" title="删除此标签">×</span>` : ''}
            </span>
        `;
    }).join('');
}

function toggleTag(tag) {
    if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
    } else {
        selectedTags.add(tag);
    }
    // 更新UI
    const item = document.querySelector(`.tag-check-item[data-tag="${escapeHtml(tag)}"]`);
    if (item) item.classList.toggle('checked');
}

function getSelectedTags() {
    return [...selectedTags];
}

function addNewTag() {
    const input = document.getElementById('newTagInput');
    const tag = input.value.trim();
    if (!tag) { showToast('请输入标签名称', 'error'); return; }

    const result = addCustomTag(tag);
    if (result.success) {
        input.value = '';
        const currentSelected = getSelectedTags();
        renderTagSelector(currentSelected);
        showToast('标签已添加！', 'success');
    } else {
        showToast(result.message, 'error');
    }
}

function deleteTag(tag) {
    const result = deleteCustomTag(tag);
    if (result.success) {
        const currentSelected = getSelectedTags();
        selectedTags.delete(tag);
        renderTagSelector([...selectedTags]);
        renderAdminProblemList();
        showToast('标签已删除', 'success');
    } else {
        showToast(result.message, 'error');
    }
}

// 回车键添加标签
document.addEventListener('keydown', function(e) {
    if (e.target.id === 'newTagInput' && e.key === 'Enter') {
        e.preventDefault();
        addNewTag();
    }
});

// ==================== 表单操作 ====================

function saveProblem() {
    const title = document.getElementById('titleInput').value.trim();
    const tags = getSelectedTags();
    const difficulty = document.getElementById('difficultyInput').value;
    const source = document.getElementById('sourceInput').value.trim();
    const originalProblem = document.getElementById('originalProblemInput').value.trim();
    const explanationCpp = document.getElementById('explanationCppInput').value.trim();
    const codeCpp = document.getElementById('codeCppInput').value.trim();
    const explanationPython = document.getElementById('explanationPythonInput').value.trim();
    const codePython = document.getElementById('codePythonInput').value.trim();
    const editId = document.getElementById('editId').value;

    if (!title) { showToast('请输入题目名称', 'error'); return; }
    if (tags.length === 0) { showToast('请选择至少一个算法标签', 'error'); return; }
    if (!explanationCpp) { showToast('请输入C++题解', 'error'); return; }
    if (!codeCpp) { showToast('请输入C++代码', 'error'); return; }

    const problemData = {
        title,
        tags,
        difficulty: difficulty || '',
        source: source || 'XMUOJ | 2026年程序设计实践例题(05李胜睿班)',
        original_problem: originalProblem,
        explanation_cpp: explanationCpp,
        code_cpp: codeCpp,
        explanation_python: explanationPython || '',
        code_python: codePython || '',
    };

    if (editId) {
        const updated = updateProblem(parseInt(editId), problemData);
        if (updated) {
            showToast('题目已更新！', 'success');
        }
    } else {
        addProblem(problemData);
        showToast('题目已添加！', 'success');
    }

    resetForm();
    renderAdminProblemList();
}

function editProblem(id) {
    const problem = PROBLEMS.find(p => p.id === id);
    if (!problem) return;

    // 重置所有 Markdown 预览为编辑模式
    resetAllPreviews();

    document.getElementById('editId').value = problem.id;
    document.getElementById('titleInput').value = problem.title;
    document.getElementById('sourceInput').value = problem.source || '';
    document.getElementById('difficultyInput').value = problem.difficulty || '';
    document.getElementById('originalProblemInput').value = problem.original_problem || '';

    // 重建标签选择器并选中当前标签
    renderTagSelector(problem.tags || []);

    document.getElementById('explanationCppInput').value = problem.explanation_cpp || '';
    document.getElementById('codeCppInput').value = problem.code_cpp || '';
    document.getElementById('explanationPythonInput').value = problem.explanation_python || '';
    document.getElementById('codePythonInput').value = problem.code_python || '';

    document.getElementById('formTitle').textContent = '✏️ 编辑题目';
    document.querySelector('#problemForm').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    resetAllPreviews();
    document.getElementById('editId').value = '';
    document.getElementById('titleInput').value = '';
    document.getElementById('sourceInput').value = 'XMUOJ | 2026年程序设计实践例题(05李胜睿班)';
    document.getElementById('difficultyInput').value = '';
    document.getElementById('originalProblemInput').value = '';
    document.getElementById('explanationCppInput').value = '';
    document.getElementById('codeCppInput').value = '';
    document.getElementById('explanationPythonInput').value = '';
    document.getElementById('codePythonInput').value = '';
    document.getElementById('formTitle').textContent = '📝 添加新题目';
    renderTagSelector([]);
}

function deleteProblemById(id) {
    if (confirm('确定要删除这道题目吗？此操作不可撤销。')) {
        deleteProblem(id);
        renderAdminProblemList();
        showToast('题目已删除', 'success');
    }
}

function clearAllData() {
    if (confirm('确定要清空所有题目数据吗？此操作不可撤销。建议先导出备份。')) {
        if (confirm('再次确认：清空所有数据？')) {
            PROBLEMS.length = 0;
            saveData();
            renderAdminProblemList();
            showToast('所有数据已清空', 'success');
        }
    }
}

// ==================== 渲染管理列表 ====================

function renderAdminProblemList() {
    document.getElementById('adminCount').textContent = PROBLEMS.length;
    const container = document.getElementById('adminProblemItems');

    if (PROBLEMS.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted);">暂无题目，请添加第一个题目</div>';
        return;
    }

    container.innerHTML = PROBLEMS.map(p => `
        <div class="admin-problem-item">
            <div class="admin-problem-info">
                <div class="admin-problem-name">
                    #${p.id} ${escapeHtml(p.title)}
                    ${p.difficulty ? `<span class="diff-badge diff-${p.difficulty}">${p.difficulty}</span>` : ''}
                </div>
                <div class="admin-problem-meta">
                    <span>🏷️ ${(p.tags || []).join(', ')}</span>
                    <span>💻 ${p.code_cpp ? 'C++ ✓' : 'C++ ✗'}</span>
                    <span>🐍 ${p.code_python ? 'Python ✓' : 'Python ✗'}</span>
                    <span>📄 ${p.original_problem ? '原题 ✓' : '原题 ✗'}</span>
                </div>
            </div>
            <div class="admin-problem-actions">
                <button class="btn btn-secondary btn-small" onclick="editProblem(${p.id})">✏️ 编辑</button>
                <button class="btn btn-danger btn-small" onclick="deleteProblemById(${p.id})">🗑️ 删除</button>
            </div>
        </div>
    `).join('');
}

// ==================== 导入导出 ====================

function exportData() {
    const data = JSON.stringify({
        problems: PROBLEMS,
        customTags: getCustomTags(),
        collections: getCollections()
    }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `题解数据备份_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('数据已导出！', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            // 兼容旧格式（纯数组）和新格式（含customTags）
            const problems = Array.isArray(data) ? data : (data.problems || []);
            const customTags = data.customTags || [];
            const collections = data.collections || [];
            if (!Array.isArray(problems)) throw new Error('数据格式错误');

            if (confirm(`即将导入 ${problems.length} 道题目和 ${collections.length} 个题库。选择"确定"将合并到现有数据，"取消"将替换所有数据。`)) {
                problems.forEach(p => {
                    const existing = PROBLEMS.find(x => x.id === p.id);
                    if (existing) {
                        Object.assign(existing, p);
                    } else {
                        PROBLEMS.push(p);
                    }
                });
                // 合并自定义标签
                if (customTags.length > 0) {
                    const existingCustom = getCustomTags();
                    const merged = [...new Set([...existingCustom, ...customTags])];
                    saveCustomTags(merged);
                }
                // 合并题库
                if (collections.length > 0) {
                    const existingCols = getCollections();
                    collections.forEach(c => {
                        const ec = existingCols.find(x => x.id === c.id);
                        if (ec) Object.assign(ec, c);
                        else existingCols.push(c);
                    });
                    saveCollections(existingCols);
                }
                saveData();
                showToast(`已合并导入 ${problems.length} 道题目`, 'success');
            } else {
                PROBLEMS.length = 0;
                PROBLEMS.push(...problems);
                saveData();
                if (customTags.length > 0) saveCustomTags(customTags);
                if (collections.length > 0) saveCollections(collections);
                showToast(`已替换导入 ${problems.length} 道题目`, 'success');
            }
            renderAdminProblemList();
            renderCollectionList();
            renderTagSelector([]);
        } catch (err) {
            showToast('导入失败：文件格式错误', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ==================== 题库管理 ====================

function createCollection() {
    const name = document.getElementById('collectionNameInput').value.trim();
    const desc = document.getElementById('collectionDescInput').value.trim();
    if (!name) { showToast('请输入题库名称', 'error'); return; }
    const result = addCollection(name, desc);
    if (result.success) {
        document.getElementById('collectionNameInput').value = '';
        document.getElementById('collectionDescInput').value = '';
        renderCollectionList();
        showToast('题库已创建！', 'success');
    } else {
        showToast(result.message, 'error');
    }
}

function renderCollectionList() {
    const cols = getCollections();
    const container = document.getElementById('collectionList');
    if (cols.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">暂无题库，请创建一个</div>';
        return;
    }
    container.innerHTML = cols.map(c => {
        const count = (c.problemIds || []).length;
        return `
            <div class="admin-problem-item">
                <div class="admin-problem-info">
                    <div class="admin-problem-name">
                        📚 ${escapeHtml(c.name)}
                        <span style="font-weight:400;color:var(--text-muted);font-size:12px;margin-left:8px;">${escapeHtml(c.description || '')}</span>
                    </div>
                    <div class="admin-problem-meta">
                        <span>📋 ${count} 道题目</span>
                    </div>
                </div>
                <div class="admin-problem-actions">
                    <button class="btn btn-primary btn-small" onclick="openCollectionManager(${c.id})">📝 管理题目</button>
                    <button class="btn btn-danger btn-small" onclick="deleteCollectionById(${c.id})">🗑️ 删除</button>
                </div>
            </div>
        `;
    }).join('');
}

function deleteCollectionById(id) {
    if (confirm('确定要删除这个题库吗？（题目不会被删除，只会移出该题库）')) {
        deleteCollection(id);
        renderCollectionList();
        showToast('题库已删除', 'success');
    }
}

function openCollectionManager(collectionId) {
    currentCollectionId = collectionId;
    const cols = getCollections();
    const col = cols.find(c => c.id === collectionId);
    if (!col) return;

    document.getElementById('collectionModalTitle').textContent = `📝 管理 "${col.name}" 中的题目`;
    collectionModalSelections = new Set(col.problemIds || []);
    document.getElementById('collectionSearchInput').value = '';

    renderCollectionProblemList();
    document.getElementById('collectionModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('collectionSearchInput').addEventListener('input', () => renderCollectionProblemList());
}

function closeCollectionModal() {
    document.getElementById('collectionModal').classList.remove('active');
    document.body.style.overflow = '';
    currentCollectionId = null;
    collectionModalSelections = new Set();
}

function renderCollectionProblemList() {
    const searchTerm = document.getElementById('collectionSearchInput').value.toLowerCase().trim();
    let problems = [...PROBLEMS];
    if (searchTerm) {
        problems = problems.filter(p =>
            p.title.toLowerCase().includes(searchTerm) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(searchTerm)))
        );
    }

    document.getElementById('modalSelectedCount').textContent = collectionModalSelections.size;

    const container = document.getElementById('collectionProblemChecklist');
    if (problems.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">没有匹配的题目</div>';
        return;
    }

    container.innerHTML = problems.map(p => {
        const isChecked = collectionModalSelections.has(p.id);
        return `
            <label class="collection-problem-row ${isChecked ? 'selected' : ''}">
                <input type="checkbox" ${isChecked ? 'checked' : ''}
                       onchange="toggleProblemInCollection(${p.id}, this.checked)">
                <span class="col-prob-id">#${p.id}</span>
                <span class="col-prob-title">${escapeHtml(p.title)}</span>
                <span class="col-prob-tags">${(p.tags || []).join(', ')}</span>
                ${p.difficulty ? `<span class="diff-badge diff-${p.difficulty}" style="margin-left:auto;">${p.difficulty}</span>` : ''}
            </label>
        `;
    }).join('');
}

function toggleProblemInCollection(problemId, checked) {
    if (checked) {
        collectionModalSelections.add(problemId);
    } else {
        collectionModalSelections.delete(problemId);
    }
    document.getElementById('modalSelectedCount').textContent = collectionModalSelections.size;
}

function selectAllInModal() {
    const searchTerm = document.getElementById('collectionSearchInput').value.toLowerCase().trim();
    let problems = [...PROBLEMS];
    if (searchTerm) {
        problems = problems.filter(p =>
            p.title.toLowerCase().includes(searchTerm) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(searchTerm)))
        );
    }
    problems.forEach(p => collectionModalSelections.add(p.id));
    renderCollectionProblemList();
}

function deselectAllInModal() {
    collectionModalSelections = new Set();
    renderCollectionProblemList();
}

function saveCollectionProblems() {
    if (currentCollectionId === null) return;
    const result = updateCollection(currentCollectionId, { problemIds: [...collectionModalSelections] });
    if (result.success) {
        renderCollectionList();
        closeCollectionModal();
        showToast('题库题目已更新！', 'success');
    } else {
        showToast(result.message, 'error');
    }
}

// ESC关闭
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('collectionModal').classList.contains('active')) {
        closeCollectionModal();
    }
});

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
