export default async function(app) {
  const {default: loginScreen} = await import('../screens/login')
  app.appendChild(loginScreen())
}
