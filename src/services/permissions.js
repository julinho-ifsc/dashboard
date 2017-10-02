import wretch from 'wretch'
import {UnauthorizedError} from './errors'
import {BASE_URL, handleError} from './shared'

export default token =>
  wretch(BASE_URL + '/permissions')
    .headers({
      Authorization: 'Bearer ' + token
    })
    .get()
    .badRequest(handleError)
    .unauthorized(() => {
      throw new UnauthorizedError('Usuário não autorizado')
    })
    .notFound(handleError)
    .timeout(handleError)
    .internalError(handleError)
    .json()
