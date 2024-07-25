import { createError } from '@adonisjs/core/exceptions'

export const E_HEART_RATE_CRATE = createError(
  'Failed to create heart rate data',
  'E_HEART_RATE_CREATE',
  500
)
