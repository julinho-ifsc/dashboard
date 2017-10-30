import {alert} from 'vanilla-dialogs'
import router from '../../core/router'
import navbar from '../../containers/navbar'
import container from '../../components/container'

export default async function () {
  const wrapper = document.createElement('div')
  try {
    wrapper.appendChild(await navbar())

    const title = document.createElement('h1')
    title.textContent = 'Bem vindo!'

    wrapper.appendChild(container([title]))
  } catch (err) {
    if (err.name === 'UnauthorizedError') {
      await alert(err.message)
      window.sessionStorage.clear()
      router.navigate('/login')
      return
    }

    if (err.name === 'InternalServerError') {
      await alert(err.message)
      return
    }

    console.error(err)
  }

  return wrapper
}
