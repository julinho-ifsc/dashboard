import {alert} from 'vanilla-dialogs'
import loginForm from '../../components/login-form'
import loginService from '../../services/login'
import Router from '../../core/router'

export default () => {
  const formElement = loginForm()

  formElement.addEventListener('submit', async event => {
    event.preventDefault()

    const emailField = formElement.email
    const passwordField = formElement.password

    const email = emailField.value
    const password = passwordField.value

    try {
      const {token} = await loginService(email, password)
      window.sessionStorage.setItem('token', token)
      Router.navigate('/')
    } catch (err) {
      if (err.name === 'UnauthorizedError') {
        await alert(err.message)
        passwordField.value = ''
        return
      }

      if (err.name === 'InternalServerError') {
        await alert(err.message)
        return
      }

      console.error(err)
    }
  })
  return formElement
}
