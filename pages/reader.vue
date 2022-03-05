<template>
 <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item link href="../">
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Reader</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div class="image">
        <qrcode-stream :track="paintBoundingBox" @decode="onDecode" />
      </div>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { ref, get, set, child } from 'firebase/database'

export default Vue.extend({
  name: 'QrReader',
  components: {
    QrcodeStream,
  },
  data() {
    return {
      drawer: false,
      errorMassge: '',
    }
  },

  methods: {
    async onDecode(result) {
      try {
        const dbRef = ref(this.$fire.database)
        const announcerRef = child(dbRef, '/announcer/' + result)
        if ((await get(announcerRef)).exists()) {
          const userRef = child(dbRef, 'users/' + this.$fire.auth.currentUser.uid + "/" + result)
          await set(userRef, true)
          this.$router.push('/')
        }
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
})
</script>

<style>
#image {
  width: 100%;
}
</style>