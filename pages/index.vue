<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>情報科発表会2021 スタンプラリー</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-col>
        <v-container>
          <v-img width="100%" :src="imagePath"/>
        </v-container>
        <v-container>
          <v-row justify="center">
            <v-container>
              <v-btn rounded large to="reader/">
                <v-icon left>mdi-qrcode-scan</v-icon>
                QRコードを読み取る
              </v-btn>
            </v-container>
            <v-spacer/>
            <v-container>
              <v-btn rounded large download="yamabukichan.png" :href="imagePath">
                <v-icon left>mdi-download</v-icon>
                画像を保存する
              </v-btn>
            </v-container>
          </v-row>
        </v-container>
        <v-container>
          <span>{{num}}人の発表を聴きました</span>
        </v-container>
      </v-col>
    </v-main>
    <v-footer app>
      <span>製作者: 清水一聡</span>
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
      num: user.size,
      imagePath
    }
  },

  methods: {}
}

</script>