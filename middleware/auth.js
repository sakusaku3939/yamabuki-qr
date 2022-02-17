import { signInAnonymously } from 'firebase/auth'

export default async function ({ $fire }) {
  await signInAnonymously($fire.auth)
}
