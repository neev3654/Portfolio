import { createContext, useContext } from 'react'

export const PinnedContainerContext = createContext(null)

export function usePinnedContainer() {
  return useContext(PinnedContainerContext)
}
