import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

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
