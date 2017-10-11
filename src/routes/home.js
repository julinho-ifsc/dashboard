import Router from '../core/router'
import {getToken} from '../core/token'

export default async function () {
  if (!getToken()) {
    Router.navigate('/login')
    return
  }
  const {default: homeScreen} = await import('../screens/home')
  return homeScreen()
}
