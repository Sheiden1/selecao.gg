import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL_ENV_KEYS = ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_URL'] as const
const SUPABASE_KEY_ENV_KEYS = [
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'SUPABASE_PUBLISHABLE_DEFAULT_KEY',
  'SUPABASE_PUBLISHABLE_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_ANON_KEY',
] as const

function readEnv(name: string) {
  const value = process.env[name]?.trim()

  if (!value) {
    return null
  }

  const normalized = value.toLowerCase()
  if (
    normalized === 'your_supabase_url' ||
    normalized === 'your_supabase_key' ||
    normalized === 'your_anon_key' ||
    normalized === 'your_publishable_key'
  ) {
    return null
  }

  return value
}

function resolveEnvValue(keys: readonly string[]) {
  for (const key of keys) {
    const value = readEnv(key)

    if (value) {
      return value
    }
  }

  return null
}

export function getSupabase() {
  const supabaseUrl = resolveEnvValue(SUPABASE_URL_ENV_KEYS)
  const supabaseKey = resolveEnvValue(SUPABASE_KEY_ENV_KEYS)

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Variaveis de ambiente do Supabase nao configuradas. Defina NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_URL, junto com uma chave valida em NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_PUBLISHABLE_DEFAULT_KEY, SUPABASE_PUBLISHABLE_KEY ou SUPABASE_ANON_KEY.'
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

const PAYMENT_VALUES = new Set<Pedido['pagamento']>(['pago', 'pendente'])
const STATUS_VALUES = new Set<Pedido['status']>(['aguardando', 'em_producao', 'pronto', 'entregue'])

function normalizeText(value: unknown, field: string) {
  if (typeof value !== 'string') {
    throw new Error(`Campo invalido: ${field}`)
  }

  const normalized = value.trim()

  if (!normalized) {
    throw new Error(`Campo obrigatorio: ${field}`)
  }

  return normalized
}

function normalizeOptionalText(value: unknown) {
  if (value == null) {
    return null
  }

  if (typeof value !== 'string') {
    throw new Error('Campo invalido: observacoes')
  }

  const normalized = value.trim()
  return normalized || null
}

function normalizeToken(value: unknown, field: string) {
  const normalized = normalizeText(value, field)

  return normalized
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function normalizePagamento(value: unknown) {
  const normalized = normalizeToken(value, 'pagamento')

  if (PAYMENT_VALUES.has(normalized as Pedido['pagamento'])) {
    return normalized as Pedido['pagamento']
  }

  if (normalized.startsWith('pag')) {
    return 'pago'
  }

  if (normalized.startsWith('pend')) {
    return 'pendente'
  }

  throw new Error('Campo invalido: pagamento')
}

function normalizeStatus(value: unknown) {
  const normalized = normalizeToken(value, 'status')

  if (STATUS_VALUES.has(normalized as Pedido['status'])) {
    return normalized as Pedido['status']
  }

  if (normalized.startsWith('agu')) {
    return 'aguardando'
  }

  if (normalized.includes('prod')) {
    return 'em_producao'
  }

  if (normalized.startsWith('pront')) {
    return 'pronto'
  }

  if (normalized.startsWith('entreg')) {
    return 'entregue'
  }

  throw new Error('Campo invalido: status')
}

function normalizeCriadoEm(value: unknown) {
  if (value == null || value === '') {
    return undefined
  }

  if (typeof value !== 'string') {
    throw new Error('Campo invalido: criado_em')
  }

  const normalized = value.trim()

  if (!normalized) {
    return undefined
  }

  const brDateMatch = normalized.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (brDateMatch) {
    const [, day, month, year] = brDateMatch
    return `${year}-${month}-${day}T00:00:00`
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return `${normalized}T00:00:00`
  }

  if (!Number.isNaN(Date.parse(normalized))) {
    return normalized
  }

  throw new Error('Campo invalido: criado_em')
}

export function parsePedido(input: unknown): Pedido {
  const body = (input ?? {}) as Record<string, unknown>
  const criadoEm = normalizeCriadoEm(body.criado_em)

  return {
    cliente: normalizeText(body.cliente, 'cliente'),
    camisa: normalizeText(body.camisa, 'camisa'),
    numero: normalizeText(body.numero, 'numero'),
    tamanho: normalizeText(body.tamanho, 'tamanho'),
    observacoes: normalizeOptionalText(body.observacoes),
    pagamento: normalizePagamento(body.pagamento),
    status: normalizeStatus(body.status),
    ...(criadoEm ? { criado_em: criadoEm } : {}),
  }
}

export function parsePedidoUpdate(input: unknown): Partial<Pedido> {
  const body = (input ?? {}) as Record<string, unknown>
  const updates: Partial<Pedido> = {}

  if (Object.prototype.hasOwnProperty.call(body, 'cliente')) {
    updates.cliente = normalizeText(body.cliente, 'cliente')
  }

  if (Object.prototype.hasOwnProperty.call(body, 'camisa')) {
    updates.camisa = normalizeText(body.camisa, 'camisa')
  }

  if (Object.prototype.hasOwnProperty.call(body, 'numero')) {
    updates.numero = normalizeText(body.numero, 'numero')
  }

  if (Object.prototype.hasOwnProperty.call(body, 'tamanho')) {
    updates.tamanho = normalizeText(body.tamanho, 'tamanho')
  }

  if (Object.prototype.hasOwnProperty.call(body, 'observacoes')) {
    updates.observacoes = normalizeOptionalText(body.observacoes)
  }

  if (Object.prototype.hasOwnProperty.call(body, 'pagamento')) {
    updates.pagamento = normalizePagamento(body.pagamento)
  }

  if (Object.prototype.hasOwnProperty.call(body, 'status')) {
    updates.status = normalizeStatus(body.status)
  }

  if (Object.prototype.hasOwnProperty.call(body, 'criado_em')) {
    const criadoEm = normalizeCriadoEm(body.criado_em)

    if (criadoEm) {
      updates.criado_em = criadoEm
    }
  }

  return updates
}

export function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  if (typeof error === 'object' && error !== null) {
    const message = 'message' in error && typeof error.message === 'string' ? error.message : null
    const details = 'details' in error && typeof error.details === 'string' ? error.details : null
    const hint = 'hint' in error && typeof error.hint === 'string' ? error.hint : null

    return [message, details, hint].filter(Boolean).join(' | ') || fallback
  }

  return fallback
}

export function isInputError(error: unknown) {
  const message = getErrorMessage(error, '')
  return message.startsWith('Campo invalido:') || message.startsWith('Campo obrigatorio:')
}
