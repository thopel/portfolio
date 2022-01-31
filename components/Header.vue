<template>
  <header>
    <nuxt-link class="main-link" to="/"
      ><p>Thomas</p>
      <p>Pelfrene</p></nuxt-link
    >
    <nuxt-link class="no-mobile" to="/projets">projets</nuxt-link>
    <nuxt-link class="no-mobile" to="/logos">logotypes</nuxt-link>
    <nuxt-link class="no-mobile" to="/a-propos">à propos</nuxt-link>

    <div id="menu-burger" @click="menuAppear">
      <span id="top"></span>
      <span id="center"></span>
      <span id="bot"></span>
    </div>
    <div id="content-burger">
      <div @click="menuAppear">
        <nuxt-link to="/projets">projets</nuxt-link>
        <nuxt-link to="/logos">logotypes</nuxt-link>
        <nuxt-link to="/a-propos">à propos</nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menu: "close",
    };
  },
  methods: {
    menuAppear() {
      if (this.menu == "close") {
        const gsap = this.$gsap;
        gsap.to("#content-burger", { xPercent: -100, duration: 0.7 });
        gsap.to("#menu-burger span", {
          backgroundColor: "#dc2f02",
          duration: 0.7,
        });
        gsap.to("#top", { y: 11, rotate: 45, duration: 0.7 });
        gsap.to("#bot", { y: -11, rotate: -45, duration: 0.7 });
        gsap.to("#center", { width: 0, duration: 0.7 });
        this.menu = "open";
        document.documentElement.style.overflow = "hidden";
      } else {
        const gsap = this.$gsap;
        gsap.to("#content-burger", { xPercent: 100, duration: 0.7 });
        gsap.to("#menu-burger span", {
          backgroundColor: "#dc2f02",
          duration: 0.7,
        });
        gsap.to("#top", { y: 0, rotate: 0, duration: 0.7 });
        gsap.to("#bot", { y: 0, rotate: 0, duration: 0.7 });
        gsap.to("#center", { width: 35, duration: 0.7 });
        this.menu = "close";
        document.documentElement.style.overflow = "scroll";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  position: relative;
  width: 100vw;
  height: 105px;
  justify-content: space-between;
  align-items: center;
  color: $main;
  padding-bottom: 20px;
  padding-top: 20px;
  z-index: 10;

  a {
    font-size: 2rem;
    font-family: $Readex-Regular;
    z-index: 1;
    position: relative;
    padding: 6px;
    outline: none;
    border: none;
    background-color: transparent;
    overflow: hidden;
    transition: color 0.4s ease-in-out;

    &.no-mobile {
      @include mobile {
        display: none;
      }
    }

    &::before {
      content: "";
      z-index: -1;
      position: absolute;
      top: 100%;
      right: 100%;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      background-color: $main;
      transform-origin: center;
      transform: translate3d(50%, -50%, 0) scale3d(0, 0, 0);
      transition: transform 0.45s ease-in-out;
    }

    &.nuxt-link-exact-active:not(.main-link) {
      cursor: pointer;
      color: $secondary;
      background-color: $main;
    }

    &:hover {
      cursor: pointer;
      color: $secondary;
    }

    &:not(.main-link) {
      &:hover::before {
        transform: translate3d(50%, -50%, 0) scale3d(15, 15, 15);
      }
    }

    &:first-child {
      display: flex;
      flex-direction: column;

      &:hover {
        p:first-child {
          transform: translateX(15px);
        }
      }

      p {
        text-transform: uppercase;
        transition: 0.4s all ease-in-out;
        background-color: $main;
        line-height: 90%;
        padding: 5px;
        width: fit-content;
        color: $secondary;
        font-family: $Readex-Medium;
      }
    }
  }
  #menu-burger {
    position: absolute;
    right: 0px;
    padding-right: 1.8rem;
    top: 26px;
    display: none;
    flex-direction: column;
    height: fit-content;
    align-items: flex-end;
    gap: 7px;
    z-index: 999;
    width: fit-content;

    span {
      width: 35px;
      border-radius: 10px;
      height: 4px;
      background-color: $main;
    }
  }

  #content-burger {
    height: 100vh;
    width: 100vw;
    background-color: $secondary;
    position: absolute;
    display: none;
    top: 0;
    right: -100vw;
    z-index: 990;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: hidden;
  }
  #content-burger > div {
    height: fit-content;
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 20px;
    padding-top: 40px;

    &:first-child {
      padding-top: 120px;
    }
  }
  #content-burger a {
    text-decoration: none;
    color: $main;
    text-transform: uppercase;
    font-size: 3rem;
    font-family: $Readex-SemiBold;
    text-align: right;
    width: 100%;

    &.nuxt-link-exact-active {
      cursor: pointer;
      color: $secondary;
      background-color: $main;
    }
  }
  @include mobile {
    #menu-burger,
    #content-burger {
      display: flex !important;
      // top: 55px !important;
    }
  }
}
</style>
