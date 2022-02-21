<template>
  <footer>
    <p @click="copyMail">tpelfrene@gmail.com<sup id="copied">copié !</sup></p>
    <div v-if="$route.name == 'pas-affiché'">
      // pas affiché pour le moment
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
      step: 1,
      timeMsg: null,
    };
  },
  methods: {
    copyMail() {
      this.copyToClipboard("tpelfrene@gmail.com");
      document.getElementById("copied").classList.add("copied");
      document.getElementById("copied").classList.remove("anim");
      this.getCopiedMessage();
      this.step++;
      // if (this.timeMsg) {
      clearTimeout(this.timeMsg);
      // }
      this.timeMsg = setTimeout(() => {
        document.getElementById("copied").classList.remove("copied");
        document.getElementById("copied").classList.remove("anim");
        this.step = 1;
      }, 5000);
    },
    getCopiedMessage() {
      switch (this.step) {
        case 1:
          document.getElementById("copied").innerText = "copié !";
          break;

        case 2:
          document.getElementById("copied").innerText = "re copié !";
          break;

        case 3:
          document.getElementById("copied").innerText = "re re copié !";
          break;

        case 4:
          document.getElementById("copied").innerText =
            "re re re copié !";
          break;

        case 5:
          document.getElementById("copied").innerText =
            "il serait temps de m'envoyer un mail";
          break;

        case 6:
          document.getElementById("copied").innerText = "SUPER COPIE !!";
          break;

        case 7:
          document.getElementById("copied").innerText = "HYPER COPIE !!!";
          document.getElementById("copied").classList.add("anim");
          break;

        case 8:
          document.getElementById("copied").innerText = "MEGA COPIE !!!!";
          document.getElementById("copied").classList.add("anim");
          break;

        case 9:
          document.getElementById("copied").innerText =
            "COPIE INTERGALACTIQUE !!!!";
          document.getElementById("copied").classList.add("anim");
          break;

        default:
          this.step = 1;
          document.getElementById("copied").innerText = "copié !";
          break;
      }
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
      letter-spacing: 0.2rem;
      position: absolute;
      padding: 5px;
      width: fit-content;
      white-space: nowrap;
      color: $secondary;
      background-color: $main;
      height: fit-content;
      margin-left: 5px;
      transition: 0.3s all ease-out;
      transform: translateY(-10px) scaleX(0);
      transform-origin: left center;

      @include mobile{
        top: -100%;
        left: -1vw;
      }

      &.copied {
        transform: translateY(-10px) scaleX(1);
      }
      &.anim {
        animation: move 0.1s ease-out alternate-reverse infinite;
        background-color: #e62121;
        transform: translateY(-10px) scaleX(1) rotate(0deg);
      }
      @keyframes move {
        from {
          transform: translateY(-10px) scaleX(1) rotate(0deg);
          transform-origin: center;
        }
        to {
          transform: translateY(-10px) scaleX(1) rotate(3deg);
          transform-origin: center;
        }
      }
    }
  }
}
</style>
