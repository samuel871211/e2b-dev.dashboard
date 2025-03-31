export const API_KEY_PREFIX = 'e2b_'
export const ACCESS_TOKEN_PREFIX = 'sk_e2b_'
export const SUPABASE_TOKEN_HEADER = 'X-Supabase-Token'
export const SUPABASE_TEAM_HEADER = 'X-Supabase-Team'

export const SUPABASE_AUTH_HEADERS = (token: string, teamId?: string) => ({
  [SUPABASE_TOKEN_HEADER]: token,
  ...(teamId && { [SUPABASE_TEAM_HEADER]: teamId }),
})
