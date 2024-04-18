<template>
    <div class="share">
        <div class="share__top-nav">
            <div class="top-nav__item back-btn icon" @click="$emit('back')">arrow_back</div>
            <div class="top-nav__item download-txt h3">Download Comic</div>
        </div>
        <div class="share__body">
            <div class="input-group">
                <label for="project-name">Project Name:</label>
                <input type="text" id="project-name" placeholder="Enter project name" />
            </div>
            <div class="input-group">
                <label for="file-type">File Type:</label>
                <select id="file-type">
                    <option value="png">PNG</option>
                </select>
            </div>
            <div class="input-group">
                <label for="select-panels">Select Panels:</label>
                <select id="select-panels">
                    <option value="1">All panels</option>
                </select>
            </div>
            <div class="preview">
                <h3>Preview:</h3>
                <div class="preview-placeholder">Placeholder for preview</div>
            </div>
        </div>
        <div class="confirm">
            <button class="confirm__btn" @click="confirmationShow = true">Download</button>
        </div>
        <ScreenOverlay title="Download Successful" :show="confirmationShow" @close="confirmationShow = false">
            <h1 class="tempThing">Temporary, pop up would go here, juju its your time to shine</h1>
        </ScreenOverlay>
    </div>
</template>

<script setup>
    let confirmationShow = ref(false);
    defineEmits(['back']);
</script>

<style scoped lang="scss">
    .share__top-nav {
        display: flex;
        align-items: center;
        justify-content: left;
        background: linear-gradient(90deg, #6360f4 44.5%, #f460b7 100%);
        height: 80px;
        margin: 0;
    }

    .share__body {
        padding: $spacer-3;
    }

    .input-group {
        margin-bottom: $spacer-4;
    }

    .input-group label {
        display: block;
        margin-bottom: 5px;
    }

    .input-group input,
    .input-group select {
        padding: $spacer-2;
        padding-right: $spacer-6;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .preview {
        margin-top: 20px;
    }

    .preview-placeholder {
        width: 100%;
        height: 200px;
        background-color: #eee;
        border: 1px solid #ccc;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .confirm {
        position: absolute;
        bottom: 10%;
        right: 7%;
        padding: $spacer-3;
        z-index: 999;
    }

    .confirm__btn {
        position: absolute;
        bottom: 10%;
        right: 7%;
        padding: $spacer-3;
        background-color: #f460b7;
        z-index: 9999;
    }

    .tempThing {
        position: absolute;
        bottom: 25%;
    }

    .top-nav__item {
        padding: $spacer-3;
        $font-size-phone: 3;
    }
</style>
