// global.d.ts
import type { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider & {
      providers?: MetaMaskInpageProvider[]
      detected?: MetaMaskInpageProvider[]
    }
  }
}
