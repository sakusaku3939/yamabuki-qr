<template>
<<<<<<< HEAD
  <v-app>
    <v-app-bar app>
      <v-btn icon to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>QRコードを読み取る</v-toolbar-title>
    </v-app-bar>

    <v-main>
        {{errorMassge}}
        <qrcode-stream width="100%" :track="paintBoundingBox" @init="onInit" @decode="onDecode" />
=======
  <v-app id='inspire'>
    <v-navigation-drawer v-model='drawer' app>
      <v-list>
        <v-list-item link href='../'>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item disabled>
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
      <v-toolbar-title>Reader</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div id='image'>
        {{ errorMassage }}
        <qrcode-stream :track='paintBoundingBox' @init='onInit' @decode='onDecode' />
      </div>
>>>>>>> 9b0b29e1765365280d45260df6b0671690e98a92
    </v-main>
    <v-footer app>
      <span>製作者: 清水一聡</span>
    </v-footer>
  </v-app>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { ref, set, child } from 'firebase/database'

export default {
  name: 'QrReader',
  components: {
    QrcodeStream
  },
  data() {
    const dbRef = ref(this.$fire.database)
    const userRef = child(dbRef, 'users/' + this.$fire.auth.currentUser.uid)
    return {
      userRef,
      drawer: false,
      errorMassage: ''
    }
  },

  methods: {
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        this.errorMassage = error.name
      }
    },
    async onDecode(result) {
      try {
        await set(child(this.userRef, result), true)
        await this.$router.push('/')
      } catch {
      }
    },
    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
      }
    }
  }
}

</script>