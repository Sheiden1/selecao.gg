import { createClient } from '@supabase/supabase-js'

export function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Variáveis de ambiente do Supabase não configuradas')
  }

  return createClient(supabaseUrl, supabaseKey)
}

export type Pedido = {
  id?: string
  cliente: string
  camisa: string
  numero: string
  tamanho: string
  pagamento: 'pago' | 'pendente'
  status: 'aguardando' | 'em_producao' | 'pronto' | 'entregue'
  criado_em?: string
}
