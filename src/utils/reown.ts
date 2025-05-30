// utils/reown.ts
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { xrplevmTestnet } from '@reown/appkit/networks'
import { createStorage, cookieStorage } from '@wagmi/core'

// 1) Wagmi adapter for Reown
export const wagmiAdapter = new WagmiAdapter({
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!,
  networks: [xrplevmTestnet],
  storage: createStorage({ storage: cookieStorage }),
})

// 2) Instantiate the modal & hooks
export const appKitModal = createAppKit({
  adapters: [wagmiAdapter],
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!,
  networks: [xrplevmTestnet],
  defaultNetwork: xrplevmTestnet,
})
