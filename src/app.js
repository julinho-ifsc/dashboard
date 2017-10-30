import 'whatwg-fetch'
import 'regenerator-runtime/runtime'
import './app.css'
import router from './core/router'

async function main() {
  window.app = document.getElementById('app')

  window.addEventListener('logout', () => {
    window.sessionStorage.clear()
    router.navigate('/login')
  })
}

window.addEventListener('load', main)
