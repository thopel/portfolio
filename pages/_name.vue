<template>
  <main v-if="Loaded && technoLoaded">
    <h1>{{ projet.name }}</h1>
    <div class="row">
      <div class="column">
        <div class="nom">
          <!-- <p>{{projet.annee.substring(0, 2)}}<br/>{{projet.annee.substring(2, 4)}}</p> -->
        </div>
        <h2>{{ projet.annee }} - {{ projet.type }}</h2>
        <p class="descr">
          {{ projet.description }}
        </p>
        <a v-if="projet.lien != ''" class="link" :href="projet.lien"
          >› visiter le site</a
        >
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
      </div>
      <div class="slider">
        <div class="dots">
          <a
            id="fleche"
            @mousedown="addMove"
            @click="
              indexSlider == projet.images.length - 1
                ? (indexSlider = 0)
                : indexSlider++
            "
            :href="'#img-' + indexSlider"
            :key="index"
            >→</a
          >
        </div>
        <div class="slides">
          <div>
            <img :src="projet.images[indexSlider]" alt="slide" />
          </div>
        </div>
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
      Loaded: false,
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
            this.Loaded = true;
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
  padding-top: 50px;
  width: 100%;
  height: fit-content;

  @include tablet {
    height: 100%;
  }

  .row {
    display: flex;
    justify-content: space-between;

    @include tablet {
      flex-direction: column-reverse;
    }
  }

  h1 {
    font-size: 6rem;
    letter-spacing: 5px;
    text-transform: uppercase;
    font-family: $Readex-Medium;

    @include tablet {
      font-size: 3rem;
    }
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .nom {
    margin-bottom: 40px;

    p {
      font-size: 2rem;
      margin-right: 20px;
      font-family: $Readex-Regular;
    }
  }

  h2 {
    margin: 15px 0;
    font-family: $Amperzand;
    font-weight: normal;
    text-transform: capitalize;
    font-size: 4rem;
  }

  .link {
    font-size: 1.5rem;
    font-family: $Readex-Regular;
    text-decoration: none;
    color: inherit;
    margin-top: 20px;
    margin-left: 20px;
    width: fit-content;
  }

  .descr {
    max-width: 30vw;
    font-size: 1.5rem;
    font-family: $Readex-Regular;

    @include tablet {
      max-width: 100%;
    }

    p {
      @include tablet {
        width: 100%;
      }
    }
  }

  .tech {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    margin-top: 50px;
    font-size: 1.5rem;
    font-family: $Readex-Regular;

    @include mobile {
      grid-template-columns: repeat(4, 1fr);
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
      height: 50px;
      margin-bottom: 5px;
    }
    p {
      width: 100%;
      text-align: center;
    }
  }

  .collab {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 30vw;
    font-size: 1.5rem;
    font-family: $Readex-Regular;

    @include tablet {
      width: 100%;
    }

    a {
      margin-left: 10px;
      color: var(--color1);
    }
  }
}

.slider {
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 62vw;
  text-align: center;
  overflow: hidden;
  position: relative;
  z-index: 1;

  @include tablet {
    max-width: 100%;
  }

  @include mobile {
    justify-content: center;
    flex-direction: column-reverse;
    margin-top: 20px;
    width: 100%;
  }
}

.slides > div {
  width: 100%;
  height: auto;
  transform-origin: center center;
  transform: scale(1);
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @include mobile {
    justify-content: center;
  }

  img {
    width: auto;
    height: 50vh;

    @include tablet {
      height: 53vw;
    }
  }
}

.slider .dots {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  padding-top: 5px;

  @include mobile {
    padding-right: 0;
  }
}

.slider .dots a {
  display: inline-flex;
  width: fit-content;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  margin: 0 5px;
  font-size: 7rem;
  position: relative;
  color: inherit;
  font-family: $Readex-Regular;

  &:hover {
    font-family: $Readex-Medium;
  }

  &.move {
    animation: move 1s ease-in-out;

    @keyframes move {
      0% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(10px);
      }
      50% {
        transform: translateX(-5px);
      }
      75% {
        transform: translateX(3px);
      }
      100% {
        transform: translateX(0);
      }
    }
  }
}
</style>
