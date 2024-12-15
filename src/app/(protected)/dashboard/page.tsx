import { signOutAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";

export default async function Index() {
  return <Button onClick={signOutAction}>Sign out</Button>;
}
