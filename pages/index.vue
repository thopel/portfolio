<template>
  <main :mobileHeight="mobileHeight">
    <div class="mask">
      <h1
        v-gsap.to="{
          delay: 0.4,
          yPercent: -100,
        }"
      >
        Thomas Pelfrene
      </h1>
    </div>
    <div class="mask">
      <h2
        v-gsap.to="{
          delay: 1.2,
          yPercent: -100,
        }"
      >
        <p>{{ settings.title }}</p>
        <span>//</span>
        <a :href="settings.companyLink">{{ settings.companyName }}</a>
        <span>~</span>
        <a :href="settings.schoolLink">{{ settings.schoolName }}</a>
      </h2>
    </div>
  </main>
</template>

<script>
export default {
  head: {
    title: "Portfolio Thomas Pelfrene",
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
          "Bonjour! Venez découvrir mes projets et réalisations graphiques sur mon portfolio :)",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  data() {
    return {
      settings: {},
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
          });
          this.loadedData = true;
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

  @include mobile {
    justify-content: flex-start;
    padding-top: 30vh;
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
  h2 {
    transform: translateY(100%);
    @include flexbox(row, space-between, center, 5px);
    @include font(2rem, $Readex-Light, uppercase, 1, 0.3rem);

    @include tablet {
      font-size: 1.5rem;
    }

    @include mobile {
      font-size: 2rem;
      @include flexbox(column, space-between, center, 4vh);
      margin-top: 6vh;

      & > span{
        display: none;
      }

    }
  }
}
</style>
