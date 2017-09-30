import 'whatwg-fetch'
import 'regenerator-runtime/runtime'
import './app.css'

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

  if (window.sessionStorage.getItem('token')) {
    const {default: homeScreen} = await import('./screens/home')
    app.appendChild(homeScreen())
    return
  }
  const {default: loginScreen} = await import('./screens/login')
  app.appendChild(loginScreen())
}

main()
