import style from './style.css'

export default ({text, type = 'button'}) => {
  const button = document.createElement('button')
  button.textContent = text
  button.type = type
  button.classList.add(style.button)

  return button
}
