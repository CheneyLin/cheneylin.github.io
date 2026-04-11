/**
 * 电子吧唧 2 期 - APP 端原型共享脚本
 * 提供页面切换、弹窗控制、Toast 提示等通用功能
 */

// 页面切换函数
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // 滚动到目标页面
        targetPage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// 全局视图切换
let isGlobalView = true;

function toggleGlobalView() {
    const container = document.getElementById('prototypeContainer');
    const btn = document.querySelector('.control-btn');
    
    if (!container || !btn) return;
    
    isGlobalView = !isGlobalView;
    
    if (isGlobalView) {
        container.classList.add('global-view');
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-th"></i><span>全局视图</span>';
        
        // 显示所有页面
        const pages = document.querySelectorAll('.page-section');
        pages.forEach(page => {
            page.style.display = 'block';
        });
    } else {
        container.classList.remove('global-view');
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-mobile-alt"></i><span>单页模式</span>';
        
        // 只显示第一个页面
        const pages = document.querySelectorAll('.page-section');
        pages.forEach((page, index) => {
            page.style.display = index === 0 ? 'block' : 'none';
        });
    }
}

// 显示抽选结果弹窗
function showDrawResult(type) {
    const modal = document.getElementById('draw_result_modal');
    if (modal) {
        modal.classList.add('show');
    }
}

// 显示合并升级弹窗
function showMergeUpgrade() {
    const modal = document.getElementById('merge_upgrade_modal');
    if (modal) {
        modal.classList.add('show');
    }
}

// 关闭弹窗
function closeModal() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => modal.classList.remove('show'));
}

// 整包购买处理
function handlePackPurchase() {
    showToast('恭喜获得 20 张吧唧图片，已存入您的图库');
    setTimeout(() => {
        showPage('app_badge_gallery');
    }, 1500);
}

// 提交邮寄申请
function submitDelivery() {
    showToast('申请提交成功，请在订单中查看物流信息');
    setTimeout(() => {
        showPage('app_badge_gallery');
    }, 1500);
}

// 显示 Toast 提示
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// 初始化：默认显示所有页面（全局视图）
document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.style.display = 'block';
    });
});
