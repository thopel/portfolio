<template>
  <header>
    <div @click="menuAppear" v-if="this.$route.name == 'about' || this.$route.name == 'index' || this.$route.name == 'projects'" :class="'menu-desktop ' + this.$route.name">
      <nuxt-link to="/">home</nuxt-link>
      <nuxt-link to="/projects">projects</nuxt-link>
      <nuxt-link to="/about">about</nuxt-link>
    </div>

    <div id="content-burger">
      <div @click="menuAppear">
        <div class="close">
          <span></span>
          <span></span>
        </div>
        <nuxt-link to="/">home</nuxt-link>
        <nuxt-link to="/projects">projects</nuxt-link>
        <nuxt-link to="/about">about</nuxt-link>
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
  width: 100vw;
  align-items: center;
  justify-content: center;
  z-index: 999;
  .menu-desktop {
    display: flex;
    position: fixed;
    top: 20px;
    align-items: center;
    justify-content: space-between;
    width: 40vw;
    background-color: $main;
    padding: 10px;
    border-radius: 30px;
    @include tablet {
      width: 160px;
    }

    &.index:before {
      left: 10px;
      transform: none;
    }

    &.about:before {
      left: 100%;
      transform: translateX(calc(-100% - 10px));
    }

    & a {
      font-family: $Readex-Bold;
      text-transform: uppercase;
      font-size: 2.5rem;
      color: $secondary;
      mix-blend-mode: difference;
      z-index: 3;
      width: 140px;
      text-align: center;

      @include tablet {
        display: none;
        &.nuxt-link-exact-active {
          display: block;
        }
      }
    }

    &:before {
      position: absolute;
      content: "";
      width: 140px;
      height: calc(100% - 20px);
      background-color: $secondary;
      left: 50%;
      transform: translateX(-50%);
      top: 10px;
      border-radius: 60px;
      z-index: 2;
      transition: 0.7s all ease-in-out;
      @include tablet {
        transition: none;
    }
    }
  }

  #content-burger {
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(8px);
    background: $secondary-50;
    position: fixed;
    display: none;
    top: 0;
    right: -100vw;
    z-index: 990;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: hidden;

    & .close {
      background-color: $secondary;
      border: 10px solid $main;
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      height: 50px;
      width: 50px;
      border-radius: 40px;

      & span {
        width: 20px;
        border-radius: 20px;
        height: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: $main;

        &:first-child {
          transform: translate(-50%, -50%) rotate(45deg);
        }
        &:last-child {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
  }
  #content-burger > div {
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 40px;

    &:first-child {
      padding-top: 120px;
    }
  }
  #content-burger a {
    text-decoration: none;
    color: $main-50;
    text-transform: uppercase;
    font-size: 5rem;
    font-family: $Readex-SemiBold;
    text-align: center;
    width: 100%;

    &.nuxt-link-exact-active {
      cursor: pointer;
      position: relative;
      color: $main;
    }
  }
  @include mobile {
    #menu-burger,
    #content-burger {
      display: flex !important;
    }
  }
}
</style>
