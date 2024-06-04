const comicStore = useComicStore();
let lastClickTime = Date.now();

function detectDoubleClick(event, element) {
    console.log(element);
    console.log(event);
    event.preventDefault();
    let currentClickTime = Date.now();
    if (currentClickTime - lastClickTime < 300) {
        comicStore.setCurrentElement(element);
    }
    lastClickTime = currentClickTime;
}

export { detectDoubleClick };
