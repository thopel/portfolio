<template>
  <main @click="addSticker($event)" id="zone" :mobileHeight="mobileHeight">
    <img class="lines" src="~/assets/medias/lines.svg" alt="" />
    <div v-if="settingsLoaded" class="wrapper">
      <div
        class="sticker-name"
        v-gsap.to="{
          delay: 3,
          display: 'block',
          transform: 'rotate(-30deg) scale(1)',
        }"
      ></div>
      <div class="mask">
        <h1
          v-gsap.to="{
            delay: 0.4,
            yPercent: -100,
          }"
        >
          {{ settings.title }}
        </h1>
      </div>
      <div class="mask">
        <div
          class="postes"
          v-gsap.to="{
            delay: 1.2,
            yPercent: -100,
          }"
        >
          <div>
            <a
              title="site de l'école que je fréquente"
              rel="noopener noreferer nofollow"
              :href="settings.schoolLink"
              >{{ settings.schoolName }}</a
            >
            <span>~</span>
            <a
              title="site de l'entreprise où je travaille"
              rel="noopener noreferer nofollow"
              :href="settings.companyLink"
              >{{ settings.companyName }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  head: {
    title: "Thomas Pelfrene's Portfolio",
    htmlAttrs: {
      lang: "fr",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Hello ! I'm a web developer, come and discover my web projects and my graphic creations on my portfolio :)",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  data() {
    return {
      settings: {},
      settingsLoaded: false,
      indexSticker: 0,
      stickers: [],
    };
  },
  methods: {
    getSettings() {
      this.$fire.firestore
        .collection("settings")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.settings = doc.data();
            this.stickers = doc.data().stickers;
          });
          this.settingsLoaded = true;
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
    },
    mobileHeight() {
      let vh = window.innerHeight * 0.01;

      document.documentElement.style.setProperty("--vh", `${vh}px`);

      window.addEventListener("resize", () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
    },
    generateRandom(min, max) {
      // find diff
      let difference = max - min;

      // generate random number
      let rand = Math.random();

      // multiply with difference
      rand = Math.floor(rand * difference);

      // add with min value
      rand = rand + min;

      return rand;
    },
    addSticker(e) {
      var deg = this.generateRandom(-50, 50);
      var x = e.clientX;
      var y = e.clientY;
      var el = document.createElement("img");
      el.src = this.stickers[this.indexSticker];
      el.classList.add("sticker");
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.transform = "translate(-50%, -50%) rotate(" + deg + "deg)";
      document.getElementById("zone").appendChild(el);
      if (this.indexSticker == this.stickers.length - 1) {
        this.indexSticker = 0;
      } else {
        this.indexSticker++;
      }
    },
  },
  mounted() {
    this.mobileHeight();
  },
  beforeMount() {
    this.getSettings();
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: $main;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @include mobile {
    justify-content: flex-start;
    padding-top: 40vh;
  }

  .lines {
    position: absolute;
    bottom: -7vh;
    right: 0;
    width: 100vw;

    @include mobile {
      width: 300vw;
    }
  }

  .wrapper {
    position: relative;
    transform: translateY(-7vw);
    @include mobile {
      transform: translateY(0vw);
    }

    .sticker-name {
      position: absolute;
      background: url("~/assets/medias/sticker-1.svg") center/cover no-repeat;
      height: 7vw;
      width: 7vw;
      left: -5vw;
      top: -3.5vw;
      transform: rotate(45deg) scale(1.3);
      z-index: 8;
      display: none;

      @include mobile {
        top: -50vw;
        left: calc(50% - 18vw);
        height: 36vw;
        width: 36vw;
      }
    }
  }

  .mask {
    overflow: hidden;
  }

  h1 {
    font-size: 13rem;
    font-family: $Eugusto;
    letter-spacing: 0.3rem;
    font-weight: lighter;
    position: relative;
    white-space: nowrap;
    transform: translateY(100%);

    @include tablet {
      font-size: 7rem;
    }

    @include mobile {
      font-size: 4rem;
    }
  }
}
.postes {
  transform: translateY(101%);
  @include flexbox(column, space-between, center, 20px);

  @include tablet {
    font-size: 1.5rem;
  }

  @include mobile {
    font-size: 2rem;
    @include flexbox(column, space-between, center, 4vh);
    margin-top: 6vh;
    span {
      display: none;
    }
  }

  > div {
    @include flexbox(row, space-between, center, 12px);
    margin-top: 3vh;

    @include mobile {
      @include flexbox(column, space-between, center, 3vh);
    }

    span {
      @include font(2.2rem, $Readex-Regular, uppercase, 1, 0.3rem);
    }

    a {
      @include font(2.2rem, $Readex-Regular, uppercase, 1, 0.3rem);
      position: relative;
      padding-right: 1.5rem;

      &:after {
        position: absolute;
        content: "";
        right: 0;
        top: 0px;
        height: 1.3rem;
        width: 1.3rem;
        background: url("~/assets/medias/link-arrow.svg") center/cover no-repeat;
        transition: 0.2s ease-out;
      }
      &:hover {
        &:after {
          transform: translate(4px, -4px);
        }
      }
    }
  }
}
</style>
