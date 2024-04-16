<template>
    <div>
        <div class="topNav">
            <div class="logo">comixcraft</div>
        </div>
        <div class="container">
            <div class="d-flex pb-3 pb-lg-0">
                <div class="welcomeText">
                    <div class="welcome">
                        <h1>welcome to comixcraft</h1>
                    </div>
                    <div class="introText">
                        <p>
                            With plenty of templates and assets to choose from, the only limit is your imagination! Get
                            started now by choosing a template!
                        </p>
                    </div>
                </div>
                <div class="comicImage">
                    <p>placeholder</p>
                </div>
            </div>
            <div class="templates">
                <h3>templates</h3>
                <p>start by choosing a template</p>
                <h5>comic panels</h5>
                <div class="comicPanels">
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                </div>
                <h5>comic strips</h5>
                <div class="comicPanels">
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                </div>
            </div>
            <button class="startBtn">start craftin</button>
        </div>
        <button @click="layersShow = true">djshbsdjflw</button>
        <ScreenOverlay title="Layers" :show="layersShow" @close="layersShow = false">layers go here</ScreenOverlay>
    </div>
</template>

<script setup>
    let layersShow = ref(false);
</script>

<style scoped lang="scss">
    .topNav {
        display: flex;
        align-items: center;
        background: linear-gradient(90deg, #6360f4 44.5%, #f460b7 100%);
        height: 80px;
        margin: 0;
    }
    .logo {
        display: flex;
        flex-direction: row;
        margin-left: $spacer-3;
        justify-content: flex-start;
        justify-content: center;
        color: #fff;
    }

    .templates {
        background: var(--Off-white-100, #f5f5f5);
    }
    .welcomeText {
        display: flex;
        flex-direction: column;
    }
    .welcome {
        display: flex;
        padding: 0%;
        margin: 0;
    }
    .introText {
        display: flex;
    }
    .comicImage {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .comicPanels {
        display: flex;
        gap: 20px;
        width: 100%;
        overflow-x: auto;
        flex-wrap: nowrap; /* prevent items from wrapping */
    }

    .singleTemplate {
        height: 200px;
        width: 150px;
        background-color: gray;
        flex: 0 0 auto; /* prevent items from flexing and maintain their size */
    }

    .startBtn {
        display: flex;
        padding: $spacer-3;
        justify-content: center;
        align-items: center;
        gap: 8px;
        background-color: #f460b7;
        position: relative;
    }
</style>
