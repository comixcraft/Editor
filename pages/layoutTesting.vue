<template>

    <div>
      <div class = "topNav">
        <div class = "logo">
            comixcraft
        </div>
      </div>
      <div class = "welcomeContainer">
      <div class = "welcomeText">
        <div class = "welcome">
            <h1>welcome to comixcraft</h1>
        </div>
        <div class="introText">
            <p>With plenty of templates and assets to choose from,
            the only limit is your imagination! Get started now by choosing a template!</p>
        </div>
      </div>
      <div class = "comicImage">
        <p>placeholder</p>
      </div>
    </div>
      <div class = "templates">
        <h3>templates</h3>
        <p>start by choosing a template</p>
        <h5>comic panels</h5>
        <div class = "comicPanels">
            <div class = "singleTemplate"></div>
            <div class = "singleTemplate"></div>
            <div class = "singleTemplate"></div>
            <div class = "singleTemplate"></div>
            <div class = "singleTemplate"></div>
            <div class = "singleTemplate"></div>
        </div>
        <h5>comic strips</h5>
        <div class = "comicPanels">
            <div class = "singleTemplate"></div>
            <div class = "singleTemplate"></div>
            <div class = "singleTemplate"></div>
            <div class = "singleTemplate"></div>
            <div class = "singleTemplate"></div>
        </div>
        <button class = "startBtn">start craftin</button>
      </div>
    </div>

</template>

<script setup>

</script>

<style scoped lang="scss">
.topNav {
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, #6360F4 44.5%, #F460B7 100%);
    width: 100%;
    height: 80px;
    margin: 0;
}
.logo {
    display: flex;
    flex-direction: row;
    margin-left: 5%;
    justify-content: flex-start;
    justify-content: center;
    color: #FFF;
}

.templates {
    background: var(--Off-white-100, #F5F5F5);
    width: 100%;
}
.welcomeContainer{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 200px;
    background: var(--White-100, #FFF);
}
.welcomeText {
    display: flex;
    flex-direction: column;
} 
.welcome{
    display: flex;
    width: 50%;
    padding: 0%;
    margin: 0;
}
.introText{
    display: flex;
}
.comicImage{
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 50%;
}

.comicPanels {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    width: 100%;
    flex-wrap: nowrap; /* prevent items from wrapping */
}



.singleTemplate{
    height: 200px;
    width: 150px;
    background-color: gray;
    flex: 0 0 auto; /* prevent items from flexing and maintain their size */
}

.startBtn{
    display: flex;
    width: 358px;
    padding: 12px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: #F460B7;
    position: relative;
}
</style>
