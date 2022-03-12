<template>
  <v-app id='inspire'>
    <v-main>
      <div id='image'>
        {{ errorMassage }}
        <qrcode-stream :track='paintBoundingBox' @init='onInit' @decode='onDecode' />
      </div>
    </v-main>
    <v-footer app>
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

<style>
#image {
  width: 100%;
}
</style>