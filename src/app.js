import 'whatwg-fetch'
import 'regenerator-runtime/runtime'
import './app.css'
import Router from './core/router'
import homeRoute from './routes/home'
import loginRoute from './routes/login'

async function main() {
  if (process.env.NODE_ENV === 'production') {
    const runtime = await import('offline-plugin/runtime')

    runtime.install({
      onUpdateReady() {
        runtime.applyUpdate()
      },
      onUpdated() {
        window.location.reload()
      },
    })
  }

  const app = document.getElementById('app')
  const router = new Router(app)
  router.handleDefault('/', homeRoute)
  router.handleRoute('/login', loginRoute)
  router.listen()
}

main()
