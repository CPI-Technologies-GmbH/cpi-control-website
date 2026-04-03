import type { Metadata } from "next";
import { signIn } from "@/lib/auth";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your CPI-Control account to manage your license, billing, and subscription.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center p-6">
      <div className="max-w-sm w-full text-center">
        <Image src="/app-icon.png" alt="CPI-Control" width={64} height={64} className="mx-auto mb-6 rounded-xl" />
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Sign in to CPI-Control</h1>
        <p className="text-gray-400 text-sm mb-8">Manage your license, billing, and account.</p>
        <form
          action={async () => {
            "use server";
            await signIn("cpi-auth", { redirectTo: "/account" });
          }}
        >
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-blue-600/25"
          >
            Continue with CPI Auth
          </button>
        </form>
        <p className="text-xs text-gray-600 mt-6">
          Don&apos;t have an account? One will be created automatically.
        </p>
      </div>
    </div>
  );
}
