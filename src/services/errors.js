export class UnauthorizedError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'UnauthorizedError'
  }
}

export class InternalServerError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'InternalServerError'
  }
}
