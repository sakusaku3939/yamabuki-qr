<template>
  <v-app id='inspire'>
    <v-navigation-drawer v-model='drawer' app>
      <v-list>
        <v-list-item disabled>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link href='reader'>
          <v-list-item-action>
            <v-icon>mdi-camera</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Reader</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop='drawer = !drawer'></v-app-bar-nav-icon>
      <v-toolbar-title>Home</v-toolbar-title>
    </v-app-bar>

    <v-main class='center'>
      <h1>情報科発表会2021<br class='br-mobile'>スタンプラリー</h1>
      <img id='image' :src='imagePath' alt=''>
      <div>0 / 14</div>
      <div class='button-center'>
        <button @click='pushReader'>
          <span class='top-key'></span>
          <span class='text'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'>
            <path
              d='M144 32C170.5 32 192 53.49 192 80V176C192 202.5 170.5 224 144 224H48C21.49 224 0 202.5 0 176V80C0 53.49 21.49 32 48 32H144zM128 96H64V160H128V96zM144 288C170.5 288 192 309.5 192 336V432C192 458.5 170.5 480 144 480H48C21.49 480 0 458.5 0 432V336C0 309.5 21.49 288 48 288H144zM128 352H64V416H128V352zM256 80C256 53.49 277.5 32 304 32H400C426.5 32 448 53.49 448 80V176C448 202.5 426.5 224 400 224H304C277.5 224 256 202.5 256 176V80zM320 160H384V96H320V160zM352 448H384V480H352V448zM448 480H416V448H448V480zM416 288H448V416H352V384H320V480H256V288H352V320H416V288z' />
          </svg>
          QRコードを読み取る
        </span>
          <span class='bottom-key-1'></span>
          <span class='bottom-key-2'></span>
        </button>
      </div>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>
import { ref, get, child, query, equalTo, orderByValue } from 'firebase/database'

export default {
  name: 'HomePage',
  components: {},
  async asyncData({ $fire }) {
    const dbRef = ref($fire.database)
    const userRef = child(dbRef, 'users/' + $fire.auth.currentUser.uid)
    const user = await get(query(userRef, orderByValue(), equalTo(true)))
    const imagePath = '/' + (user.size < 9 ? user.size : 9) + '.png'
    return {
      drawer: false,
      imagePath
    }
  },

  methods: {
    pushReader() {
      this.$router.push('reader')
    }
  }
}

</script>

<style>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
  font-size: 28px;
  margin: 0 32px 32px;
}

.br-mobile {
  content: '';
  margin: 4px;
}

#image {
  display: block;
  width: 70%;
  max-width: 440px;
  margin: 0 auto 12px;
}

.button-center {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

button {
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  float: right;
  font-weight: bold;
  margin: 0 32px;
  outline: none;
  overflow: visible;
  padding: 1.25em 2em;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 13px;
}

button .text {
  display: flex;
  align-items: center;
  font-size: 1.125em;
  line-height: 1.33333em;
  text-align: left;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
  text-decoration: none;
  color: black;
}

button svg {
  fill: black;
  height: 16px;
  margin-right: 12px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

button .top-key {
  height: 4px;
  width: 1.5625rem;
  top: -3px;
  left: 0.625rem;
  position: absolute;
  background: white;
  -webkit-transition: width 0.5s ease-out, left 0.3s ease-out;
  transition: width 0.5s ease-out, left 0.3s ease-out;
}

button .bottom-key-1 {
  height: 4px;
  width: 1.5625rem;
  right: 1.875rem;
  bottom: -3px;
  position: absolute;
  background: white;
  -webkit-transition: width 0.5s ease-out, right 0.3s ease-out;
  transition: width 0.5s ease-out, right 0.3s ease-out;
}

button .bottom-key-2 {
  height: 4px;
  width: 0.625rem;
  right: 0.625rem;
  bottom: -3px;
  position: absolute;
  background: white;
  -webkit-transition: width 0.5s ease-out, right 0.3s ease-out;
  transition: width 0.5s ease-out, right 0.3s ease-out;
}

button:hover {
  color: white;
  background: black;
}

button:hover::before {
  width: 0.9375rem;
  background: white;
}

button:hover .text {
  color: white;
}

button:hover svg {
  fill: white;
}

button:hover .top-key {
  left: -2px;
  width: 0;
}

button:hover .bottom-key-1,
button:hover .bottom-key-2 {
  right: 0;
  width: 0;
}

@media screen and (max-width: 600px) {
  .br-mobile {
    content: none;
  }
}
</style>