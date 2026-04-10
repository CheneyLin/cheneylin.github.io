// 默认的JSON模板
const defaultTemplate = {
    "$slot_content": ["title"],
    "goods_id": ["goods_id"],
    "$extra": {
        "jump_url": ["jumpUrl"]
    }
};

// 历史记录存储键名
const HISTORY_KEY = 'xmreportrule_history';

const editor = document.getElementById('jsonEditor');
const statusMessage = document.getElementById('statusMessage');
const jsonInfo = document.getElementById('jsonInfo');
const jsonSize = document.getElementById('jsonSize');
const historyList = document.getElementById('historyList');
const historyCount = document.getElementById('historyCount');

// 更新状态信息
function updateStatus(message, type = 'info') {
    const icons = {
        info: 'ℹ️',
        success: '✅',
        error: '❌',
        warning: '⚠️'
    };
    statusMessage.className = `status-message ${type}`;
    statusMessage.innerHTML = `<span>${icons[type]}</span> ${message}`;
}

// 更新编辑器信息
function updateEditorInfo() {
    const content = editor.value;
    const charCount = content.length;
    const lineCount = content.split('\n').length;
    const size = new Blob([content]).size;

    jsonInfo.textContent = `字数: ${charCount} | 行数: ${lineCount}`;
    jsonSize.textContent = `JSON大小: ${formatBytes(size)}`;
}

// 格式化字节大小
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 生成JSON (API模块)
function generateJSON() {
    const modType = document.getElementById('modTypeInput').value.trim();

    if (!modType) {
        updateStatus('请输入模块英文标识 (mod_type)', 'warning');
        document.getElementById('modTypeInput').focus();
        return;
    }

    const jsonData = {
        mod_type: modType,
        mod_id: modType,
        ...defaultTemplate
    };

    editor.value = JSON.stringify(jsonData, null, 4);
    updateStatus(`已成功生成 mod_type: "${modType}" 的JSON数据 (API模块)`, 'success');
    updateEditorInfo();
}

// 生成DEV模块JSON
function generateDevJSON() {
    const modType = document.getElementById('modTypeInput').value.trim();

    if (!modType) {
        updateStatus('请输入模块英文标识 (mod_type)', 'warning');
        document.getElementById('modTypeInput').focus();
        return;
    }

    const jsonData = {
        "mod_type": modType,
        "mod_id": "dev",
        "$slot_content": "待补充中文描述",
        "$element_id": modType
    };

    editor.value = JSON.stringify(jsonData, null, 4);
    updateStatus(`已成功生成 DEV模块 的JSON数据 (mod_id: dev)`, 'success');
    updateEditorInfo();
}

// 验证JSON格式
function validateJSON() {
    const content = editor.value.trim();

    if (!content) {
        updateStatus('编辑器内容为空，请先生成或输入JSON', 'warning');
        return;
    }

    try {
        const parsed = JSON.parse(content);
        updateStatus('✅ JSON格式验证通过！', 'success');

        // 检查必需的字段
        const requiredFields = ['mod_type', 'mod_id'];
        const missingFields = requiredFields.filter(field => !parsed[field]);

        if (missingFields.length > 0) {
            updateStatus(`⚠️ JSON格式正确，但缺少建议字段: ${missingFields.join(', ')}`, 'warning');
        }

        return parsed;
    } catch (e) {
        updateStatus(`❌ JSON格式错误: ${e.message}`, 'error');
        return null;
    }
}

// 格式化JSON
function formatJSON() {
    const content = editor.value.trim();

    if (!content) {
        updateStatus('编辑器内容为空', 'warning');
        return;
    }

    try {
        const parsed = JSON.parse(content);
        editor.value = JSON.stringify(parsed, null, 4);
        updateStatus('✅ JSON格式化完成', 'success');
        updateEditorInfo();
    } catch (e) {
        updateStatus(`❌ 无法格式化: ${e.message}`, 'error');
    }
}

// 复制JSON到剪贴板
async function copyJSON() {
    const content = editor.value.trim();

    if (!content) {
        updateStatus('编辑器内容为空', 'warning');
        return;
    }

    try {
        await navigator.clipboard.writeText(content);
        updateStatus('✅ 已复制到剪贴板', 'success');
    } catch (e) {
        // 兼容旧浏览器
        const textarea = document.createElement('textarea');
        textarea.value = content;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        updateStatus('✅ 已复制到剪贴板', 'success');
    }
}

// 导出JSON到本地文件
function exportJSON() {
    const content = editor.value.trim();

    if (!content) {
        updateStatus('编辑器内容为空，请先生成或输入JSON', 'warning');
        return;
    }

    // 先验证JSON格式
    try {
        JSON.parse(content);
    } catch (e) {
        updateStatus(`❌ JSON格式错误，无法导出: ${e.message}`, 'error');
        return;
    }

    // 获取mod_type作为文件名
    let filename = 'report_rule.json';
    try {
        const parsed = JSON.parse(content);
        if (parsed.mod_type) {
            filename = `${parsed.mod_type}.json`;
        }
    } catch (e) {
        // 使用默认文件名
    }

    // 创建下载链接
    const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    updateStatus(`✅ 已导出文件: ${filename}`, 'success');
}

// 保存到历史记录
function saveToHistory() {
    const content = editor.value.trim();

    if (!content) {
        updateStatus('编辑器内容为空，请先生成或输入JSON', 'warning');
        return;
    }

    // 先验证JSON格式
    try {
        JSON.parse(content);
    } catch (e) {
        updateStatus(`❌ JSON格式错误，无法保存: ${e.message}`, 'error');
        return;
    }

    // 获取mod_type和mod_id
    let name = '未命名';
    let mode = 'api';
    try {
        const parsed = JSON.parse(content);
        if (parsed.mod_type) {
            name = parsed.mod_type;
        }
        if (parsed.mod_id === 'dev') {
            mode = 'dev';
        }
    } catch (e) {
        // 使用默认值
    }

    // 获取现有历史记录
    let history = getHistory();

    // 检查是否已存在同名记录，存在则更新
    const existingIndex = history.findIndex(item => item.name === name);
    const newItem = {
        name: name,
        content: content,
        mode: mode,
        time: new Date().toISOString()
    };

    if (existingIndex !== -1) {
        // 更新现有记录的时间，移到最前面
        history.splice(existingIndex, 1);
        history.unshift(newItem);
    } else {
        // 添加新记录到开头
        history.unshift(newItem);
    }

    // 保存到localStorage
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

    // 重新渲染历史记录
    renderHistory();
    updateStatus(`✅ 已保存: ${name}`, 'success');
}

// 获取历史记录
function getHistory() {
    try {
        const data = localStorage.getItem(HISTORY_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

// 删除历史记录项
function deleteHistoryItem(name) {
    const history = getHistory();
    const newHistory = history.filter(item => item.name !== name);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    renderHistory();
    updateStatus(`已删除: ${name}`, 'info');
}

// 导出历史记录为Markdown
function exportHistoryMarkdown() {
    const history = getHistory();

    if (history.length === 0) {
        updateStatus('暂无历史记录可导出', 'warning');
        return;
    }

    // 按mod_type字母顺序排序
    history.sort((a, b) => a.name.localeCompare(b.name));

    // 生成Markdown内容
    let md = '# XM 上报规则\n\n';
    md += '> 自动生成的上报规则配置\n\n';
    md += '---\n\n';

    history.forEach(item => {
        const mode = item.mode || 'api';
        const modeLabel = mode === 'dev' ? '[DEV]' : '[API]';

        // 解析JSON获取简略信息
        let brief = '';
        try {
            const parsed = JSON.parse(item.content);
            if (parsed.$slot_content) {
                brief = `描述: ${parsed.$slot_content}`;
            }
            if (parsed.$element_id) {
                brief += ` | 元素: ${parsed.$element_id}`;
            }
        } catch (e) {
            // 忽略解析错误
        }

        md += `## ${modeLabel} ${item.name}\n\n`;
        if (brief) {
            md += `> ${brief}\n\n`;
        }
        md += '```json\n';
        // 格式化JSON，缩进2空格
        try {
            const parsed = JSON.parse(item.content);
            md += JSON.stringify(parsed, null, 2);
        } catch (e) {
            md += item.content;
        }
        md += '\n```\n\n---\n\n';
    });

    // 下载文件
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'xm_report_rules.md';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    updateStatus(`✅ 已导出 ${history.length} 条记录到 xm_report_rules.md`, 'success');
}

// 渲染历史记录列表
function renderHistory() {
    const history = getHistory();

    // 更新计数
    historyCount.textContent = `${history.length} 条`;

    if (history.length === 0) {
        historyList.innerHTML = '<div class="history-empty">暂无历史记录</div>';
        return;
    }

    historyList.innerHTML = history.map(item => {
        const mode = item.mode || 'api';
        const modeClass = mode === 'dev' ? 'mode-dev' : 'mode-api';
        const modeLabel = mode === 'dev' ? 'DEV' : 'API';
        return `
            <div class="history-item" onclick="loadHistoryItem('${item.name}')" ondblclick="deleteHistoryItem('${item.name}')">
                <div class="history-item-info">
                    <div class="history-item-name">${item.name}</div>
                    <span class="history-item-mode ${modeClass}">${modeLabel}</span>
                </div>
                <button class="history-item-delete" onclick="event.stopPropagation(); deleteHistoryItem('${item.name}')">删除</button>
            </div>
        `;
    }).join('');
}

// 加载历史记录项
function loadHistoryItem(name) {
    const history = getHistory();
    const item = history.find(i => i.name === name);

    if (item) {
        editor.value = item.content;

        // 尝试提取mod_type并填充输入框
        try {
            const parsed = JSON.parse(item.content);
            if (parsed.mod_type) {
                document.getElementById('modTypeInput').value = parsed.mod_type;
            }
        } catch (e) {
            // 忽略解析错误
        }

        updateEditorInfo();
        updateStatus(`已加载: ${name}`, 'success');
    }
}

// 监听编辑器内容变化
editor.addEventListener('input', updateEditorInfo);

// 回车键快速生成
document.getElementById('modTypeInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateJSON();
    }
});

// 初始化
updateEditorInfo();
renderHistory();
