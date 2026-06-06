import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) return redirect("/auth");

  return (
    <div className="max-w-[700px] mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      
      <div className="bg-white rounded-[16px] border border-borderLight p-6 mb-6">
        <h3 className="text-[15px] font-semibold mb-4">Profile</h3>
        <div className="mb-4">
          <label className="block text-[13px] text-textSecondary mb-1">Name</label>
          <div className="text-[15px] font-medium">{session.user.name}</div>
        </div>
        <div>
          <label className="block text-[13px] text-textSecondary mb-1">Email</label>
          <div className="text-[15px] font-medium">{session.user.email}</div>
        </div>
      </div>

      <div className="bg-white rounded-[16px] border border-borderLight p-6 mb-6">
        <h3 className="text-[15px] font-semibold mb-4">Account Actions</h3>
        <form action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}>
          <button type="submit" className="px-4 py-2 bg-[rgba(212,116,42,0.12)] text-peach-text rounded-[10px] text-sm font-medium hover:bg-[rgba(212,116,42,0.2)] transition-colors">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
