<template>
  <main>
    <div class="wrapper">
      <nuxt-link
        v-for="(projet, index) in projets"
        :key="index"
        class="wrapper__card"
        :to="projet.name"
      >
        <img :src="projet.banner" />
      </nuxt-link>
    </div>
  </main>
</template>

<script>
// FIREBASE

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
          "Voici mes projet que j'ai réalisé, découvrez-en plus en visitant l'intégralité de mon portfolio !",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  data() {
    return {
      projets: [],
    };
  },
  methods: {
    getProjet() {
      this.$fire.firestore
        .collection("projets")
        .orderBy("addDate", "desc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.projets.push(doc.data());
          });
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
    },
  },
  beforeMount() {
    this.getProjet();
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @include tablet {
    align-items: flex-start;
    padding-top: 50px;
  }

  .wrapper {
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    padding: 0 10vw;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
      padding: 0;
    }

    @include mobile {
      grid-template-columns: repeat(1, 1fr);
      padding: 0;
    }

    &__card {
      width: 100%;
      height: auto;
      transition: 0.35s all ease-out;
      position: relative;
      background-color: $main-50;

      img {
        width: 100%;
        height: 100%;
        z-index: 1;
      }

      &:hover {
        transform: translate(10px, -10px);

        &:hover:after {
          transform: translate(-10px, 10px);
          height: calc(100% + 10px);
        }
        &:hover:before {
          transform: translate(0px, 20px);
          width: calc(100% + 10px);
        }
      }

      &:before {
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid $main;
        position: absolute;
        content: "";
        bottom: 10px;
        right: 0;
        width: 100%;
        height: 0;
        z-index: -1;
        transform: translateY(10px);
        transition: 0.35s all ease-out;
      }

      &:after {
        border-left: 10px solid transparent;
        border-right: 10px solid $main;
        border-top: 10px solid transparent;
        position: absolute;
        content: "";
        bottom: 0;
        right: calc(100% - 10px);
        width: 0;
        height: 100%;
        transition: 0.35s all ease-out;
        z-index: -1;
      }
    }
  }
}
</style>
