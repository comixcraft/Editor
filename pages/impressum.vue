<script setup></script>

<template>
    <div class="impressum">
        <div class="top-nav">
            <img src="/public/TextwithBg.svg" alt="" class="top-nav__logo" />
        </div>

        <h1>Imprint</h1>
        <p>
            comixcraft is a project developed at the Sankt Pölten University of Applied Sciences (STPUAS), Austria, as
            part of the MediaLab semester project of the Creative Computing program.
        </p>

        <h2>Projectteam</h2>
        <ul>
            <li>Vanessa Köck</li>
            <li>Antoine Muneret</li>
            <li>Florent Gabillion</li>
            <li>Juliana Matusmura</li>
            <li>Anna Blasinger</li>
            <li>Alica Holla</li>
            <li>Hannah Wagner</li>
        </ul>

        <h2>Supervision</h2>
        <p>Dr. Victor-Adriel De-Jesus-Oliveira, MSc</p>

        <h2>Media owner</h2>
        <NuxtLink to="https://www.fhstp.ac.at/de/impressum/impressum?set_language=de" target="_blank"
            >Fachhochschule St. Pölten GmbH</NuxtLink
        >
        <p>3100 St. Pölten, Campus-Platz 1</p>

        <NuxtLink to="https://www.fhstp.ac.at/en/legal-information/legal-information?set_language=en" target="_blank">
            Legal Information
        </NuxtLink>

        <h2>Collected Data</h2>
        <p>
            The application does not collect any personal data. The only data collected is the user's input for the
            comic creation process, which is stored in the browser's local storage. This data is not shared with any
            third party.
        </p>

        <h2>Licence</h2>
        <p>
            comixcraft and the used
            <NuxtLink to="https://fhstp.github.io/comixplain/" target="_blank">Comixplain</NuxtLink> assets are CC BY-SA
            licensed, and you can create comics and share them under the same license.
        </p>

        <FooterComponent />
    </div>
</template>

<style scoped lang="scss">
    .top-nav {
        justify-content: flex-start;
    }

    .top-nav__logo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 10rem;
    }

    a {
        text-decoration: none;
        color: $black-100;
    }

    a:hover {
        color: $primary-100;
        text-decoration: underline;
    }

    @include media-breakpoint-up(lg) {
        .top-nav {
            justify-content: flex-start;
            padding: $spacer-4 $spacer-3;
        }
        .top-nav__logo {
            justify-content: flex-start;
        }
    }
</style>
