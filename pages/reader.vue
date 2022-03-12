<template>
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
    QrcodeStream,
  },
  data() {
    const dbRef = ref(this.$fire.database)
    const userRef = child(dbRef, 'users/' + this.$fire.auth.currentUser.uid)
    return {
      userRef,
      drawer: false,
      errorMassge: '',
    }
  },

  methods: {
    async onInit (promise) {
    try {
      await promise
    } catch (error) {
      this.errorMassge = error.name
    }
  },
    async onDecode(result) {
      try {
        await set(child(this.userRef, result), true)
        this.$router.push('/')
        } catch { }
    },
    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height },
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
      }
    },
  },
}

</script>