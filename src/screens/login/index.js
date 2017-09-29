import {alert} from 'vanilla-dialogs'
import loginForm from '../../components/login-form'
import loginService from '../../services/login.js'
import {UnauthorizedError, InternalServerError} from '../../services/errors'

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
    } catch (err) {
      if (err.name === UnauthorizedError.name) {
        await alert(err.message)
        passwordField.value = ''
        return
      }

      if (err.name === InternalServerError.name) {
        await alert(err.message)
        return
      }

      console.error(err)
    }
  })
  return formElement
}
