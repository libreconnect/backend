import { createError } from '@adonisjs/core/exceptions'

export const E_PATIENT_FETCH_UNAUTHORIZED = createError(
  'Authenticated account is not a professional.',
  'E_PATIENT_FETCH_UNAUTHORIZED',
  403
)

export const E_PATIENT_NOT_FOUND = createError('Patient not found', 'E_PATIENT_NOT_FOUND', 404)
