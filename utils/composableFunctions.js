import { useToast } from 'vue-toast-notification';

let lastClickTime = Date.now();

function detectDoubleClick(event, callback, callbackArg) {
    let currentClickTime = Date.now();
    if (currentClickTime - lastClickTime < 300) {
        callback(callbackArg);
    }
    lastClickTime = currentClickTime;
}

function generateToast(type, message) {
    const $toast = useToast();
    $toast[type](message, {
        position: 'top',
        duration: 4000,
    });
}

export { detectDoubleClick, generateToast };
