<template>
  <main id="all-logo">
    <div class="container">
      <div class="card-logo">
        <h1>Decouvrez mes realisations graphiques</h1>
        <p>Scroll</p>
        <!-- <img src="~/assets/medias/fleche-down.png" alt="" class="go-down" /> -->
      </div>

      <div
        v-for="(logo, index) in logos"
        :key="index"
        class="card-logo"
        :style="'background-color:' + logo.background"
      >
        <img
          :src="logo.url"
          alt="logo"
          :style="'height:' + logo.size + 'px; width:' + logo.size + 'px;'"
        />
        <div class="footer" :style="'color:' + logo.text">
          <p>{{ logo.type }} - {{ logo.name }}<br />{{ logo.annee }}</p>
          <p>{{ addZero(index + 1) }}</p>
        </div>
      </div>

      <div class="card-logo" style="background: 'medias/texture-no-light'">
        <nuxt-link to="/" class="back">Retour</nuxt-link>
        <div class="footer" style="color: #dc2f02"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  head: {
    titleTemplate: "Mes Logotypes - %s",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Voici quelques éléments graphiques que j'ai réalisés, découvrez-en plus en visitant l'intégralité de mon portfolio !",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  data: () => ({
    logos: [],
  }),
  methods: {
    addZero(el) {
      if (el < 10) {
        var item = "0" + el;
      } else {
        var item = el;
      }
      return item;
    },
    animateOnScroll() {
      this.$gsap.to(".card-logo:nth-child(2)", {
        scrollTrigger: {
          trigger: ".card-logo:nth-child(2)",
        },
      });
    },
    getLogo() {
      this.$fire.firestore
        .collection("logos")
        .orderBy("annee", "desc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.logos.push(doc.data());
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
#all-logo {
  padding: 0;
  display: flex;
  position: absolute;
  flex-direction: column;
  padding: 0;
  overflow: scroll;
  top: 0;

  .logo {
    width: 60px !important;
    height: 60px !important;
  }
  .container {
    overflow-y: auto;
    height: 100vh;
    scroll-snap-type: mandatory;
    scroll-snap-points-y: repeat(100vh);
    scroll-snap-type: y mandatory;

    .card-logo {
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      scroll-snap-align: start;
      z-index: 20;

      @include tablet {
        h1 {
          text-align: center;
        }
      }

      &:first-child,
      &:last-child {
        z-index: 1;

        @include tablet {
          padding: 0 2.4rem;
        }

        @include mobile {
          padding: 0 1.8rem;
        }

        > p {
          font-size: 4rem;
          font-family: $Amperzand;
          color: $main;
          position: absolute;
          left: 20px;
          bottom: 20px;

          @include tablet {
            bottom: 80px;
          }
        }
      }

      img {
        transition: 0.5s;
        cursor: zoom-in;
      }

      .footer {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: top;
        width: 100%;
        font-family: $Readex-Light;
        font-size: 1.7rem;
        padding: 50px 3vw;
        line-height: 150%;

        @include tablet {
          padding-bottom: 10px;
          bottom: 80px;
          align-items: flex-end;
        }
      }

      &:not(:first-child) img:hover {
        transform: scale(1.5);
        transition: 0.5s;
      }
      .back {
        font-size: 5rem;
        color: $main;
        font-family: $Amperzand;
      }
    }
    h1 {
      color: $main;
      font-weight: normal;
      font-size: 5rem;
      font-family: $Amperzand;
    }
  }
  .go-down {
    width: 30px;
    height: 50px;
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
