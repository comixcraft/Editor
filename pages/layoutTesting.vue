<template>
    <div>
        <div class="topNav">
            <div class="logo">comixcraft</div>
        </div>
        <div class="container">
            <div class="d-flex pb-3 pb-lg-0">
                <div class="welcomeText">
                    <div class="welcome">
                        <h1>Welcome to comixcraft!</h1>
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
                <h2>Templates</h2>
                <p class="font-italic">start by choosing a template</p>
                <h3>comic panels</h3>
                <p>A comic panel is a single frame within a comic strip.</p>
                <div class="comicPanels">
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                    <div class="singleTemplate"></div>
                </div>
                <h3>comic strips</h3>
                <p>A comic strip consists of a series of panels.</p>
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
    </div>
</template>

<script setup></script>

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
        padding-top: $spacer-4;
    }
    .welcomeText {
        display: flex;
        flex-direction: column;
        padding: $spacer-2;
        margin-top: $spacer-3;
    }
    .welcome {
        display: flex;
    }
    .introText {
        display: flex;
        justify-content: left;
        width: 45vw;
        margin-top: $spacer-2;
    }
    .comicImage {
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 55vw;
    }

    .comicPanels {
        display: flex;
        gap: $spacer-3;
        width: 100%;
        overflow-x: auto;
        flex-wrap: nowrap;
        margin-top: $spacer-4;
    }

    .singleTemplate {
        padding: 100px;
        background-color: gray;
        flex: 0 0 auto;
        margin-bottom: $spacer-4;
    }
    .startBtn {
        display: flex;
        padding: $spacer-3;
        padding-left: $spacer-5;
        padding-right: $spacer-5;
        justify-content: center;
        align-items: center;
        gap: 8px;
        background-color: #f460b7;
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
    }
</style>
