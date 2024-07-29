/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import emitter from '@adonisjs/core/services/emitter'
import logger from '@adonisjs/core/services/logger'
import rabbit from '#apps/shared/services/rabbit/main'

const FooController = () => import('#apps/user/controllers/foo_controller')

rabbit.consume('foo', [FooController, 'test'])

router
  .get('/', async ({ auth }) => {
    return {
      hello: 'world',
      user: auth.user,
    }
  })
  .middleware(middleware.auth())


router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.scalar('/swagger')
})

emitter.on('db:query', function (query) {
  logger.debug(query)
})

await rabbit.start()
