// components/Nav.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Nav() {
  const router = useRouter();
  return (
    <header className="h-100 flex items-center justify-center bg-black shadow">
      <button
        type="button"
        onClick={() => router.push("/")}
        className="focus:outline-none"
        aria-label="Go to home"
      >
        <Image
          src="/assets/XRPLEVM_WhiteLogo.png"
          alt="1X2 logo"
          width={150}
          height={30}
          priority
        />
      </button>
    </header>
  );
}
