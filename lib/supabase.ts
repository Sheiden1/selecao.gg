import { createClient } from '@supabase/supabase-js'

export function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const supabaseKey = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  )?.trim()

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Variaveis de ambiente do Supabase nao configuradas. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY (ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY).'
    )
  }

  return createClient(supabaseUrl, supabaseKey)
}

export type Pedido = {
  id?: string
  cliente: string
  camisa: string
  numero: string
  tamanho: string
  observacoes?: string | null
  pagamento: 'pago' | 'pendente'
  status: 'aguardando' | 'em_producao' | 'pronto' | 'entregue'
  criado_em?: string
}
