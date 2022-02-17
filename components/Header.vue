<template>
  <header>
    <nuxt-link class="no-mobile" to="/">home</nuxt-link>
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
        <nuxt-link to="/">home</nuxt-link>
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
          backgroundColor: "#131313",
          duration: 0.7,
        });
        gsap.to("#top", { y: 11, rotate: 45, duration: 0.7 });
        gsap.to("#bot", { y: -11, rotate: -45, duration: 0.7 });
        gsap.to("#center", { width: 0, duration: 0.7 });
        document.documentElement.lastChild.style.overflowY = "hidden";
        this.menu = "open";
      } else {
        const gsap = this.$gsap;
        gsap.to("#content-burger", { xPercent: 100, duration: 0.7 });
        gsap.to("#menu-burger span", {
          backgroundColor: "#131313",
          duration: 0.7,
        });
        gsap.to("#top", { y: 0, rotate: 0, duration: 0.7 });
        gsap.to("#bot", { y: 0, rotate: 0, duration: 0.7 });
        gsap.to("#center", { width: 35, duration: 0.7 });
        document.documentElement.lastChild.style.overflowY = "scroll";
        this.menu = "close";
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
  opacity: 0;

  a {
    font-size: 2rem;
    font-family: $Readex-Regular;
    z-index: 1;
    position: relative;
    outline: none;

    &:hover,
    &.nuxt-link-exact-active {
      &:before {
        transform: scale(1);
      }
    }

    &.no-mobile {
      @include mobile {
        display: none;
      }
    }

    &:before {
      content: "";
      position: absolute;
      bottom: 2px;
      left: -2rem;
      width: 2rem;
      background: url("~/assets/medias/spirale.svg") center / cover no-repeat;
      height: 2rem;
      transform: scale(0);
      transition: transform 0.2s ease-in-out;
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
    backdrop-filter: blur(8px);
    background: $secondary-50;
    position: absolute;
    display: none;
    top: 0;
    right: -100vw;
    z-index: 990;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: hidden;
  }
  #content-burger > div {
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
    width: fit-content;

    &.nuxt-link-exact-active {
      cursor: pointer;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        bottom: 2px;
        left: -3.7rem;
        width: 3rem;
        background: url("~/assets/medias/spirale.svg") center / cover no-repeat;
        height: 3rem;
        transition: transform 0.2s ease-in-out;
      }
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
