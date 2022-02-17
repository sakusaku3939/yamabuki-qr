<template>
  <div>
    <n-link to="/">戻る</n-link>
    <qrcode-stream :track="paintBoundingBox" @decode="onDecode" />
    {{ errorMassge }}
  </div>
</template>

<script>
import Vue from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { ref, get, set, remove, child } from 'firebase/database'

export default Vue.extend({
  name: 'QrReader',
  components: {
    QrcodeStream,
  },
  data() {
    return {
      errorMassge: '',
    }
  },

  methods: {
    async onDecode(result) {
      console.log(this.redirect)
      try {
        const dbRef = ref(this.$fire.database)
        const codesRef = child(dbRef, '/codes/' + result)
        if ((await get(codesRef)).exists()) {
          await remove(codesRef.ref)
          const user = child(dbRef, '/user/' + this.$fire.auth.currentUser.uid)
          await set(user, (await get(user)).val() + 1)
          this.$router.push('/')
        }
      } catch {
        this.errorMassge = 'error'
      }
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
})
</script>
