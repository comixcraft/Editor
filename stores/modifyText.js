export const modifyText = reactive({
    clicks: 0,
    setClicks(value) {
        this.clicks = value;
    },
    incrementClicks() {
        this.clicks++;
    },
    currentElement: null,
    setCurrentElement(element) {
        this.currentElement = element;
    },
});
