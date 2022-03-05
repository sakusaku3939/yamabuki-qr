<template>
 <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item disabled>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link href="reader">
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
      <v-toolbar-title>Home</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <img id="image" :src="imagePath">
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { ref, get, child, query, equalTo, orderByValue } from 'firebase/database'


export default Vue.extend({
  name: 'HomePage',
  components: {},
  data(){
    return {
      drawer: false,
    }
  },
  async asyncData({$fire}) {
    const dbRef = ref($fire.database)
    const userRef = child(dbRef, 'users/' + $fire.auth.currentUser.uid)
    const user = await get(query(userRef, orderByValue(), equalTo(true)))
    const num = Object.keys(user.val() ?? {}).length
    const count = num<9 ? num : 9
    const imagePath = "/" + count + ".png"
    return {
      imagePath
    }
  },

  methods: {
  },
})
</script>

<style>
#image {
  width: 100%;
}
</style>