import style from './style.css'

export default () => {
  const wrapper = document.createElement('div')
  wrapper.classList.add(style.wrapper)

  const loader = document.createElement('div')
  loader.classList.add(style.loader)

  for (let i = 0; i < 4; i++) {
    const line = document.createElement('div')
    line.classList.add(style.line)
    loader.appendChild(line)
  }

  wrapper.appendChild(loader)
  return wrapper
}
