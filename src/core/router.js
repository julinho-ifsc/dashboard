import isDom from 'is-dom'

const removeChilds = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

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

  render(element) {
    if (!isDom(element)) {
      return
    }

    removeChilds(this.app)
    this.app.appendChild(element)
  }

  async load() {
    const route = window.location.hash.substring(1)

    if (route === this.defaultRoute[0]) {
      this.render(await this.defaultRoute[1]())
      return
    }

    if (this.routes[route]) {
      this.render(await this.routes[route]())
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
