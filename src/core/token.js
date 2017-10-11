export const setToken = token => {
  window.sessionStorage.setItem('token', token)
}

export const getToken = () => window.sessionStorage.getItem('token')
