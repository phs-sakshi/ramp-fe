import { useCallback, useState } from "react"
import { Employee } from "../utils/types"
import { useCustomFetch } from "./useCustomFetch"
import { EmployeeResult } from "./types"

export function useEmployees(): EmployeeResult {
  const { fetchWithCache, loading } = useCustomFetch()
  const [employees, setEmployees] = useState<Employee[] | null>(null)
  const [nextPage, setNextPage] = useState<number | null>(0)
  const fetchAll = useCallback(async () => {
    const employeesData = await fetchWithCache<Employee[]>("employees")
    setEmployees(employeesData)
    setNextPage(0)
  }, [fetchWithCache])

  const invalidateData = useCallback(() => {
    setEmployees(null)
    setNextPage(0)
  }, [])

  return { data: employees, loading, fetchAll, invalidateData, nextPage }
}
