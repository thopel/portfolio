<template>
  <main>
    <div class="row">
      <div class="description">
        <p v-html="settings.description"></p>
        <p>Mes compétences:</p>
        <div class="row wrap">
          <div class="outil" v-for="(item, index) in techno" :key="index">
            <img class="grid" :src="item.url" alt="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <img src="~/assets/medias/me.jpg" alt="Photo de Thomas" />
    </div>
    <!-- <div>
      <h1>À PROPOS</h1>
      <img class="profile-picture" src="~/assets/medias/me.jpg" alt="photo de Thomas Pelfrene" />
    </div>
    <div id="apropos">
      <p class="pres">
        Hello, je suis Thomas - Intégrateur Web<br />
        Je suis quelqu'un de très motivé à réussir dans ce domaine !
      </p>
      <p class="pres">
        Toujours très inspiré, je suis aujourd'hui dans une formation qui me
        permet de développer mon esprit créatif, par le code et le design.
      </p>
      <div class="cont">
        <div>
          <h2>outils</h2>
          <div class="row wrap">
            <div class="outil" v-for="(item, index) in techno" :key="index">
              <img class="grid" :src="item.url" alt="" />
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
        <div>
          <h2>qualités</h2>
          <div class="row wrap">
            <p class="grid">Organisé</p>
            <p class="grid">Determiné</p>
            <p class="grid">Investi</p>
            <p class="grid">Créatif</p>
            <p class="grid">Curieux</p>
            <p class="grid">Minutieux</p>
            <p class="grid">Patient</p>
          </div>
        </div>
      </div>
    </div> -->
  </main>
</template>

<script>
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
    padding: 50px 1.8rem 0 1.8rem;
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

      @include tablet {
        padding-right: 0;
      }

      > p {
        font-size: 3rem;
        font-family: $Readex-Regular;
        overflow: scroll;
        max-height: 40vh;
        margin-bottom: 80px;

        @include tablet {
          max-height: fit-content;
        }

        @include mobile {
          font-size: 2rem;
        }
      }
    }
    > img {
      height: 75vh;
      background-color: $main-50;
      @include tablet {
        height: auto;
        width: 80vw;
        margin: 40px auto;
      }
    }
  }

  .wrap {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 50px;
    width: 90%;

    @include tablet {
      width: 100%;
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
