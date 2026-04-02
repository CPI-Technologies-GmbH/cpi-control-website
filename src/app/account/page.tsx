import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { findLicensesByEmail, getPlanLimits, listActivationsForLicense, ensureTables } from "@/lib/license-db";
import AccountActions from "./AccountActions";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  await ensureTables();
  const licenses = await findLicensesByEmail(session.user.email);
  const activeLicense = licenses.find(l => l.status === "active" || l.status === "past_due") || null;
  const plan = activeLicense ? getPlanLimits(activeLicense.plan) : getPlanLimits("free");
  const activations = activeLicense ? await listActivationsForLicense(activeLicense.id) : [];
  const activeActivations = activations.filter(a => !a.deactivated_at);

  return (
    <div className="min-h-screen bg-[#0b1120] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800/50 px-6 md:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-mono text-sm font-semibold text-gray-200">
          <Image src="/app-icon.png" alt="CPI-Control" width={28} height={28} className="rounded-md" />
          CPI-Control
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{session.user.email}</span>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
            <button className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Sign out</button>
          </form>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <h1 className="text-3xl font-bold">Account</h1>

        {/* Current Plan */}
        <div className="border border-gray-800 rounded-xl p-6">
          <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Current Plan</h2>
          <div className="flex items-center gap-4 mb-6">
            <span className={`text-2xl font-bold px-4 py-1 rounded-lg ${
              activeLicense?.plan === "unlimited" ? "bg-purple-500/20 text-purple-400" :
              activeLicense?.plan === "team" ? "bg-blue-500/20 text-blue-400" :
              "bg-gray-700/50 text-gray-400"
            }`}>
              {plan.name}
            </span>
            {activeLicense?.status === "past_due" && (
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">Payment Past Due</span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Services</div>
              <div className="text-lg font-bold">{plan.maxServices >= 99999 ? "Unlimited" : `up to ${plan.maxServices}`}</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Remote Agents</div>
              <div className="text-lg font-bold">{plan.maxAgents >= 99 ? "Unlimited" : `up to ${plan.maxAgents}`}</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Activations</div>
              <div className="text-lg font-bold">{activeActivations.length} / {plan.maxActivations}</div>
            </div>
          </div>

          {!activeLicense || activeLicense.plan === "free" ? (
            <div className="flex gap-3">
              <AccountActions action="checkout" plan="team" email={session.user.email} label="Upgrade to Team — €99/yr" primary />
              <AccountActions action="checkout" plan="unlimited" email={session.user.email} label="Upgrade to Unlimited — €499/yr" />
            </div>
          ) : (
            <div className="flex gap-3">
              <AccountActions action="portal" licenseKey={activeLicense.key} label="Manage Subscription" />
              <AccountActions action="portal" licenseKey={activeLicense.key} label="Cancel Subscription" variant="danger" />
            </div>
          )}
        </div>

        {/* License Key */}
        {activeLicense && (
          <div className="border border-gray-800 rounded-xl p-6">
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">License Key</h2>
            <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
              <code className="text-lg font-mono text-gray-100 tracking-wider select-all">{activeLicense.key}</code>
              <span className="text-xs text-gray-500">Copy this into CPI-Control → Settings → License</span>
            </div>
            {activeLicense.expires_at && (
              <p className="text-xs text-gray-500 mt-3">
                Expires: {new Date(activeLicense.expires_at).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}
                {activeLicense.cancelled_at && " (cancelled, active until expiry)"}
              </p>
            )}
          </div>
        )}

        {/* Active Devices */}
        <div className="border border-gray-800 rounded-xl p-6">
          <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Active Devices</h2>
          {activeActivations.length === 0 ? (
            <p className="text-sm text-gray-500">No devices activated yet. Enter your license key in the CPI-Control app.</p>
          ) : (
            <div className="space-y-2">
              {activeActivations.map((a) => (
                <div key={a.id} className="flex items-center justify-between bg-gray-900/50 rounded-lg px-4 py-3">
                  <div>
                    <p className="text-sm font-mono text-gray-200">{a.machine_name || a.machine_id.slice(0, 16) + "..."}</p>
                    <p className="text-xs text-gray-500">
                      Activated {new Date(a.activated_at).toLocaleDateString("de-DE")}
                      {a.last_validated_at && ` · Last seen ${new Date(a.last_validated_at).toLocaleDateString("de-DE")}`}
                    </p>
                  </div>
                  {activeLicense && (
                    <AccountActions action="deactivate" licenseKey={activeLicense.key} activationToken={a.token} label="Remove" variant="danger" small />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Billing History Link */}
        {activeLicense?.stripe_customer_id && (
          <div className="border border-gray-800 rounded-xl p-6">
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Billing</h2>
            <p className="text-sm text-gray-400 mb-4">View invoices, update payment method, or manage your subscription through the Stripe portal.</p>
            <AccountActions action="portal" licenseKey={activeLicense.key} label="Open Billing Portal" />
          </div>
        )}
      </div>
    </div>
  );
}
