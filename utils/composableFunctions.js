const comicStore = useComicStore();
let lastClickTime = Date.now();

function detectDoubleClick(event, element) {
    console.log(element);
    event.preventDefault();
    if (element) {
        let currentClickTime = Date.now();
        if (currentClickTime - lastClickTime < 300) {
            comicStore.setCurrentElement(element);
        }
        lastClickTime = currentClickTime;
    } else {
        console.log('open comic');
    }
}

export { detectDoubleClick };
