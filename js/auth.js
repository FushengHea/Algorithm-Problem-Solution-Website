/**
 * 算法题解库 - 管理密码校验
 * 首页（题解页的编辑入口）与管理后台共用同一套密码逻辑
 */

const PASSWORD_HASH = '1d97745c328462d65aa8028d262df0e6b47c9fae409f04fd1d31f31c4736d38e';
const AUTH_SESSION_KEY = 'adminAuth';

async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function isAuthenticated() {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
}

function markAuthenticated() {
    sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
}

/** 校验管理密码，返回 Promise<boolean> */
async function verifyAdminPassword(input) {
    if (!input) return false;
    return (await sha256(input)) === PASSWORD_HASH;
}

/** 在输入框上播放一次抖动反馈 */
function shakeAuthError(errorEl) {
    errorEl.style.display = 'block';
    errorEl.style.animation = 'none';
    errorEl.offsetHeight; // 触发回流
    errorEl.style.animation = 'authShake 0.3s ease';
}
