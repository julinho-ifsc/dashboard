import navbar from '../../components/navbar'
import permissionsService from '../../services/permissions'

const routes = [
  {
    title: 'Cadastro de pontos',
    text: 'Pontos',
    href: '/points'
  },
  {
    title: 'Cadastro de rotas',
    text: 'Rotas',
    href: '/routes'
  },
  {
    title: 'Cadastro de usuários',
    text: 'Usuários',
    href: '/users'
  },
  {
    title: 'Cadastro de grupos',
    text: 'Grupos',
    href: '/roles'
  },
  {
    title: 'Cadastro de clientes',
    text: 'Clientes',
    href: '/clients'
  }
]

export default async function () {
  const permissions = await permissionsService()

  const allowedResources = permissions
    .filter(permission => permission.read)
    .map(permission => permission.name)

  const allowedRoutes = routes.filter(route =>
    allowedResources.includes(route.href.substring(1))
  )

  return navbar(allowedRoutes)
}
