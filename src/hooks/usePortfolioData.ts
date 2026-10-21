import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchPortfolioData, type PortfolioData } from '../services/portfolioService'

export type RemoteStatus = 'loading' | 'success' | 'error'

interface PortfolioState {
  data: PortfolioData | null
  status: RemoteStatus
  error: string | null
}

export function usePortfolioData() {
  const [state, setState] = useState<PortfolioState>({
    data: null,
    status: 'loading',
    error: null,
  })
  const requestId = useRef(0)

  const load = useCallback(async (forceRefresh = false) => {
    const currentRequest = ++requestId.current

    await Promise.resolve()

    if (currentRequest !== requestId.current) {
      return
    }

    setState((current) => ({ ...current, status: 'loading', error: null }))

    try {
      const data = await fetchPortfolioData(forceRefresh)

      if (currentRequest !== requestId.current) {
        return
      }

      setState({ data, status: 'success', error: null })
    } catch (error) {
      if (currentRequest !== requestId.current) {
        return
      }

      setState({
        data: null,
        status: 'error',
        error: error instanceof Error ? error.message : 'Ocurrió un error inesperado al cargar el portfolio.',
      })
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load()
    }, 0)

    return () => {
      window.clearTimeout(timer)
      requestId.current += 1
    }
  }, [load])

  return {
    ...state,
    retry: () => load(true),
  }
}
