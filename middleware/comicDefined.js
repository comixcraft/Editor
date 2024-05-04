export default defineNuxtRouteMiddleware(() => {
    const comicStore = useComicStore();
    console.log(comicStore.comic);
    console.log(comicStore.comic.getPage(0));
    if (
        !(
            comicStore.comic.getPage(0) &&
            comicStore.comic.getPage(0).getStrip(0) &&
            comicStore.comic.getPage(0).getStrip(0).getPanel(0)
        )
    ) {
        return navigateTo('/');
    }
});
