export const ERROR_CODES = {
  CLI_AUTH: 'CLI_AUTH_ERROR',
  SELECTED_TEAM_RESOLUTION: 'SELECTED_TEAM_RESOLUTION_ERROR',
  TEAM_RESOLUTION: 'TEAM_RESOLUTION_ERROR',
  URL_REWRITE: 'URL_REWRITE_ERROR',
  INFRA: 'INFRA_ERROR',
  GUARD: 'GUARD_ERROR',
  EMAIL_VALIDATION: 'EMAIL_VALIDATION_ERROR',
  SUPABASE: 'SUPABASE_ERROR',
} as const

export const INFO_CODES = {
  EXPENSIVE_OPERATION: 'EXPENSIVE_OPERATION',
  TEAM_RESOLUTION: 'TEAM_RESOLUTION',
  ACCESS_DENIED: 'ACCESS_DENIED',
  AUTH_REDIRECT: 'AUTH_REDIRECT',
} as const
