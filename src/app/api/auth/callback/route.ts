import { createClient } from '@/lib/clients/supabase/server'
import { redirect } from 'next/navigation'
import { PROTECTED_URLS } from '@/configs/urls'

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin
  const returnTo = requestUrl.searchParams.get('returnTo')?.toString()
  const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString()

  console.log('Auth callback:', {
    code: !!code,
    origin,
    returnTo,
  })

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  if (redirectTo) {
    const returnToUrl = new URL(redirectTo, origin)
    if (returnToUrl.origin === origin) {
      console.log('Redirecting to:', redirectTo)
      return redirect(redirectTo)
    }
  }

  // If returnTo is present, redirect there
  if (returnTo) {
    // Ensure returnTo is a relative URL to prevent open redirect vulnerabilities
    const returnToUrl = new URL(returnTo, origin)
    if (returnToUrl.origin === origin) {
      console.log('Returning to:', returnTo)
      return redirect(returnTo)
    }
  }

  // Default redirect to dashboard
  console.log('Redirecting to dashboard')
  return redirect(PROTECTED_URLS.DASHBOARD)
}
