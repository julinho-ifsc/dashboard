import wretch from 'wretch'
import {InternalServerError, UnauthorizedError} from './errors'

const BASE_URL = 'http://192.168.99.100:8080'

const handleError = err => {
  console.error(err)
  throw new InternalServerError('Ocorreu um erro, tente novamente mais tarde')
}

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
