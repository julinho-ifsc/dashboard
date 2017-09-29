import loginScreen from './screens/login'
import homeScreen from './screens/home'
import './app.css'

function main() {
  const app = document.getElementById('app')

  if (window.sessionStorage.getItem('token')) {
    app.appendChild(homeScreen())
    return
  }
  app.appendChild(loginScreen())
}

main()
