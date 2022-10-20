<template>
  <main>
    <div v-if="!loaded" class="loader_wrapper">
      <div class="loader"></div>
      <p>Loading...</p>
    </div>
    <div v-if="loaded" class="wrapper">
      <nuxt-link :to="logo.name" v-for="(logo, index) in logos"
          :key="index" class="card" :style="'background-image: url('+logo.banner+');'">
      </nuxt-link>
    </div>
    <!-- <div v-if="loaded" class="wrapper">
      <nuxt-link :to="logo.name" v-for="(logo, index) in logos"
          :key="index" class="card" :style="'background-image: url('+logo.banner+');'">
      </nuxt-link>
    </div> -->
  </main>
</template>

<script>
// FIREBASE

export default {
  head: {
    titleTemplate: "Mes Logos - %s",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Voici des projets graphiques que j'ai réalisés, découvrez-en plus en visitant l'intégralité de mon portfolio !",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  data() {
    return {
      logos: [],
      loaded: false,
    };
  },
  methods: {
    getLogo() {
      this.$fire.firestore
        .collection("logos")
        .orderBy("addDate", "desc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.logos.push(doc.data());
            this.loaded = true;
          });
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
    },
  },
  beforeMount() {
    this.getLogo();
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // padding: 0 6.4rem;
  align-items: center;
  justify-content: center;
}

.wrapper {
  width: 100%;
  height: 100%;
  @include flexbox(row, flex-start, center, 2vw);
  padding-left: 0 6.4rem;
  padding-bottom: 2vw;
  z-index: 1;

  @include mobile {
    height: 80vh;
    padding-left: 10vw;
    gap: 10vw;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.card {
  transition: all .5s ease-in-out;
  height: 70vh;
  width: 15%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @include mobile {
    height: 100%;
    min-width: 75vw;
    width: 75vw;
  }

  &:hover {
    width: 30%;

    @include mobile {
      height: 100%;
      min-width: 75vw;
      width: 75vw;
    }
  }
}


</style>
