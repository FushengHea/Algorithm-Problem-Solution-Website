/**
 * 算法题解库 - 数据存储
 * problems 数组存储所有题目数据
 */

const PROBLEMS = [];
const DEFAULT_TAGS = ['入门', '递归', '枚举', '二分查找', '二进制', '排序', '深搜DFS', '双指针'];

/**
 * 初始化数据（加载优先级：localStorage → data.json → 默认数据）
 * 异步函数，调用方需要 await
 */
async function initData() {
    // 1. 优先从 localStorage 加载（用户本地管理数据）
    const saved = localStorage.getItem('problemSolutionsData');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                PROBLEMS.length = 0;
                PROBLEMS.push(...parsed);
                console.log(`✅ 从 localStorage 加载了 ${PROBLEMS.length} 道题目`);
                return;
            }
        } catch (e) {
            console.error('localStorage 数据解析失败', e);
        }
    }

    // 2. 尝试从 data.json 加载（部署站点的静态数据源）
    try {
        const response = await fetch('data.json');
        if (response.ok) {
            const data = await response.json();
            // 兼容两种格式：纯数组（旧格式）和包含 problems/customTags/collections 的对象（新格式）
            const problems = Array.isArray(data) ? data : (data.problems || []);
            if (problems.length > 0) {
                PROBLEMS.length = 0;
                PROBLEMS.push(...problems);
                // 恢复自定义标签
                if (!Array.isArray(data) && data.customTags && data.customTags.length > 0) {
                    saveCustomTags(data.customTags);
                }
                // 恢复题库
                if (!Array.isArray(data) && data.collections && data.collections.length > 0) {
                    saveCollections(data.collections);
                }
                saveData(); // 缓存到 localStorage 加速后续访问
                console.log(`✅ 从 data.json 加载了 ${PROBLEMS.length} 道题目`);
                return;
            }
        }
    } catch (e) {
        console.error('data.json 加载失败，回退到默认数据', e);
    }

    // 3. 最终回退：使用内置默认数据
    PROBLEMS.length = 0;
    PROBLEMS.push(...getDefaultProblems());
    saveData();
    console.log(`✅ 从内置默认数据加载了 ${PROBLEMS.length} 道题目`);
}

function saveData() {
    localStorage.setItem('problemSolutionsData', JSON.stringify(PROBLEMS));
}

function getNextId() {
    if (PROBLEMS.length === 0) return 1;
    return Math.max(...PROBLEMS.map(p => p.id)) + 1;
}

function addProblem(problem) {
    problem.id = getNextId();
    problem.createdAt = new Date().toISOString();
    PROBLEMS.push(problem);
    saveData();
    return problem;
}

function updateProblem(id, updated) {
    const idx = PROBLEMS.findIndex(p => p.id === id);
    if (idx !== -1) {
        PROBLEMS[idx] = { ...PROBLEMS[idx], ...updated, updatedAt: new Date().toISOString() };
        saveData();
        return PROBLEMS[idx];
    }
    return null;
}

function deleteProblem(id) {
    const idx = PROBLEMS.findIndex(p => p.id === id);
    if (idx !== -1) {
        PROBLEMS.splice(idx, 1);
        saveData();
        return true;
    }
    return false;
}

function getProblemsByTag(tag) {
    if (tag === 'all') return [...PROBLEMS];
    return PROBLEMS.filter(p => p.tags && p.tags.includes(tag));
}

// ==================== 标签管理 ====================

/** 获取自定义标签列表 */
function getCustomTags() {
    try {
        return JSON.parse(localStorage.getItem('customAlgorithmTags') || '[]');
    } catch (e) { return []; }
}

/** 保存自定义标签列表 */
function saveCustomTags(tags) {
    localStorage.setItem('customAlgorithmTags', JSON.stringify(tags));
}

/** 获取全部可用标签：默认标签 + 自定义标签 + 现有题目中出现的标签 */
function getAllTags() {
    const tagSet = new Set(DEFAULT_TAGS);
    getCustomTags().forEach(t => tagSet.add(t));
    PROBLEMS.forEach(p => {
        if (p.tags) p.tags.forEach(t => tagSet.add(t));
    });
    return [...tagSet].sort();
}

/** 添加自定义标签 */
function addCustomTag(tag) {
    const trimmed = tag.trim();
    if (!trimmed) return { success: false, message: '标签名不能为空' };
    const allTags = new Set([...DEFAULT_TAGS, ...getCustomTags()]);
    if (allTags.has(trimmed)) return { success: false, message: '标签已存在' };
    const custom = getCustomTags();
    custom.push(trimmed);
    saveCustomTags(custom);
    return { success: true, message: '标签已添加' };
}

/** 删除自定义标签（只能删除自定义的，不能删除默认标签） */
function deleteCustomTag(tag) {
    if (DEFAULT_TAGS.includes(tag)) return { success: false, message: '不能删除默认标签' };
    // 检查是否有题目在使用该标签
    const inUse = PROBLEMS.some(p => p.tags && p.tags.includes(tag));
    if (inUse) return { success: false, message: `标签"${tag}"仍被题目使用，请先移除相关题目` };
    let custom = getCustomTags();
    custom = custom.filter(t => t !== tag);
    saveCustomTags(custom);
    return { success: true, message: '标签已删除' };
}

// ==================== 题库（Collections）管理 ====================

function getCollections() {
    try {
        return JSON.parse(localStorage.getItem('problemCollections') || '[]');
    } catch (e) { return []; }
}

function saveCollections(collections) {
    localStorage.setItem('problemCollections', JSON.stringify(collections));
}

function getNextCollectionId() {
    const cols = getCollections();
    if (cols.length === 0) return 1;
    return Math.max(...cols.map(c => c.id)) + 1;
}

function addCollection(name, description) {
    const trimmed = name.trim();
    if (!trimmed) return { success: false, message: '题库名称不能为空' };
    const cols = getCollections();
    if (cols.some(c => c.name === trimmed)) return { success: false, message: '题库名称已存在' };
    const col = {
        id: getNextCollectionId(),
        name: trimmed,
        description: description || '',
        problemIds: [],
        createdAt: new Date().toISOString()
    };
    cols.push(col);
    saveCollections(cols);
    return { success: true, data: col };
}

function updateCollection(id, updates) {
    const cols = getCollections();
    const idx = cols.findIndex(c => c.id === id);
    if (idx === -1) return { success: false, message: '题库不存在' };
    if (updates.name) {
        const trimmed = updates.name.trim();
        if (!trimmed) return { success: false, message: '题库名称不能为空' };
        if (cols.some(c => c.id !== id && c.name === trimmed)) return { success: false, message: '题库名称已存在' };
        cols[idx].name = trimmed;
    }
    if (updates.description !== undefined) cols[idx].description = updates.description;
    if (updates.problemIds !== undefined) cols[idx].problemIds = updates.problemIds;
    saveCollections(cols);
    return { success: true, data: cols[idx] };
}

function deleteCollection(id) {
    let cols = getCollections();
    cols = cols.filter(c => c.id !== id);
    saveCollections(cols);
    return { success: true };
}

function addProblemsToCollection(collectionId, problemIds) {
    const cols = getCollections();
    const idx = cols.findIndex(c => c.id === collectionId);
    if (idx === -1) return { success: false, message: '题库不存在' };
    const existing = new Set(cols[idx].problemIds);
    problemIds.forEach(id => existing.add(id));
    cols[idx].problemIds = [...existing];
    saveCollections(cols);
    return { success: true, data: cols[idx] };
}

function removeProblemsFromCollection(collectionId, problemIds) {
    const cols = getCollections();
    const idx = cols.findIndex(c => c.id === collectionId);
    if (idx === -1) return { success: false, message: '题库不存在' };
    const removeSet = new Set(problemIds);
    cols[idx].problemIds = cols[idx].problemIds.filter(id => !removeSet.has(id));
    saveCollections(cols);
    return { success: true, data: cols[idx] };
}

function getProblemsByCollection(collectionId) {
    const cols = getCollections();
    const col = cols.find(c => c.id === collectionId);
    if (!col) return [];
    const idSet = new Set(col.problemIds);
    return PROBLEMS.filter(p => idSet.has(p.id));
}

// ==================== 数学公式工具 ====================

/**
 * 从 Markdown 文本中提取数学公式（$...$ 和 $$...$$），
 * 替换为哨兵字符串以防止 HTML 转义破坏 LaTeX 语法。
 * 必须在代码块提取之后、HTML 转义之前调用。
 *
 * @param {string} text - 已提取代码块的 Markdown 文本
 * @returns {{ text: string, mathBlocks: string[], mathInlines: string[] }}
 */
function extractMathFormulas(text) {
    const mathBlocks = [];   // $$...$$ 显示公式
    const mathInlines = [];  // $...$ 行内公式

    // 0. 保护转义的美元符号：\$ → 哨兵
    text = text.replace(/\\\$/g, '\x01ESCDOLLAR\x01');

    // 1. 提取显示数学公式 $$...$$
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, formula) => {
        const idx = mathBlocks.length;
        // 在存入数组前还原公式内的转义美元符号
        mathBlocks.push(formula.trim().replace(/\x01ESCDOLLAR\x01/g, '\\$'));
        return '\x01MATHBLOCK' + idx + '\x01';
    });

    // 2. 提取行内数学公式 $...$
    //    放宽限制：允许 $ 后的空格，支持中文排版中 "$ O(n) $" 写法
    text = text.replace(/(?<!\$)\$(.+?)\$/g, (_, formula) => {
        const idx = mathInlines.length;
        // 在存入数组前还原公式内的转义美元符号
        mathInlines.push(formula.trim().replace(/\x01ESCDOLLAR\x01/g, '\\$'));
        return '\x01MATHINLINE' + idx + '\x01';
    });

    // 3. 恢复转义的美元符号
    text = text.replace(/\x01ESCDOLLAR\x01/g, '$');

    return { text, mathBlocks, mathInlines };
}

/**
 * 将提取出的数学公式用 KaTeX 渲染后恢复到 HTML 中。
 * 必须在代码块恢复之后调用（此时 HTML 已转义完成）。
 *
 * @param {string} html - 已处理的 HTML 字符串
 * @param {string[]} mathBlocks - 显示公式数组
 * @param {string[]} mathInlines - 行内公式数组
 * @returns {string} 恢复数学公式后的 HTML
 */
function restoreMathFormulas(html, mathBlocks, mathInlines) {
    // 恢复显示公式
    html = html.replace(/\x01MATHBLOCK(\d+)\x01/g, (_, idx) => {
        const formula = mathBlocks[parseInt(idx)];
        if (typeof katex !== 'undefined') {
            try {
                return '<div class="math-block">' +
                    katex.renderToString(formula, { displayMode: true, throwOnError: false }) +
                    '</div>';
            } catch (e) {
                return '<div class="math-block math-error">$$' + escapeHtml(formula) + '$$</div>';
            }
        }
        return '<div class="math-block">$$' + escapeHtml(formula) + '$$</div>';
    });

    // 恢复行内公式
    html = html.replace(/\x01MATHINLINE(\d+)\x01/g, (_, idx) => {
        const formula = mathInlines[parseInt(idx)];
        if (typeof katex !== 'undefined') {
            try {
                return katex.renderToString(formula, { displayMode: false, throwOnError: false });
            } catch (e) {
                return '<span class="math-inline math-error">$' + escapeHtml(formula) + '$</span>';
            }
        }
        return '<span class="math-inline">$' + escapeHtml(formula) + '$</span>';
    });

    return html;
}
