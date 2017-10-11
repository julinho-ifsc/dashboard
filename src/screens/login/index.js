import {alert} from 'vanilla-dialogs'
import loginForm from '../../components/login-form'
import loginService from '../../services/login'
import {showLoader, hideLoader} from '../../core/loader'
import Router from '../../core/router'
import {setToken} from '../../core/token'

export default () => {
  const formElement = loginForm()

  formElement.addEventListener('submit', async event => {
    event.preventDefault()

    const emailField = formElement.email
    const passwordField = formElement.password

    const email = emailField.value
    const password = passwordField.value

    try {
      showLoader()
      const {token} = await loginService(email, password)
      setToken(token)
      Router.navigate('/')
      hideLoader()
    } catch (err) {
      hideLoader()
      if (err.name === 'UnauthorizedError') {
        await alert(err.message)
        passwordField.value = ''
        return
      }

      if (err.name === 'InternalServerError') {
        await alert(err.message)
        return
      }

      await alert('Não foi possível fazer o login, tente novamente mais tarde.')
      console.error(err)
    }
  })
  return formElement
}
