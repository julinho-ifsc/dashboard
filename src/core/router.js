import {removeChilds} from './utils'

export default class Router {
  static navigate(route) {
    window.location.hash = route
  }

  constructor(app) {
    this.app = app
    this.routes = {}
    this.defaultRoute = []
  }

  handleRoute(route, handler) {
    this.routes[route] = handler
  }

  handleDefault(route, handler) {
    this.defaultRoute = [route, handler]
  }

  load() {
    const route = window.location.hash.substring(1)

    if (route === this.defaultRoute[0]) {
      removeChilds(this.app)
      this.defaultRoute[1](this.app)
      return
    }

    if (this.routes[route]) {
      removeChilds(this.app)
      this.routes[route](this.app)
      return
    }

    window.location.hash = this.defaultRoute[0]
  }

  listen() {
    if (this.defaultRoute.length === 0) {
      throw new Error('Default route not defined')
    }

    this.load()
    window.addEventListener('hashchange', this.load.bind(this))
  }
}
