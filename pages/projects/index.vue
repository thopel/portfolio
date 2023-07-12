
<template>
    <main>
      <div v-if="!loaded" class="loader_wrapper">
        <div class="loader"></div>
        <p>Loading...</p>
      </div>
      <div v-if="loaded">
        <div
          class="wrapper"
          v-for="(section, indexSection) in chunkArray(projets, 6)"
          :key="indexSection"
        >
          <nuxt-link
          v-for="(projet, index) in section"
            :to="'projects/'+projet.name"
            :key="index"
            class="card"
            :style="
              index > 5
                ? 'display: none;'
                : 'background-image: url(' + projet.banner + ');'
            "
          >
          <h2>{{String(projet.addDate.toDate().getFullYear()).slice(-2)}}</h2>
          </nuxt-link>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  // FIREBASE
  
  export default {
    head: {
      titleTemplate: "Projects - %s",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Here are the projects I've done, discover more by visiting my entire portfolio!",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    data() {
      return {
        projets: [],
        loaded: false,
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
            this.loaded = true;
          })
          .catch((error) => {
            console.error("Error getting documents: ", error);
          });
      },
      chunkArray(myArray, chunk_size) {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];
  
        for (index = 0; index < arrayLength; index += chunk_size) {
          var myChunk = myArray.slice(index, index + chunk_size);
          // Do something if you want with the group
          tempArray.push(myChunk);
        }
        return tempArray;
      },
    },
    created() {
      this.getProjet();
    },
  };
  </script>
  
  <style lang="scss" scoped>
  
  
  .loader_wrapper {
    transform: translateY(-30vh);
  }
  
  body {
    overflow-y: scroll;
  }
  
  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 6.4rem;
    padding-top: 7vw;
    align-items: center;
    justify-content: center;
    & > div {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    @include mobile {
      padding: 0 3.9rem;
      padding-top: 12vh;
    }
  }
  
  .wrapper {
    width: 100%;
    height: 100%;
    @include flexbox(row, flex-start, center, 2vw);
    padding-bottom: 2vw;
    z-index: 1;
    position: relative;
  
    &:before {
      content: "";
      position: absolute;
      width: calc(100% + 2*6.4rem);
      height: 100%;
      left: -6.4rem;
  
      @include mobile {      display: none;
      }
    }
    &:nth-of-type(odd):before {
      background: url('~/assets/medias/line-4.svg') center/100% 100% no-repeat;
    }
    &:nth-of-type(even):before {
      background: url('~/assets/medias/line-5.svg') center/100% 100% no-repeat;
    }
    @include mobile {
      height: fit-content;
      gap: 10vw;
      flex-direction: column;
      padding-bottom: 11vw;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  .card {
    transition: all 0.5s ease-in-out;
    height: 38vw;
    width: 15%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
  
    h2 {
      font-family: $Eugusto;
      font-size: 120px;
      transform: translateY(45px);
      padding-top: 40px;
      color: $main;
      width: 100%;
      text-align: center ;
      background: $secondary;
      background: -moz-linear-gradient(180deg, rgba(240,240,240,0) 0%, $secondary 100%);
      background: -webkit-linear-gradient(180deg, rgba(240,240,240,0) 0%, $secondary 100%);
      background: linear-gradient(180deg, rgba(240,240,240,0) 0%, $secondary 100%);
    }
  
    @include mobile {
      height: 100%;
      width: 100%;
      height: 85vw;
    }
  
    &:hover {
      width: 25vw;
  
      @include mobile {
        height: 100%;
        width: 100%;
        height: 85vw;
      }
    }
  }
  
  </style>
  