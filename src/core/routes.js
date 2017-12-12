export async function homeRoute() {
  const {default: homeScreen} = await import('../screens/home')
  window.app.appendChild(await homeScreen())
}

export async function loginRoute() {
  const {default: loginScreen} = await import('../screens/login')
  window.app.appendChild(await loginScreen())
}

export async function pointsRoute() {
  const {default: pointsScreen} = await import('../screens/points')
  window.app.appendChild(await pointsScreen())
}
export async function routesRoute() {
  const {default: routesScreen} = await import('../screens/routes')
  window.app.appendChild(await routesScreen())
}
