<template>
  <footer>
    <a :href="this.settings.githubLink"><img src="~/assets/medias/github.png" alt="my github link"></a>
    <span></span>
    <p class="mail" @click="copyMail">
      {{mail}}<sup id="copied">copié !</sup>
    </p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      settings: {},
      step: 1,
      timeMsg: null,
      mail: ""
    };
  },
  methods: {
    copyMail() {
      this.copyToClipboard(this.mail);
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
          document.getElementById("copied").innerText = "copied !";
          break;

        case 2:
          document.getElementById("copied").innerText = "recopied !";
          break;

        case 3:
          document.getElementById("copied").innerText = "rerecopied !";
          break;

        case 4:
          document.getElementById("copied").innerText = "rererecopied !";
          break;

        case 5:
          document.getElementById("copied").innerText =
            "it's time to send me an email";
          break;

        case 6:
          document.getElementById("copied").innerText = "SUPER COPY !!";
          break;

        case 7:
          document.getElementById("copied").innerText = "HYPER COPY !!!";
          document.getElementById("copied").classList.add("anim");
          break;

        case 8:
          document.getElementById("copied").innerText = "MEGA COPY !!!!";
          document.getElementById("copied").classList.add("anim");
          break;

        case 9:
          document.getElementById("copied").innerText =
            "INTERGALACTIC COPY !!!!";
          document.getElementById("copied").classList.add("anim");
          break;

        default:
          this.step = 1;
          document.getElementById("copied").innerText = "copied !";
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
    this.mail = 'tpelfrene@gmail.com'
  },
};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  position: relative;
  width: 100%;
  bottom: 0;
  color: #F0F0F0;
  padding-bottom: 35px;
  padding-top: 40px;
  opacity: 0;
  transition: opacity .5s ease-in-out;

  img {
    width: 25px;
    height: 25px;
    filter: invert(99%) sepia(2%) saturate(64%) hue-rotate(146deg) brightness(114%) contrast(88%);
  }

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
    color: #F0F0F0;
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

  span {
    width: 2px;
    background-color: #F0F0F0;
    height: 25px;
  }

  p {
    font-size: 2rem;
    font-family: $Readex-Regular;
    position: relative;
    cursor: pointer;
    height: fit-content;

    &.mail {
      position: relative;
      &:after {
        content: "";
        position: absolute;
        background: url("~/assets/medias/copy.svg") center/cover no-repeat;
        filter: invert(99%) sepia(2%) saturate(64%) hue-rotate(146deg) brightness(114%) contrast(88%);
        width: 1.7rem;
        height: 1.7rem;
        right: -2.5rem;
        top: 0.4rem;
      }
    }

    sup {
      font-size: 1.5rem;
      font-family: $Readex-Regular;
      letter-spacing: 0.2rem;
      position: absolute;
      padding: 5px 10px;
      width: fit-content;
      white-space: nowrap;
      color: #323232;
      background-color: #F0F0F0;
      height: fit-content;
      margin-left: 5px;
      transition: 0.3s all ease-out;
      transform: translateY(-10px) scaleY(0);
      transform-origin: center bottom;
      top: -100%;
      left: -0.3vw;
      border-radius: 10px;

      &:after {
        content: "";
        position: absolute;
        height: 0;
        width: 0;
        border-top: 4px solid #F0F0F0;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        bottom: -4px;
        left: 1vw;
        @include mobile {
          left: 5vw;
        }
      }

      &.copied {
        transform: translateY(-10px) scaleY(1);
      }
      &.anim {
        animation: move 0.1s ease-out alternate-reverse infinite;
        background-color: #CB4D3A;
        color: #F0F0F0;
        transform: translateY(-10px) scaleY(1) rotate(0deg);

        &:after {
          border-top: 4px solid #CB4D3A;
        }
      }
      @keyframes move {
        from {
          transform: translateY(-10px) scaleY(1) rotate(0deg);
          transform-origin: center;
        }
        to {
          transform: translateY(-10px) scaleY(1) rotate(3deg);
          transform-origin: center;
        }
      }
    }
  }
}
</style>
