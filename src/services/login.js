import wretch from 'wretch'
import {UnauthorizedError} from './errors'
import {BASE_URL, handleError} from './shared'

export default async function (email, password) {
  return wretch(BASE_URL + '/auth')
    .json({email, password})
    .post()
    .internalError(handleError)
    .badRequest(handleError)
    .timeout(handleError)
    .error(handleError)
    .unauthorized(() => {
      throw new UnauthorizedError('Email ou senha inválidos!')
    })
    .json()
}
