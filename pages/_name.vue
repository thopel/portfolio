<template>
  <main>
    <div v-if="!loaded || !technoLoaded" class="loader_wrapper">
      <div class="loader"></div>
      <p>Chargement</p>
    </div>
    <div v-if="loaded && technoLoaded">
      <div class="top">
        <h1>{{ projet.name }}</h1>
      </div>
      <h3>{{ projet.annee }} ~ {{ projet.type }}</h3>
      <div v-if="projet.collab.length > 0" class="collab">
        <p>Collaborateur.trice(s):</p>
        <a
          v-for="(pers, index) in projet.collab"
          :key="index"
          target="_blank"
          :href="'https://www.linkedin.com/in/' + pers.linkedin"
          >{{ pers.name }}</a
        >
      </div>
      <div class="tech">
        <div
          class="logo-app"
          v-for="(app, index) in projet.techno"
          :key="index"
        >
          <img
            :src="techno.find((elem) => elem.id == projet.techno[index]).url"
          />
          <p>
            {{ techno.find((elem) => elem.id == projet.techno[index]).name }}
          </p>
        </div>
      </div>
      <p class="descr" v-html="projet.description"></p>
      <a v-if="projet.lien != ''" class="link" :href="projet.lien"
        >› se rendre sur le projet</a
      >

      <div class="wrapper">
        <img
          v-for="(img, index) in projet.images"
          :key="index"
          class="picture"
          :style="'width:' + (img.width - 0.25) + '%'"
          :src="img.url"
        />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  head: {
    titleTemplate: "Mes Projets - %s",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Voici un projet que j'ai réalisé, découvrez-en plus en visitant l'intégralité de mon portfolio !",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  data() {
    return {
      projet: {},
      techno: [],
      loaded: false,
      technoLoaded: false,
      indexSlider: 0,
    };
  },
  methods: {
    addMove() {
      const fleche = document.getElementById("fleche").classList;
      fleche.add("move");
      setTimeout(() => {
        fleche.remove("move");
      }, 1000);
    },
    getProjet() {
      // console.log(this.$route.params.name)
      this.$fire.firestore
        .collection("projets")
        .where("name", "==", this.$route.params.name)
        .limit(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.projet = doc.data();
            this.loaded = true;
          });
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
    },
    getTechno() {
      this.$fire.firestore
        .collection("technologies")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.techno.push({
              id: doc.id,
              name: doc.data().name,
              url: doc.data().url,
            });
          });
          // console.log(this.techno)
          this.technoLoaded = true;
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
    },
  },
  created() {
    this.getProjet();
    this.getTechno();
  },
};
</script>

<style lang="scss" scoped>
main {
  color: $main;
  letter-spacing: 1px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 3.472vw;
  width: 100%;
  height: fit-content;

  a {
    &:after {
      content: "";
      height: 2px;
      background-color: $main;
      width: 0;
      position: absolute;
      bottom: -2px;
      left: 0;
      transition: 0.3s ease-in-out;
    }
    &:hover:after {
      width: 100%;
    }
  }

  h1 {
    font-size: 6rem;
    letter-spacing: 5px;
    text-transform: uppercase;
    font-family: $Eugusto;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: -8rem;
      width: 6rem;
      background: url("~/assets/medias/spirale.svg") center / cover no-repeat;
      height: 6rem;
      transition: transform 0.2s ease-in-out;
    }

    @include mobile {
      font-size: 2.5rem;
    }
  }

  h2,
  h3 {
    font-family: $Readex-Regular;
    font-weight: normal;
    text-transform: capitalize;
    font-size: 4rem;

    @include mobile {
      font-size: 2.5rem;
    }
  }

  h3 {
    margin-top: 2vw;
  }

  .top {
    width: 100%;
    @include flexbox(row, space-between, flex-end);

    @include mobile {
      @include flexbox(column, flex-start, flex-start);
    }
  }

  .collab {
    margin-top: 3vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 2.5rem;
    font-family: $Readex-Regular;

    @include mobile {
      font-size: 1.5rem;
    }

    a {
      margin-left: 10px;
      color: var(--color1);
    }
  }

  .descr {
    font-size: 3rem;
    font-family: $Readex-Regular;
    width: 85%;
    margin-top: 3vw;
    margin-bottom: 1vw;

    @include tablet {
      width: 100%;
      text-align: justify;
    }

    @include mobile {
      font-size: 2rem;
      margin-top: 10vw;
    }
  }

  .link {
    font-size: 2.6rem;
    font-family: $Readex-Regular;
    text-decoration: none;
    color: inherit;
    margin-left: 2vw;
    margin-bottom: 3vw;
    width: fit-content;

    @include mobile {
      font-size: 2rem;
      margin-top: 7vw;
    }
  }

  .tech {
    @include flexbox(row, flex-start, center, 3vw);
    margin-top: 50px;
    font-size: 2rem;
    font-family: $Readex-Regular;
    flex-wrap: wrap;

    @include mobile {
      font-size: 1.5rem;
      gap: 6vw;
    }
  }

  .logo-app {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: flex-end;
    align-items: center;
    img {
      width: auto;
      height: 70px;
      margin-bottom: 5px;

      @include mobile {
        height: 40px;
      }
    }
    p {
      width: 100%;
      text-align: center;
    }
  }

  .wrapper {
    @include flexbox(row, flex-start, flex-start, 0.5%);
    flex-wrap: wrap;
    margin-top: 3vw;

    @include mobile {
      margin-top: 10vw;
    }

    .picture {
      height: auto;
      margin-bottom: 0.5%;

      @include mobile {
        width: 100% !important;
      }
    }
  }
}
</style>
