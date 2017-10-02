import link from '../link'
import exitIcon from '../../icons/exit-light.svg'
import style from './style.css'

export default items => {
  const wrapper = document.createElement('nav')
  wrapper.classList.add(style.wrapper)

  const brand = link({
    text: 'Dashboard',
    title: 'Dashboard',
    href: '#/',
    light: true
  })
  brand.classList.add(style.brand)

  const listElement = document.createElement('ul')
  listElement.classList.add(style.list)

  const list = items.reduce((wrapper, item) => {
    const navbarItem = document.createElement('li')
    navbarItem.classList.add(style.item)
    navbarItem.appendChild(link({...item, light: true}))

    wrapper.appendChild(navbarItem)
    return wrapper
  }, listElement)

  const logoutButton = document.createElement('img')
  logoutButton.src = exitIcon
  logoutButton.alt = 'Sair'
  logoutButton.title = 'Sair da dashboard'
  logoutButton.addEventListener('click', () => {
    const event = new Event('logout')
    window.dispatchEvent(event)
  })
  logoutButton.classList.add(style.logout)

  wrapper.appendChild(brand)
  wrapper.appendChild(list)
  wrapper.appendChild(logoutButton)

  return wrapper
}
