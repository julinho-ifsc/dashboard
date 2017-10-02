import {InternalServerError} from './errors'

export const BASE_URL = 'http://192.168.99.100:8080'

export const handleError = err => {
  console.error(err)
  throw new InternalServerError('Ocorreu um erro, tente novamente mais tarde')
}
