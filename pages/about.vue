<template>
  <main>
    <img class="line" src="~/assets/medias/line-6.svg" alt="" />
    <div class="row">
      <div class="description">
        <h2 class="subtitle">About me</h2>
        <p v-html="settings.description"></p>
        <h3 class="subtitle">Skills</h3>
        <ul class="row wrap">
          <li class="outil" v-for="(item, index) in techno" :key="index">
            <img class="grid" :src="item.url" :alt="'logo ' + item.name" />
          </li>
        </ul>
      </div>
      <div class="img">
        <img src="~/assets/medias/me.webp" alt="Photo de Thomas" />
      </div>
    </div>
  </main>
</template>

<script>
// const sound = require("~/assets/medias/make-some-noise.mp3").default;
export default {
  head: {
    titleTemplate: "About - %s",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Find out who I am, what technologies I master. Learn more about my skills by visiting my entire portfolio!",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  data() {
    return {
      techno: [],
      settings: {},
      // sound,
    };
  },
  methods: {
    getProjet() {
      this.$fire.firestore
        .collection("technologies")
        .orderBy("order", "asc")
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
  },
  beforeMount() {
    this.getProjet();
    this.getSettings();
  },
};
</script>

<style lang="scss" scoped>
main {
  padding: 22vh 6.4rem 0 6.4rem;
  width: 100%;
  height: fit-content;

  @include tablet {
    padding: 50px 2.4rem 0 2.4rem;
    height: fit-content;
  }
  @include mobile {
    padding: 12vh 1.8rem 0 1.8rem;
  }

  h3 {
    margin-top: 1.5vw;

    @include mobile {
      margin-top: 12vw;
    }
  }

  .line {
    position: absolute;
    top: 200px;
    right: 0;
    width: 100vw;

    @include mobile {
      top: calc(103px + 45.3vh);
      left: 0;
      width: 300vw;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    @include tablet {
      flex-direction: column-reverse;
    }

    .description {
      width: 100%;
      color: $main;
      padding-right: 40px;
      z-index: 5;
      @include flexbox(column, flex-start, flex-start, 2vw);

      @include tablet {
        padding-right: 0;

        h2 {
          margin-bottom: 7vw;
        }
      }

      > p {
        font-size: 2rem;
        font-family: $Readex-Regular;
        overflow: scroll;
        max-width: 60%;

        @include tablet {
          max-width: 100%;
        }
      }

      .subtitle {
        font-family: $Eugusto;
        font-size: 6rem;
        font-weight: 500;
        margin-top: 1.5vw;

        @include tablet {
          margin-top: 5vw;
        }

        @include tablet {
          max-height: fit-content;
          @include flexbox(column, flex-start, flex-start, 5vw);
        }

        @include mobile {
          font-size: 5rem;
        }
      }
    }
    .img {
      height: 70vh;
      position: relative;

      img {
        width: auto;
        height: 100%;
        position: relative;
        opacity: 1;
        z-index: 2;
        transition: 1.7s all ease-in-out;
        border-radius: 20px;

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

      // &:before {
      //   content: "";
      //   position: absolute;
      //   bottom: -4vw;
      //   right: -4vw;
      //   width: 8vw;
      //   z-index: 3;
      //   background: url("~/assets/medias/spirale.svg") center / cover no-repeat;
      //   height: 8vw;
      //   animation: turn 20s linear infinite;
      // }

      @include tablet {
        width: 100%;
        height: fit-content;

        // &:before {
        //   bottom: -12vw;
        //   right: -12vw;
        //   width: 24vw;
        //   height: 24vw;
        // }
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
    margin-top: 1vw;

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
      width: 7vw;
      margin: 5px 0;
      @include mobile {
        width: 28vw;
      }
    }
  }
}
</style>
