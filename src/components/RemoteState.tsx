import type { ReactNode } from 'react'
import { EmptyState } from './EmptyState'
import type { RemoteStatus } from '../hooks/usePortfolioData'

interface RemoteStateProps {
  status: RemoteStatus
  error: string | null
  hasData: boolean
  emptyTitle: string
  emptyDescription: string
  onRetry: () => void
  children: ReactNode
}

export function RemoteState({
  status,
  error,
  hasData,
  emptyTitle,
  emptyDescription,
  onRetry,
  children,
}: RemoteStateProps) {
  if (status === 'loading') {
    return (
      <div className="remote-state remote-state-loading" role="status" aria-live="polite">
        <span className="remote-state-spinner" aria-hidden="true" />
        <p>Cargando información desde Supabase…</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="remote-state remote-state-error" role="alert">
        <div>
          <h3>No se pudo cargar esta sección</h3>
          <p>{error ?? 'Ocurrió un error inesperado.'}</p>
        </div>
        <button className="button button-secondary" type="button" onClick={onRetry}>
          Reintentar
        </button>
      </div>
    )
  }

  if (!hasData) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return <>{children}</>
}
