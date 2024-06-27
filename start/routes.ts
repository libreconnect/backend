/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .get('/', async ({ auth }) => {
    return {
      hello: 'world',
      user: auth.user,
    }
  })
  .middleware(middleware.auth())
