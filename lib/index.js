//防抖
export const debounce = (fn, delay) => {
    let timeout = null; // 创建一个标记用来存放定时器的返回值
    return function (e) {
        // 每当用户输入的时候把前一个 setTimeout clear 掉
        clearTimeout(timeout);
        // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
};

//节流
export const throttle = (fn, delay) => {
    let canRun = true; // 通过闭包保存一个标记
    return function () {
        // 在函数开头判断标记是否为true，不为true则return
        if (!canRun) return;
        // 立即设置为false
        canRun = false;
        // 将外部传入的函数的执行放在setTimeout中
        setTimeout(() => {
            // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
            // 当定时器没有执行的时候标记永远是false，在开头被return掉
            fn.apply(this, arguments);
            canRun = true;
        }, delay);
    };
};

//验证手机号、身份证、ip
export const validate = (e, type) => {
    var exp = null;
    switch (type) {
        case 'id':
            exp = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
            break;
        case 'ip':
            exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            break;
        default:
            exp = /^1[3-9]\d{9}$/;
            break;
    }
    return exp.test(e);
};

//生成[n,m]的随机数
export const randomNum = (minNum, maxNum) => {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
};
/**
 * 千分位
 */
export const commafy = (num) => {
    return num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
};

/**
 *获取 url 中的参数
 */
export const getURLParameters = (url) => {
    return url.match(/([^?=&]+)(=([^&]*))/g).reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {});
};

/**
 *判断当前位置是否为页面底部
 * 返回值为 true/false
 */
export const bottomVisible = () => {
    return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
};
