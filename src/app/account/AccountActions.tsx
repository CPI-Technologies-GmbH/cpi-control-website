"use client";
import { useState } from "react";

interface Props {
  action: "checkout" | "portal" | "deactivate";
  plan?: string;
  email?: string;
  licenseKey?: string;
  activationToken?: string;
  label: string;
  primary?: boolean;
  variant?: "danger";
  small?: boolean;
}

export default function AccountActions({ action, plan, email, licenseKey, activationToken, label, primary, variant, small }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      if (action === "checkout") {
        const res = await fetch("/api/license/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, plan }),
        });
        const data = await res.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          alert(data.error || "Failed to create checkout session");
        }
      } else if (action === "portal") {
        const res = await fetch("/api/license/portal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ licenseKey }),
        });
        const data = await res.json();
        if (data.portalUrl) {
          window.location.href = data.portalUrl;
        } else {
          alert(data.error || "Failed to open portal");
        }
      } else if (action === "deactivate") {
        if (!confirm("Remove this device? It can be reactivated later.")) return;
        const res = await fetch("/api/license/manage", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ licenseKey, activationToken }),
        });
        const data = await res.json();
        if (data.success) {
          window.location.reload();
        } else {
          alert(data.error || "Failed to deactivate");
        }
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const baseClass = small
    ? "px-3 py-1 text-xs rounded-md font-medium"
    : "px-6 py-2.5 rounded-lg text-sm font-semibold";

  const colorClass = variant === "danger"
    ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
    : primary
      ? "bg-blue-600 hover:bg-blue-500 text-white"
      : "bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700";

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${baseClass} ${colorClass} transition-all disabled:opacity-50`}
    >
      {loading ? "..." : label}
    </button>
  );
}
