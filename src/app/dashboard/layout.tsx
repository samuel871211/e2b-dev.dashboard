import Sidebar from '@/features/dashboard/sidebar/sidebar'
import NetworkStateBanner from '@/ui/network-state-banner'
import { DashboardTitleProvider } from '@/features/dashboard/dashboard-title-provider'
import { Suspense } from 'react'
import { ServerContextProvider } from '@/lib/hooks/use-server-context'
import {
  resolveTeamIdInServerComponent,
  resolveTeamSlugInServerComponent,
} from '@/lib/utils/server'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: Promise<{
    teamIdOrSlug: string
  }>
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { teamIdOrSlug } = await params
  const teamId = await resolveTeamIdInServerComponent(teamIdOrSlug)
  const teamSlug = await resolveTeamSlugInServerComponent()

  return (
    <ServerContextProvider teamId={teamId} teamSlug={teamSlug}>
      <div className="mx-auto flex h-svh max-h-full w-full flex-col">
        <NetworkStateBanner />
        <div className="flex h-full max-h-full w-full overflow-hidden">
          <Sidebar className="max-md:hidden" />
          <main className="flex-1">{children}</main>
          <Suspense fallback={null}>
            <DashboardTitleProvider />
          </Suspense>
        </div>
      </div>
    </ServerContextProvider>
  )
}
