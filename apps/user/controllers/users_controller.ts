import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserService from '#apps/user/services/user_service'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}
}
