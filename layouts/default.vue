<template>
  <div id="default">
    <Header
      v-gsap.to="{
        delay: 2.5,
        opacity: 1,
      }"
      :style="$route.name == 'index' ? 'position: fixed;' : ''"
    />
    <Nuxt />
    <Footer
      v-if="$route.name == 'index' || $route.name == 'a-propos'"
      v-gsap.to="{
        delay: 2.5,
        opacity: 1,
      }"
      :style="$route.name == 'index' ? 'position: fixed; bottom: 0;' : ''"
    />
    <Footer v-else style="display: none"></Footer>
  </div>
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default {};
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*::-webkit-scrollbar {
  display: none;
}

.loader_wrapper {
  width: 100%;
  position: relative;
  transform: translateY(-20vh);
  @include flexbox(column, center, center);

  .loader {
    background: url("~/assets/medias/spirale.svg") center / cover no-repeat;
    width: 15vw;
    height: 15vw;
    animation: turn 1.5s linear infinite;
    opacity: 0.4;

    @include tablet {
      width: 30vw;
      height: 30vw;
    }
  }

  p {
    margin-top: 2vw;
    font-family: $Eugusto;
    font-size: 4rem;
    opacity: 0.4;
  }
}

@keyframes turn {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

#default {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: fit-content;
  min-height: 100vh;
  background-color: #f0f0f0;
}

html {
  font-size: $fs-html;
  height: -webkit-fill-available;
  position: relative;
  overflow-x: hidden;
  width: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  transition: background-color 0.5s;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow-y: scroll !important;
}

a {
  text-decoration: none;
  color: inherit;
  position: relative;
}

ul,
li {
  list-style: none;
}

.sticker {
  position: absolute;
  width: auto;
  height: 8vw;
  z-index: 9;

  @include mobile {
    height: 25vw;
  }
}

.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

header,
nav,
main,
footer {
  padding: 0 6.4rem;

  @include tablet {
    padding: 0 2.4rem;
  }

  @include mobile {
    padding: 0 1.8rem;
  }
}
</style>
