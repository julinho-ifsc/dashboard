import style from './style.css'

export default ({title, name, type = 'text', required = false}) => {
  const wrapper = document.createElement('div')
  wrapper.classList.add(style.wrapper)

  const label = document.createElement('label')
  label.setAttribute('for', 'input-' + name)
  label.textContent = title
  label.classList.add(style.label)

  const input = document.createElement('input')
  input.type = type
  input.name = name
  input.id = 'input-' + name
  input.required = required
  input.classList.add(style.input)
  input.addEventListener('focus', () => {
    wrapper.classList.add('is-active')
  })
  input.addEventListener('blur', () => {
    wrapper.classList.remove('is-active')
  })

  wrapper.appendChild(label)
  wrapper.appendChild(input)

  return wrapper
}
