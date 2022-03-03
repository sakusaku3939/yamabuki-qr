import { signInAnonymously } from 'firebase/auth'

export default async function ({ $fire }) {
  if($fire.auth.currentUser == null){
    await signInAnonymously($fire.auth)
  }
}
