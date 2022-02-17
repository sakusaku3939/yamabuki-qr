<template>
  <div>
    <qrcode-vue :size="size" :value="code" />
  </div>
</template>

<script>
import Vue from 'vue'
import qrcodeVue from 'qrcode-vue'
import { ref, push, remove, onValue } from 'firebase/database'

export default Vue.extend({
  name: 'QrGenerator',
  components: {
    qrcodeVue,
  },
  data() {
    const dbRef = ref(this.$fire.database, 'codes')
    const code = push(dbRef, true)
    onValue(code, (snapshot)=>{
      if(!snapshot.exists()){
        location.reload()
      }
    })
    setTimeout(() => {
      remove(code)
      }
      , 180000 
    )
    return {
      size: 80,
      code:code.key,
    }
  },
})
</script>
