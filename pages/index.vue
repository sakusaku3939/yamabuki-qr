<template>
  <div>
    <n-link to="/reader"> QRコードを読み込む</n-link>
    {{count}}
  </div>
</template>

<script>
import Vue from 'vue'
import { ref, get, child } from 'firebase/database'

export default Vue.extend({
  name: 'HomePage',
  components: {},
  async asyncData({$fire}) {
    const dbRef = ref($fire.database)
    const userRef = child(dbRef, '/user/' + $fire.auth.currentUser.uid)
    const user = await get(userRef)
    return {
      count: user.val(),
    }
  },

  methods: {},
})
</script>
