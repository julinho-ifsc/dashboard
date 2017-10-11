import wretch from 'wretch'
import {getToken} from '../core/token'

import {InternalServerError, UnauthorizedError} from './errors'

export const BASE_URL = 'http://192.168.99.100:8080'

export const handleError = err => {
  console.error(err)
  throw new InternalServerError('Ocorreu um erro, tente novamente mais tarde')
}

export const getResource = route =>
  wretch(BASE_URL + route)
    .headers({
      Authorization: 'Bearer ' + getToken()
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
