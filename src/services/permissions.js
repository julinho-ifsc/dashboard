import {getResource} from './shared'

export default async () => {
  if (window.sessionStorage.getItem('permissions')) {
    return JSON.parse(window.sessionStorage.getItem('permissions'))
  }

  const permissions = await getResource('/permissions')
  window.sessionStorage.setItem('permissions', JSON.stringify(permissions))

  return permissions
}
