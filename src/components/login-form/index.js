import input from '../input'
import button from '../button'
import style from './style.css'

export default () => {
  const wrapper = document.createElement('form')
  wrapper.classList.add(style.wrapper)

  const title = document.createElement('h1')
  title.textContent = 'Dashboard'
  title.classList.add(style.title)
  wrapper.appendChild(title)

  const inputElements = [
    input({
      name: 'email',
      type: 'email',
      title: 'Email',
      required: true
    }),
    input({
      name: 'password',
      type: 'password',
      title: 'Senha',
      required: true
    })
  ]
  inputElements.forEach(element => {
    element.classList.add(style.input)
    wrapper.appendChild(element)
  })

  wrapper.appendChild(button({text: 'Entrar', type: 'submit'}))
  return wrapper
}
