<template>
  <main :mobileHeight="mobileHeight">
    <div v-if="Loaded && loadedData" class="animated-title">
      <div class="text-top">
        <div>
          <h1>
            {{ settings.title
            }}<sup>{{ settings.annee }}<sup>ème</sup>année</sup>
          </h1>
          <h2>
            <a :href="settings.companyLink">{{ settings.companyName }}</a> ~
            <a :href="settings.schoolLink">{{ settings.schoolName }}</a>
          </h2>
        </div>
      </div>
      <div class="text-bottom">
        <div>
          <nuxt-link :to="'/' + projet.name"
            ><p>Dernier Projet:</p>
            <p>
              {{ projet.name }}<sub>{{ projet.type }}</sub>
            </p>
          </nuxt-link>
        </div>
      </div>
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
          "Bonjour! Venez découvrir mes réalisations dans le domaine du code et de réalisation graphique sur mon portfolio ! Contactez-moi si vous souhaitez discuter :)",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  data() {
    return {
      projet: {},
      settings: {},
      Loaded: false,
      loadedData: false,
    };
  },
  methods: {
    getProjet() {
      this.$fire.firestore
        .collection("projets")
        .orderBy("addDate", "desc")
        .limit(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.projet = doc.data();
          });
          this.Loaded = true;
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
    },
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
    this.getProjet();
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
  text-transform: uppercase;
  width: 100vw;
  height: 100vh;

  h1 {
    font-size: 7rem;
    font-family: $Readex-Bold;
    position: relative;
    white-space: nowrap;

    @include tablet {
      font-size: 5rem;
    }

    @include mobile {
      font-size: 3rem;
    }

    > sup {
      position: absolute;
      width: fit-content;
      font-size: 3rem;
      margin-left: 5px;
      font-family: $Readex-Light;

      @include tablet {
        font-size: 2rem;
      }

      @include mobile {
        font-size: 1rem;
        font-family: $Readex-SemiBold;
      }

      sup {
        text-transform: lowercase;
      }
    }
  }
  h2 {
    font-size: 3rem;
    font-family: $Readex-Light;

    @include tablet {
      font-size: 3rem;
    }

    @include mobile {
      font-size: 2rem;
    }
  }
  @keyframes showTopText {
    0% {
      transform: translate3d(0, 100%, 0);
    }
    40%,
    60% {
      transform: translate3d(0, 35%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes showBottomText {
    0% {
      transform: translate3d(0, -100%, 0);
    }
    40%,
    60% {
      transform: translate3d(0, -55%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @include tablet {
    @keyframes showTopText {
      0% {
        transform: translate3d(0, 100%, 0);
      }
      40%,
      60% {
        transform: translate3d(0, 40%, 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }

    @keyframes showBottomText {
      0% {
        transform: translate3d(0, -100%, 0);
      }
      40%,
      60% {
        transform: translate3d(0, -50%, 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }
  }

  .animated-title {
    color: $main;
    height: 90vmin;
    max-width: 900px;
    position: relative;    width: 100%;

    > div {
      height: 50%;
      overflow: hidden;
      position: absolute;
      width: 100%;

      div {
        padding: 2vmin 0;
        position: absolute;

        span {
          display: block;
          font-size: 5rem;
        }
      }

      &.text-top {
        border-bottom: 0.7vmin solid $main;
        top: 0;

        div {
          animation: showTopText 2s;
          animation-delay: 0.5s;
          animation-fill-mode: forwards;
          bottom: 0;
          transform: translate(0, 100%);

          span:first-child {
            color: $main;
            font-family: $Readex-Bold;
            font-size: 10rem;
          }
        }
      }

      &.text-bottom {
        bottom: 0;

        div {
          animation: showBottomText 2s;
          animation-delay: 2.75s;
          padding-top: 5px;
          animation-fill-mode: forwards;
          top: 0;
          font-family: $Readex-Regular;
          transform: translate(0, -100%);

          a {
            p:first-child {
              font-family: $Readex-Medium;
              font-size: 6rem;
              white-space: nowrap;

              @include tablet {
                font-size: 4rem;
              }

              @include mobile {
                font-size: 3rem;
              }
            }

            p:last-child {
              font-size: 3rem;
              font-family: $Readex-Regular;
              @include mobile {
                font-size: 2rem;
              }
            }

            sub {
              margin-left: 5px;
              font-size: 2rem;
              font-family: $Readex-Light;

              @include mobile {
                font-size: 1.3rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
