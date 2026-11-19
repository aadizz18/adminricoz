import { redirect } from "next/navigation";

/**
 * RICOZ Platform Root Route
 * 
 * Configured to open the Admin Operations Panel directly on application launch.
 * The public live website is accessible via /live or the "View Live Website" button in the admin panel.
 */
export default function RootPage() {
  redirect("/admin");
}
