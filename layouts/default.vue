<template>
  <div id="default">
    <Header :style="$route.name == 'index' ? 'position: fixed;' : ''" />
    <Nuxt />
    <Footer
      :style="$route.name == 'index' ? 'position: fixed; bottom: 0;' : ''"
      v-if="$route.name !== 'logos'"
    />
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

#default {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: url("~/assets/medias/noise.webp") bottom center / cover no-repeat;
  width: 100vw;
  height: fit-content;
  min-height: 100vh;
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
}

a {
  text-decoration: none;
  color: inherit;
}

ul,
li {
  list-style: none;
}

header,
nav,
section,
main,
footer,
article {
  padding: 0 6.4rem;

  @include tablet {
    padding: 0 2.4rem;
  }

  @include mobile {
    padding: 0 1.8rem;
  }
}
</style>
