export default async function () {
  const {default: loginScreen} = await import('../screens/login')
  return loginScreen()
}
