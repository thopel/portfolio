<template>
  <footer>
    <p @click="copyMail">
      tpelfrene@gmail.com<sup id="copied">copié</sup>
    </p>
    <div v-if="$route.name == 'pas-affiché'"> // pas affiché pour le moment
      <p>Performances:</p>
      <div>
        <a
          v-for="(item, index) in settings.performances"
          :key="index"
          :href="item.link"
          >{{ item.name }}: {{ item.value }}</a
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      settings: {},
    };
  },
  methods: {
    copyMail() {
      this.copyToClipboard("tpelfrene@gmail.com");
      document.getElementById("copied").classList.add("copied");
    },
    copyToClipboard(textToCopy) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(textToCopy);
      } else {
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
          document.execCommand("copy") ? res() : rej();
          textArea.remove();
        });
      }
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
    this.getSettings();
  },
};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  bottom: 0;
  color: $main;
  padding-bottom: 20px;
  padding-top: 40px;
  opacity: 0;

  @include tablet {
    align-items: flex-end;
    gap: 30px;
  }

  @include mobile {
    flex-direction: column;
    align-items: flex-start;
  }

  div {
    display: flex;
    flex-direction: row;
    gap: 10px;
    color: $main;
    a,
    p {
      font-size: 1.5rem;
    }

    @include tablet {
      flex-direction: column;
      > div {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 0;
        grid-row-gap: 10px;
      }
    }
  }

  a {
    font-family: $Readex-Regular;
    position: relative;
    cursor: pointer;
    height: fit-content;
  }

  p {
    font-size: 2rem;
    font-family: $Readex-Regular;
    position: relative;
    cursor: pointer;
    height: fit-content;

    sup {
      font-size: 1.5rem;
      font-family: $Readex-Regular;
      letter-spacing: .2rem;
      position: absolute;
      padding: 5px;
      width: fit-content;
      color: $secondary;
      background-color: $main;
      height: fit-content;
      margin-left: 5px;
      transition: 0.3s all ease-out;
      transform: translateY(-10px) scaleX(0);
      transform-origin: left center;

      &.copied {
        transform: translateY(-10px) scaleX(1);
      }
    }
  }
}
</style>
