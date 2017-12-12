import Navigo from 'navigo'
import {getToken} from './token'
import {homeRoute, loginRoute, pointsRoute, routesRoute} from './routes'

const router = new Navigo(null)

router
  .on(homeRoute)
  .on('/login', loginRoute)
  .on('/points', pointsRoute)
  .on('/routes', routesRoute)
  .notFound(() => {
    router.navigate('/')
  })
  .resolve()

router.hooks({
  before(done) {
    window.app.innerHTML = ''

    if (!getToken()) {
      router.navigate('/login')
      return done()
    }

    done()
  }
})

export default router
