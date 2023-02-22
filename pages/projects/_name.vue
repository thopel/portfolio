<template>
  <main>
    <nuxt-link class="back" to="projets">Back</nuxt-link>
    <div v-if="!loaded || !technosLoaded" class="loader_wrapper">
      <div class="loader"></div>
      <p>Loading...</p>
    </div>
    <div v-if="loaded && technosLoaded">
      <div class="top">
        <div class="infos">
          <h1>{{ projet.name }}</h1>
          <div class="tech">
              <span  v-for="(app, index) in projet.techno"
            :key="index">{{ techno.find((elem) => elem.id == projet.techno[index]).name }}</span>
          </div>
          <h3>{{ projet.annee }} ~ {{ projet.type }}</h3>
          <a
            :title="projet.name"
            rel="noopener noreferer nofollow"
            target="_blank"
            v-if="projet.lien != ''"
            class="link"
            :href="projet.lien"
            >have a look at it</a
          >
        </div>
      </div>

      <section class="wrapper">
        <div class="descr-wrapper">
          <h2 class="subtitle">Informations</h2>
          <p class="descr" v-html="projet.description"></p>
          <div v-if="projet.collab.length > 0" class="collab">
            <p>collaborator(s):</p>
            <a
              :title="'profil linkedIn de ' + pers.name"
              rel="noopener noreferer nofollow"
              v-for="(pers, index) in projet.collab"
              :key="index"
              target="_blank"
              :href="'https://www.linkedin.com/in/' + pers.linkedin"
              >{{ pers.name }}</a
            >
          </div>
        </div>
        <img
          v-for="(img, index) in project.images"
          :key="index"
          class="picture skeleton"
          :style="'width:' + (img.width - 0.25) + '%'"
          :src="img.url"
          :alt="'image de ' + projet.name"
        />
      </section>
    </div>
  </main>
</template>

<script>
export default {
  head: {
    titleTemplate: `A wonderful project - %s`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Here is a project I did, find out more by visiting my entire portfolio!",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  data() {
    return {
      projects: {},
      technos: [],
      loaded: false,
      technosLoaded: false,
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
    async getProjects() {
      const data = await this.$axios.$get(process.env.baseUrlAPI+'/projects?populate=*')
      this.projects = data.data;
      this.loaded = true;
      this.baseUrl = process.env.baseUrl;
    },
    async getTechnos() {
      const data = await this.$axios.$get(process.env.baseUrlAPI+'/technos?populate=Image')
      this.technos = data.data;
      this.technosLoaded = true;
      this.baseUrl = process.env.baseUrl;
    },
  },
  created() {
    this.getProjects();
    this.getTechnos();
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
  padding-top: 7vw;
  width: 100%;
  padding-bottom: 8vw;
  height: fit-content;

  @include mobile {
  padding-bottom: 35vw;
  }

  .top {
    width: 100%;
    height: 35vh;
    @include mobile {
      @include flexbox(column, flex-start, flex-start);
      height: fit-content;
    }
    
    @include flexbox(row, space-between, flex-start, 10%);

    .infos {
      width: 100%;

      h1 {
        font-size: 13rem;
        letter-spacing: 5px;
        text-transform: uppercase;
        font-family: $Eugusto;
        position: relative;

        @include mobile {
          font-size: 5.5rem;

          &:before {
            top: 0;
            right: -3rem;
            width: 2.5rem;
            background: url("~/assets/medias/spirale.svg") center / cover
              no-repeat;
            height: 2.5rem;
            transition: transform 0.2s ease-in-out;
          }
        }
      }
    }

    .tech {
      @include flexbox(row, flex-start, center, 1vw);
      font-size: 2rem;
      font-family: $Readex-Regular;
      flex-wrap: wrap;

      span {
        background-color: $main;
        color: #F0F0F0;
        padding: 4px 12px;
        border-radius: 15px;
        margin-top: 10px
      }

      @include mobile {
        @include flexbox(row, space-between, center, 0vw);
        font-size: 2rem;
        width: 100%;

        div {
          width: 25%;
          margin-top: 2vw;
          height: auto;
        }
      }
    }
  }

  h2,
  h3 {
    font-family: $Readex-Regular;
    font-weight: normal;
    text-transform: capitalize;
    font-size: 3rem;

    @include mobile {
      font-size: 2.5rem;
    }
  }

  h3 {
    margin: 1vw 0;

    @include mobile {
      margin: 5vw 0;
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
      font-size: 2rem;
      margin-top: 5vw;
    }

    p {
      line-height: 4rem;
    }

    a {
      margin-left: 10px;
      color: var(--color1);
      position: relative;
      line-height: 4rem;

      &:hover:after {
        transform: rotate(360deg);
      }

      &:not(:first-of-type) {
        margin-left: 28px;
      }

      &:after {
        position: absolute;
        content: "";
        left: 100%;
        top: 0rem;
        height: 1.8rem;
        width: 1.8rem;
        background: url("~/assets/medias/linkedin.svg") center/cover no-repeat;
        transition: transform 0.7s ease-in-out;
      }
    }
  }

  .subtitle {
    font-family: $Eugusto;
    font-size: 4rem;
  }

  .descr-wrapper {
    width: 49%;
    padding-right: 2vw;

    @include mobile {
      width: 100%;
      margin-bottom: 10vw;
    }
  }

  .descr {
    font-size: 2rem;
    margin-top: 1vw;
    font-family: $Readex-Regular;
    margin-bottom: 2vw;

    @include tablet {
      width: 100%;
      text-align: justify;
    }

    @include mobile {
      font-size: 2rem;
      margin-top: 5vw;
    }
  }

  .link {
    font-size: 2.5rem;
    font-family: $Eugusto;
    text-decoration: none;
    color: inherit;
    width: fit-content;
    position: relative;
    cursor: pointer;

    @include mobile {
      font-size: 2rem;
      margin-top: 7vw;
    }

    &:after {
      position: absolute;
      content: "";
      right: -1.7rem;
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
  .back {
    position: fixed;
    bottom: -5vw;
    right: 50%;
    background: url("~/assets/medias/ball.svg") bottom/cover no-repeat;
    transform: translateX(51.5%);
    width: 10vw;
    height: 10vw;
    padding-bottom: 3vw;
    @include flexbox(row, center, center);
    color: #F0F0F0;
    z-index: 9;
    font-family: $Eugusto;
    font-size: $fs-d-h3;
    transition: all 0.3s ease-in-out;

    &:hover {
      height: 11vw;
      width: 11vw;

      @include mobile {
        height: 53vw;
        width: 53vw;
        padding-bottom: 8vw;
        bottom: -27vw;
      }
    }

    @include mobile {
      height: 80px;
      width: 80px;
      transform: translateX(0);
      right: 18px;
      bottom: 20px;
      padding-bottom: 0;
    }
  }

  .wrapper {
    @include flexbox(row, space-between, flex-start, 0.5%);
    flex-wrap: wrap;
    

    @include mobile {
      gap: 11vw;
    }

    img:first-of-type {
      // height: auto;
      // width: 20vw;
      object-fit: cover;
      object-position: right center;
      margin-bottom: 40px;

      @include mobile {
        margin-bottom: 0;
        height: auto;
        width: inherit;
        object-fit: auto;
        object-position: none;
      }
    }

    @include mobile {
      margin-top: 10vw;
    }

    .picture {
      height: auto;
      display: flex;
      margin-bottom: 0.5%;
      border-radius: 20px;
      margin-bottom: 40px;

      @include mobile {
        width: 100% !important;
        margin-bottom: 0;
      }
    }
  }
}
</style>
