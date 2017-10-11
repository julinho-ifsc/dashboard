export default async function () {
  const {default: pointsScreen} = await import('../screens/points')
  return pointsScreen()
}
