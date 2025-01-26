import Sidebar from "@/features/dashboard/sidebar/sidebar";
import ClientProviders from "@/features/dashboard/client-providers";
import NetworkStateBanner from "@/ui/network-state-banner";

export const dynamic = "force-static";
export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <div className="mx-auto flex h-svh max-h-full w-full flex-col">
        <NetworkStateBanner />
        <div className="flex h-full max-h-full w-full overflow-hidden">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </ClientProviders>
  );
}
