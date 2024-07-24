import { createError } from '@adonisjs/core/exceptions'

export const E_AUTHENTICATION_UNAUTHORIZED = createError(
  'Unauthorized',
  'E_AUTHENTICATION_UNAUTHORIZED',
  401
)
