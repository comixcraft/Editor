<script setup></script>

<template>
    <div class="top-nav">
        <img src="/public/TextwithBg.svg" alt="" class="top-nav__logo" />
    </div>

    <div class="container-fluid">
        <div class="impressum">
            <div class="content">
                <h1>Imprint</h1>
                <p>
                    comixcraft is a project developed at the St. Pölten University of Applied Sciences (FHSTP), Austria,
                    as part of the MediaLab semester project of the Creative Computing program. comixcraft is based on
                    <NuxtLink class="linkText" to="https://fhstp.github.io/comixplain/" target="_blank"
                        >Comixplain
                    </NuxtLink>
                    and utilizes the existing assets from that project.
                </p>
            </div>

            <div class="content">
                <h2>Collected Data</h2>
                <p>
                    The application does not collect any personal data. The only data collected is the user's input for
                    the comic creation process, which is stored in the browser's local storage. This data is not shared
                    with any third party.
                </p>
            </div>

            <div class="content">
                <h2>Contributors</h2>
                <ul class="lists">
                    <li>Vanessa Köck</li>
                    <li>Antoine Muneret</li>
                    <li>Florent Gabillon</li>
                    <li>Juliana Matsumura</li>
                    <li>Anna Blasinger</li>
                    <li>Alica Holla</li>
                    <li>Hannah Wagner</li>
                </ul>
            </div>

            <div class="content">
                <h2>Supervision</h2>
                <p>Dr. Victor-Adriel De-Jesus-Oliveira, MSc</p>
            </div>
            <div class="content">
                <h2>Media owner</h2>

                <ul class="lists">
                    <li class="font-bold">Fachhochschule St. Pölten GmbH</li>
                    <li>Campus-Platz 1</li>
                    <li>3100 St. Pölten</li>
                    <li>Austria</li>
                </ul>

                <p>
                    <NuxtLink
                        class="linkText"
                        to="https://www.fhstp.ac.at/en/legal-information/legal-information?set_language=en"
                        target="_blank"
                        >Legal Information</NuxtLink
                    >,
                    <NuxtLink
                        class="linkText"
                        to="https://www.fhstp.ac.at/de/impressum/impressum?set_language=de"
                        target="_blank"
                        >Imprint
                    </NuxtLink>
                </p>
            </div>

            <div class="content">
                <h2>Licence</h2>
                <p>
                    comixcraft and the used
                    <NuxtLink class="linkText" to="https://fhstp.github.io/comixplain/" target="_blank"
                        >Comixplain
                    </NuxtLink>
                    assets are CC BY-SA licensed, and you can create comics and share them under the same license.
                </p>
            </div>

            <div class="content">
                <h2>GitHub</h2>
                <p>
                    Comixcraft is an open-source project and the repository is accessible on
                    <NuxtLink class="linkText" to="https://github.com/comixcraft" target="_blank">GitHub</NuxtLink>.
                </p>
            </div>
        </div>
    </div>

    <FooterComponent />
</template>

<style scoped lang="scss">
    .impressum {
        display: flex;
        flex-direction: column;
        gap: $spacer-4;
        padding: $spacer-5;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: $spacer-3;
    }

    .top-nav {
        justify-content: flex-start;
    }

    .top-nav__logo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 10rem;
    }

    .linkText {
        color: $black-100;
    }

    .linkText:hover {
        color: $primary-100;
        text-decoration: underline;
    }

    .lists {
        list-style-type: none;
        padding: 0;
    }

    .font-bold {
        font-weight: bold;
    }

    @include media-breakpoint-up(lg) {
        .impressum {
            width: 65%;
        }

        .top-nav {
            justify-content: flex-start;
            padding: $spacer-4 $spacer-3;
        }

        .top-nav__logo {
            justify-content: flex-start;
        }
    }
</style>
