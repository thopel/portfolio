<template>
  <main>
    <div class="row">
      <div class="description">
        <p class="subtitle">Qui suis-je ?</p>
        <p v-html="settings.description"></p>
        <p class="subtitle">Mes competences</p>
        <div class="row wrap">
          <div class="outil" v-for="(item, index) in techno" :key="index">
            <img class="grid" :src="item.url" alt="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div class="img">
        <img
          @click="playSound($event)"
          src="~/assets/medias/me.webp"
          alt="Photo de Thomas"
        />
        <p>Make some noise</p>
      </div>
    </div>
  </main>
</template>

<script>
const sound = require("~/assets/medias/make-some-noise.mp3").default;
export default {
  head: {
    titleTemplate: "À Propos - %s",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Découvrez qui je suis, quelle technologies je maîtrise. Apprenez-en plus sur mes compétences en visitant l'intégralité de mon portfolio !",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  data() {
    return {
      techno: [],
      settings: {},
      sound,
    };
  },
  methods: {
    getProjet() {
      this.$fire.firestore
        .collection("technologies")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.techno.push(doc.data());
          });
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
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
    },
    playSound(element) {
      if (element.target.style.opacity < 0.5) {
        var audio = new Audio(this.sound);
        audio.play();
      }
    },
  },
  beforeMount() {
    this.getProjet();
    this.getSettings();
  },
};
</script>

<style lang="scss" scoped>
main {
  padding: 50px 6.4rem 0 6.4rem;
  width: 100%;
  height: fit-content;

  @include tablet {
    padding: 50px 2.4rem 0 2.4rem;
    height: fit-content;
  }
  @include mobile {
    padding: 0 1.8rem 0 1.8rem;
  }

  .row {
    display: flex;
    @include tablet {
      flex-direction: column-reverse;
    }

    .description {
      width: 100%;
      color: $main;
      padding-right: 40px;
      @include flexbox(column, flex-start, flex-start, 2vw);

      @include tablet {
        padding-right: 0;
      }

      > p {
        font-size: 3rem;
        font-family: $Readex-Regular;
        overflow: scroll;
        max-height: 40vh;

        &.subtitle {
          font-family: $Eugusto;
          font-size: 4rem;
          margin-top: 1vw;

          @include tablet {
            margin-top: 5vw;
          }
        }

        @include tablet {
          max-height: fit-content;
          @include flexbox(column, flex-start, flex-start, 5vw);
        }

        @include mobile {
          font-size: 2rem;
        }
      }
    }
    .img {
      height: 70vh;
      position: relative;

      &:hover img {
        opacity: 0.2;
      }

      p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        color: $dark-purple;
        width: 100%;
        text-align: center;
        @include font(4rem, $Eugusto, null, 1);
      }

      img {
        width: auto;
        height: 100%;
        position: relative;
        opacity: 1;
        z-index: 2;
        transition: 1.7s all ease-in-out;
        border-radius: 10px;

        @include tablet {
          object-fit: cover;
          object-position: left 15%;
          width: 100%;
          height: 40vh;
        }

        @include mobile {
          object-fit: cover;
          object-position: left 20%;
        }
      }

      &:before {
        content: "";
        position: absolute;
        bottom: -4vw;
        right: -4vw;
        width: 8vw;
        z-index: 3;
        background: url("~/assets/medias/spirale.svg") center / cover no-repeat;
        height: 8vw;
        animation: turn 20s linear infinite;
      }

      @include tablet {
        width: 100%;
        height: fit-content;

        &:before {
          bottom: -12vw;
          right: -12vw;
          width: 24vw;
          height: 24vw;
        }
      }

      @include mobile {
        width: 100%;
        margin: 40px auto;
        height: fit-content;
        margin-top: 0;
      }
    }
  }

  .wrap {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 50px;
    width: 90%;
    margin-top: 3vw;

    @include tablet {
      width: 100%;
      margin-top: 10vw;
      grid-template-columns: repeat(4, 1fr);
    }
    @include mobile {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .outil {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100px;

    img.grid {
      width: 80px;
      margin: 5px 0;
    }

    p {
      font-size: 2.5rem;
      font-family: $Readex-Light;
    }
  }
}
</style>
