// components/Nav.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Nav() {
  const router = useRouter();
  return (
    <header className="w-full flex items-center justify-center py-2" style={{ background: "none" }}>
      <button
        type="button"
        onClick={() => router.push("/")}
        className="focus:outline-none w-full"
        aria-label="Go to home"
      >
        <div className="w-full flex items-center justify-center">
          <Image
            src="/assets/XRPLEVM_FullWhiteLogo.png"
            alt="XRPL EVM logo"
            width={0}
            height={0}
            sizes="30vw"
            style={{ width: "30vw", maxWidth: "30vw", height: "auto" }}
            priority
          />
        </div>
      </button>
    </header>
  );
}
