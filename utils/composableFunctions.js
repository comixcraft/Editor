let lastClickTime = Date.now();

function detectDoubleClick(event, callback, callbackArg) {
    let currentClickTime = Date.now();
    if (currentClickTime - lastClickTime < 300) {
        callback(callbackArg);
    }
    lastClickTime = currentClickTime;
}

export { detectDoubleClick };
