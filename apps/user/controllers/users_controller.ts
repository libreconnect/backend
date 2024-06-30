import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserService from '#apps/user/services/user_service'
import logger from '@adonisjs/core/services/logger'

interface QueryParams {
  sub: string
}

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async status({ request }: HttpContext) {
    // Please type qs as an object with string keys and string values
    const { sub } = request.qs() as QueryParams

    logger.info(`Received request with query string: ${sub}`)

    return this.userService.status(sub)
  }
}
