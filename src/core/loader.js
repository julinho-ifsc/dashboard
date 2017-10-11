import loader from '../components/loader'

export function showLoader() {
  let loaderElement = document.getElementById('loader')

  if (!loaderElement) {
    loaderElement = loader()
    loaderElement.id = 'loader'
    document.body.appendChild(loaderElement)
  }

  loaderElement.style.display = 'block'
}

export function hideLoader() {
  const loaderElement = document.getElementById('loader')

  if (!loaderElement) {
    return
  }

  loaderElement.style.display = 'none'
}
