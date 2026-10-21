import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

function getRequiredEnv(name: 'VITE_SUPABASE_URL' | 'VITE_SUPABASE_PUBLISHABLE_KEY') {
  const value = import.meta.env[name]?.trim()

  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}. Configurá .env.local y reiniciá Vite.`)
  }

  return value
}

const supabaseUrl = getRequiredEnv('VITE_SUPABASE_URL')
const supabasePublishableKey = getRequiredEnv('VITE_SUPABASE_PUBLISHABLE_KEY')

try {
  new URL(supabaseUrl)
} catch {
  throw new Error('VITE_SUPABASE_URL no contiene una URL válida.')
}

export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
})
