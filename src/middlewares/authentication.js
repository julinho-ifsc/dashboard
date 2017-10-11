import Router from '../core/router'
import {getToken} from '../core/token'

export default route => () => {
  if (!getToken()) {
    Router.navigate('/login')
    return
  }
  return route()
}
