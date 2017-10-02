import Router from '../core/router'

export default async function () {
  if (!window.sessionStorage.getItem('token')) {
    Router.navigate('/login')
    return
  }
  const {default: homeScreen} = await import('../screens/home')
  return homeScreen()
}
