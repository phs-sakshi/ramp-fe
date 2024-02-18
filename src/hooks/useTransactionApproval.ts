import { useCallback } from "react"
import { useCustomFetch } from "./useCustomFetch"

export function useTransactionApproval(): {
  setTransactionApproval: (transactionId: string, value: boolean) => void
} {
  const { fetchWithoutCache, clearCache } = useCustomFetch()

  const setTransactionApproval = useCallback(
    async (transactionId: string, value: boolean) => {
      try {
        await clearCache()
        await fetchWithoutCache<void, { transactionId: string; value: boolean }>(
          "setTransactionApproval",
          {
            transactionId,
            value,
          }
        )
      } catch (error) {
        console.error("Error setting transaction approval:", error)
      }
    },
    [fetchWithoutCache, clearCache]
  )

  return { setTransactionApproval }
}
