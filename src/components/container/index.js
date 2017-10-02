import style from './style.css'

export default children => {
  const container = document.createElement('div')
  container.classList.add(style.container)

  return children.reduce((container, child) => {
    container.appendChild(child)
    return container
  }, container)
}
