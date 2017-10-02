import {alert} from 'vanilla-dialogs'
import Router from '../../core/router'
import permissionsService from '../../services/permissions'
import navbar from '../../components/navbar'

const routes = [
  {
    title: 'Cadastro de pontos',
    text: 'Pontos',
    href: '#/points'
  },
  {
    title: 'Cadastro de rotas',
    text: 'Rotas',
    href: '#/routes'
  },
  {
    title: 'Cadastro de usuários',
    text: 'Usuários',
    href: '#/users'
  },
  {
    title: 'Cadastro de grupos',
    text: 'Grupos',
    href: '#/roles'
  },
  {
    title: 'Cadastro de clientes',
    text: 'Clientes',
    href: '#/clients'
  }
]

export default async function() {
  const wrapper = document.createElement('div')
  try {
    if (!window.sessionStorage.getItem('permissions')) {
      const token = window.sessionStorage.getItem('token')
      const permissions = await permissionsService(token)
      window.sessionStorage.setItem('permissions', JSON.stringify(permissions))
    }
    const permissions = JSON.parse(window.sessionStorage.getItem('permissions'))

    const allowedResources = permissions
      .filter(permission => permission.read)
      .map(permission => permission.name)

    const allowedRoutes = routes
      .filter(route => allowedResources.includes(route.href.substring(2)))

    wrapper.appendChild(navbar(allowedRoutes))

  } catch (err) {
    if (err.name === 'UnauthorizedError') {
      await alert(err.message)
      window.sessionStorage.clear()
      Router.navigate('/login')
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
