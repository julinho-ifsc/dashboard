import style from './style.css'

export default ({text, href, title, light = false}) => {
  const link = document.createElement('a')
  link.href = href
  link.textContent = text
  link.title = title
  link.classList.add(style.link)

  if (light) {
    link.classList.add(style.light)
  }

  return link
}
