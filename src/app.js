import 'whatwg-fetch'
import 'regenerator-runtime/runtime'
import './app.css'
import Router from './core/router'
import homeRoute from './routes/home'
import loginRoute from './routes/login'
import pointsRoute from './routes/points'

async function main() {
  const app = document.getElementById('app')
  const router = new Router(app)
  router.handleDefault('/', homeRoute)
  router.handleRoute('/login', loginRoute)
  router.handleRoute('/points', pointsRoute)
  router.listen()

  window.addEventListener('logout', () => {
    window.sessionStorage.clear()
    Router.navigate('/login')
  })
}

window.addEventListener('load', main)
