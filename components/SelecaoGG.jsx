'use client'

import { useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Toast from '@radix-ui/react-toast'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Tooltip from '@radix-ui/react-tooltip'
import {
  Check,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  ClipboardList,
  LogOut,
  MoreHorizontal,
  Package,
  PackageCheck,
  Save,
  Search,
  ShieldAlert,
  Trash2,
  X,
} from 'lucide-react'

const SURFACE = 'bg-[#0f1a0f] border border-[#1a2e1a] rounded-md'
const TEXT_INPUT =
  'h-10 w-full rounded-md border border-[#1a2e1a] bg-[#080c08] px-3 text-sm text-[#f0fdf4] outline-none placeholder:text-[#374151] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30'
const LOGIN_INPUT =
  'h-11 w-full rounded-md border border-[#1a2e1a] bg-[#0f1a0f] px-3 text-sm text-[#f0fdf4] outline-none placeholder:text-[#374151] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30'
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'selecao2026'

const sizes = ['PP', 'P', 'M', 'G', 'GG', 'XGG']
const payStatuses = ['Pendente', 'Pago']
const orderStatuses = ['Aguardando', 'Em produção', 'Pronto', 'Entregue']
const paymentLabelMap = { pendente: 'Pendente', pago: 'Pago' }
const paymentValueMap = { Pendente: 'pendente', Pago: 'pago' }
const orderStatusLabelMap = {
  aguardando: 'Aguardando',
  em_producao: 'Em produção',
  pronto: 'Pronto',
  entregue: 'Entregue',
}
const orderStatusValueMap = {
  Aguardando: 'aguardando',
  'Em produção': 'em_producao',
  Pronto: 'pronto',
  Entregue: 'entregue',
}

const fontStyles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@500;600;700&display=swap');
.sgg-heading{font-family:'Syne',sans-serif}
.sgg-mono{font-family:'DM Mono',monospace;font-variant-numeric:tabular-nums}
.sgg-shell{
  background-color:#080c08;
  background-image:linear-gradient(rgba(34,197,94,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.06) 1px, transparent 1px);
  background-size:28px 28px;
}
.sgg-fade-in{animation:fadeInUp .32s ease-out both}
@keyframes fadeInUp{
  from{opacity:0;transform:translateY(8px)}
  to{opacity:1;transform:translateY(0)}
}
`

function money(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function shortDate(value) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(new Date(`${value}T00:00:00`))
}

function dateTime(value) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function orderPrice(order) {
  const base = { PP: 249, P: 259, M: 269, G: 279, GG: 289, XGG: 299 }[order.size] ?? 269
  return base + 34
}

function daysAgoLabel(value) {
  const target = new Date(`${value}T00:00:00`)
  const today = new Date()
  target.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const diff = Math.max(0, Math.floor((today.getTime() - target.getTime()) / 86400000))

  if (diff === 1) return 'há 1 dia'
  return `há ${diff} dias`
}

function fullDateLabel(value) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}

function badgeClass(type, value) {
  const base =
    'inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.24em]'
  const map = type === 'pay'
    ? {
        Pendente: 'border-[#3f1f23] bg-[#1b1113] text-[#fca5a5]',
        Pago: 'border-[#1a3a23] bg-[#0f1f14] text-[#86efac]',
      }
    : {
        Aguardando: 'border-[#2a332a] bg-[#111611] text-[#9ca3af]',
        'Em produção': 'border-[#3a3016] bg-[#171309] text-[#fcd34d]',
        Pronto: 'border-[#1a3a23] bg-[#0f1f14] text-[#86efac]',
        Entregue: 'border-[#17342a] bg-[#0d1914] text-[#6ee7b7]',
      }

  return `${base} ${map[value]}`
}

function statusBadgeClass(type, value) {
  const base =
    'inline-flex items-center rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.24em]'
  const map = type === 'pay'
    ? {
        Pendente: 'bg-red-950/40 text-red-400',
        Pago: 'bg-green-950/40 text-green-400',
      }
    : {
        Aguardando: 'bg-zinc-800/40 text-zinc-400',
        'Em produção': 'bg-amber-950/40 text-amber-400',
        Pronto: 'bg-sky-950/40 text-sky-400',
        Entregue: 'bg-green-950/40 text-green-400',
      }

  return `${base} ${map[value]}`
}

function sortValue(order, key) {
  switch (key) {
    case 'number':
      return order.number.toLowerCase()
    case 'client':
      return order.client.toLowerCase()
    case 'shirt':
      return `${order.shirtName} ${order.shirtNumber}`.toLowerCase()
    case 'size':
      return sizes.indexOf(order.size)
    case 'payStatus':
      return payStatuses.indexOf(order.payStatus)
    case 'orderStatus':
      return orderStatuses.indexOf(order.orderStatus)
    case 'date':
      return new Date(`${order.date}T00:00:00`).getTime()
    default:
      return ''
  }
}

function createNextDraft() {
  return {
    client: '',
    shirtName: '',
    shirtNumber: '',
    size: 'M',
    payStatus: 'Pendente',
    orderStatus: 'Aguardando',
    date: new Date().toISOString().slice(0, 10),
    notes: '',
    history: [],
  }
}

function orderNumberLabel(id) {
  const normalized = String(id ?? '')
    .replace(/-/g, '')
    .toUpperCase()

  return `#${(normalized.slice(0, 6) || 'NOVO').padEnd(6, '0')}`
}

function normalizeOrder(order) {
  const createdAt = order.criado_em ?? new Date().toISOString()

  return {
    id: String(order.id ?? createdAt),
    number: orderNumberLabel(order.id ?? createdAt),
    client: order.cliente ?? '',
    shirtName: order.camisa ?? '',
    shirtNumber: order.numero ?? '',
    size: order.tamanho ?? 'M',
    payStatus: paymentLabelMap[order.pagamento] ?? 'Pendente',
    orderStatus: orderStatusLabelMap[order.status] ?? 'Aguardando',
    date: createdAt.slice(0, 10),
    createdAt,
    notes: '',
    history: [{ ts: createdAt, desc: 'Pedido criado' }],
  }
}

function buildPedidoPayload(order) {
  return {
    cliente: order.client.trim(),
    camisa: order.shirtName.trim().toUpperCase(),
    numero: order.shirtNumber.trim(),
    tamanho: order.size,
    pagamento: paymentValueMap[order.payStatus] ?? 'pendente',
    status: orderStatusValueMap[order.orderStatus] ?? 'aguardando',
    criado_em: order.date ? `${order.date}T00:00:00` : undefined,
  }
}

async function parseResponse(response) {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    cache: 'no-store',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  })
  const payload = await parseResponse(response)

  if (!response.ok) {
    throw new Error(payload?.error ?? 'Erro ao processar a requisição')
  }

  return payload
}

const pricingMargins = [
  { label: '30%', value: 0.3 },
  { label: '40%', value: 0.4 },
  { label: '50%', value: 0.5 },
]

const pricingProducts = [
  { id: 'torcedor', label: 'Torcedor', supplierUsd: 10 },
  { id: 'jogador', label: 'Jogador', supplierUsd: 15 },
  { id: 'retro', label: 'Retrô', supplierUsd: 15 },
]

const pricingGroups = [
  {
    id: 'avulso',
    badge: 'Avulso',
    title: 'PEÇA AVULSA — R$ 150 RECEITA FEDERAL POR PEDIDO',
    shippingUsd: 4,
    federalTaxBrl: 150,
    taxLabel: 'R$ 150,00',
    note: 'Frete avulso: US$ 4.00 por peça',
  },
  {
    id: 'kit',
    badge: 'Kit',
    title: 'KIT 4+ PEÇAS — FRETE GRÁTIS, TAXA DILUÍDA',
    shippingUsd: 0,
    federalTaxBrl: 37.5,
    taxLabel: 'R$ 37,50 (+4)',
    note: 'Frete kit: grátis a partir de 4 peças',
  },
]

function usd(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

function brl(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function parseExchangeRate(value) {
  const parsed = Number.parseFloat(String(value).replace(',', '.'))
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

function pricingCard(product, group, exchangeRate, margin, personalized) {
  const supplierUsd = product.supplierUsd + (personalized ? 3 : 0)
  const supplierBrl = supplierUsd * exchangeRate
  const shippingBrl = group.shippingUsd * exchangeRate
  const totalCost = supplierBrl + shippingBrl + group.federalTaxBrl
  const salePrice = margin >= 1 ? totalCost : totalCost / (1 - margin)
  const profit = salePrice - totalCost

  return {
    supplierUsd,
    supplierBrl,
    shippingUsd: group.shippingUsd,
    shippingBrl,
    federalTaxBrl: group.federalTaxBrl,
    totalCost,
    salePrice,
    profit,
  }
}

function saveTimeLabel(value) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(value))
}

function TerminalSelect({ value, onValueChange, options, placeholder, width = 'w-full' }) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className={`${TEXT_INPUT} ${width} inline-flex items-center justify-between gap-2`}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="h-4 w-4 text-[#6b7280]" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-50 overflow-hidden rounded-md border border-[#1a2e1a] bg-[#0f1a0f] text-[#f0fdf4] shadow-2xl">
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option}
                value={option}
                className="relative flex cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-3 text-sm outline-none data-[highlighted]:bg-[#122312] data-[highlighted]:text-white"
              >
                <span className="absolute left-2">
                  <Select.ItemIndicator>
                    <Check className="h-4 w-4 text-[#22c55e]" />
                  </Select.ItemIndicator>
                </span>
                <Select.ItemText>{option}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

function RowStatusSelect({ value, onValueChange }) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className={`inline-flex h-7 items-center gap-1 rounded-full px-2 outline-none ${statusBadgeClass('order', value)}`}>
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="h-3.5 w-3.5" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-50 overflow-hidden rounded-md border border-[#1a2e1a] bg-[#0f1a0f] text-[#f0fdf4] shadow-2xl">
          <Select.Viewport className="p-1">
            {orderStatuses.map((option) => (
              <Select.Item
                key={option}
                value={option}
                className="relative flex cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-3 text-sm outline-none data-[highlighted]:bg-[#122312] data-[highlighted]:text-white"
              >
                <span className="absolute left-2">
                  <Select.ItemIndicator>
                    <Check className="h-4 w-4 text-[#22c55e]" />
                  </Select.ItemIndicator>
                </span>
                <Select.ItemText>{option}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default function SelecaoGG() {
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('pedidos')
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [search, setSearch] = useState('')
  const [payFilter, setPayFilter] = useState('Todos')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [detailId, setDetailId] = useState(null)
  const [detailDraft, setDetailDraft] = useState(null)
  const [newOrder, setNewOrder] = useState(() => createNextDraft())
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [clearDataOpen, setClearDataOpen] = useState(false)
  const [savedAt, setSavedAt] = useState(null)
  const [toast, setToast] = useState({ open: false, title: '', message: '', key: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const [selectedMargin, setSelectedMargin] = useState(0.4)
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true)
  const [selectedQuantityMode, setSelectedQuantityMode] = useState('kit')
  const [exchangeRateInput, setExchangeRateInput] = useState('5.23')
  const firstFieldRef = useRef(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'SELECAO.GG — Pedidos'

    return () => {
      document.title = previousTitle
    }
  }, [])

  useEffect(() => {
    function handleKeydown(event) {
      if (!event.ctrlKey || event.key.toLowerCase() !== 'n') return

      event.preventDefault()
      firstFieldRef.current?.focus()
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  useEffect(() => {
    if (!detailId) return
    if (orders.some((order) => order.id === detailId)) return

    setDetailId(null)
    setDetailDraft(null)
  }, [detailId, orders])

  const selectedOrder = orders.find((order) => order.id === detailId) ?? null
  const exchangeRate = parseExchangeRate(exchangeRateInput)
  const query = search.trim().toLowerCase()
  const filtered = orders.filter((order) => {
    const searchMatch =
      !query ||
      order.client.toLowerCase().includes(query) ||
      order.number.toLowerCase().includes(query)
    const payMatch = payFilter === 'Todos' || order.payStatus === payFilter
    const statusMatch = statusFilter === 'Todos' || order.orderStatus === statusFilter
    return searchMatch && payMatch && statusMatch
  })
  const visibleOrders = [...filtered].sort((left, right) => {
    const leftValue = sortValue(left, sortConfig.key)
    const rightValue = sortValue(right, sortConfig.key)

    if (leftValue < rightValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (leftValue > rightValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const summary = {
    total: orders.length,
    pending: orders.filter((order) => order.payStatus === 'Pendente').length,
    ready: orders.filter((order) => order.orderStatus === 'Pronto').length,
    revenue: orders.filter((order) => order.payStatus === 'Pago').reduce((sum, order) => sum + orderPrice(order), 0),
  }
  const orderedPricingGroups = selectedQuantityMode === 'kit'
    ? [pricingGroups[1], pricingGroups[0]]
    : [pricingGroups[0], pricingGroups[1]]

  function notify(title, message) {
    setToast({ open: false, title, message, key: Date.now() })
    requestAnimationFrame(() => setToast((current) => ({ ...current, open: true })))
  }

  async function fetchOrders(showLoading = true) {
    try {
      if (showLoading) {
        setIsLoading(true)
      }

      const data = await requestJson('/api/pedidos')
      setOrders(Array.isArray(data) ? data.map(normalizeOrder) : [])
      setSavedAt(new Date().toISOString())
    } catch (error) {
      notify('ERROR', error instanceof Error ? error.message : 'Falha ao carregar pedidos')
    } finally {
      if (showLoading) {
        setIsLoading(false)
      }
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
    } finally {
      window.location.href = '/admin/login'
    }
  }

  function handleLoginChange(event) {
    const { name, value } = event.target
    setLoginForm((current) => ({ ...current, [name]: value }))
    if (loginError) {
      setLoginError('')
    }
  }

  function handleLoginSubmit(event) {
    event.preventDefault()

    if (
      loginForm.username.trim() === ADMIN_USERNAME &&
      loginForm.password === ADMIN_PASSWORD
    ) {
      return
    }

    setLoginError('Credenciais inválidas')
  }

  function openDetails(order) {
    setDetailId(order.id)
    setDetailDraft({
      payStatus: order.payStatus,
      orderStatus: order.orderStatus,
      notes: order.notes,
    })
  }

  async function saveDetails() {
    if (!selectedOrder || !detailDraft) return

    try {
      setIsMutating(true)
      await requestJson(`/api/pedidos/${selectedOrder.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          pagamento: paymentValueMap[detailDraft.payStatus],
          status: orderStatusValueMap[detailDraft.orderStatus],
        }),
      })
      await fetchOrders(false)
      setDetailId(null)
      setDetailDraft(null)
      notify('ORDER UPDATED', `${selectedOrder.number} synchronized`)
    } catch (error) {
      notify('ERROR', error instanceof Error ? error.message : 'Falha ao atualizar pedido')
    } finally {
      setIsMutating(false)
    }
  }

  async function togglePayment(order) {
    const next = order.payStatus === 'Pago' ? 'Pendente' : 'Pago'

    try {
      setIsMutating(true)
      await requestJson(`/api/pedidos/${order.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          pagamento: paymentValueMap[next],
        }),
      })
      await fetchOrders(false)
      notify('PAYMENT UPDATED', `${order.number} -> ${next}`)
    } catch (error) {
      notify('ERROR', error instanceof Error ? error.message : 'Falha ao atualizar pagamento')
    } finally {
      setIsMutating(false)
    }
  }

  async function updateRowStatus(order, next) {
    try {
      setIsMutating(true)
      await requestJson(`/api/pedidos/${order.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: orderStatusValueMap[next],
        }),
      })
      await fetchOrders(false)
      notify('STATUS UPDATED', `${order.number} -> ${next}`)
    } catch (error) {
      notify('ERROR', error instanceof Error ? error.message : 'Falha ao atualizar status')
    } finally {
      setIsMutating(false)
    }
  }

  async function createOrder() {
    if (!newOrder.client.trim() || !newOrder.shirtName.trim() || !newOrder.shirtNumber.trim()) {
      notify('ERROR', 'Preencha cliente, nome e número da camisa')
      return
    }

    try {
      setIsMutating(true)
      await requestJson('/api/pedidos', {
        method: 'POST',
        body: JSON.stringify(buildPedidoPayload(newOrder)),
      })
      await fetchOrders(false)
      setNewOrder(createNextDraft())
      notify('ORDER CREATED', 'Pedido cadastrado com sucesso')
    } catch (error) {
      notify('ERROR', error instanceof Error ? error.message : 'Falha ao criar pedido')
    } finally {
      setIsMutating(false)
    }
  }

  async function removeOrder() {
    if (!deleteTarget) return

    try {
      setIsMutating(true)
      await requestJson(`/api/pedidos/${deleteTarget.id}`, {
        method: 'DELETE',
      })
      await fetchOrders(false)
      setDeleteTarget(null)
      notify('ORDER REMOVED', 'Record deleted from panel')
    } catch (error) {
      notify('ERROR', error instanceof Error ? error.message : 'Falha ao remover pedido')
    } finally {
      setIsMutating(false)
    }
  }

  async function clearAllData() {
    if (orders.length === 0) {
      setClearDataOpen(false)
      return
    }

    try {
      setIsMutating(true)

      for (const order of orders) {
        await requestJson(`/api/pedidos/${order.id}`, {
          method: 'DELETE',
        })
      }

      await fetchOrders(false)
      setNewOrder(createNextDraft())
      setDetailId(null)
      setDetailDraft(null)
      setDeleteTarget(null)
      setClearDataOpen(false)
      notify('DADOS', 'Dados removidos.')
    } catch (error) {
      notify('ERROR', error instanceof Error ? error.message : 'Falha ao limpar pedidos')
    } finally {
      setIsMutating(false)
    }
  }

  function toggleSort(key) {
    setSortConfig((current) =>
      current.key === key
        ? { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: key === 'date' ? 'desc' : 'asc' }
    )
  }

  function exportCsv() {
    const headers = ['Pedido', 'Cliente', 'Camisa', 'Numero', 'Tamanho', 'Pagamento', 'Status', 'Data', 'Notas']
    const rows = visibleOrders.map((order) => [
      order.number,
      order.client,
      order.shirtName,
      order.shirtNumber,
      order.size,
      order.payStatus,
      order.orderStatus,
      order.date,
      order.notes,
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(';'))
      .join('\n')

    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'selecao-gg-pedidos.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  function resetFilters() {
    setSearch('')
    setPayFilter('Todos')
    setStatusFilter('Todos')
  }

  function resetNewOrder() {
    setNewOrder(createNextDraft())
  }

  return (
    <Tooltip.Provider delayDuration={120}>
      <Toast.Provider swipeDirection="right">
        <div className="sgg-shell min-h-screen text-[#f0fdf4]">
          <style>{fontStyles}</style>
          {false ? (
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="w-full max-w-[380px] rounded-md border border-[#1a2e1a] bg-[#0f1a0f] p-6 shadow-2xl">
                <div className="text-center">
                  <h1 className="sgg-heading text-3xl font-bold uppercase tracking-[0.14em] text-[#f0fdf4]">
                    SELECAO.GG
                  </h1>
                  <p className="sgg-mono mt-2 text-xs uppercase tracking-[0.24em] text-[#6b7280]">
                    painel administrativo
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="mt-8 space-y-4">
                  <div>
                    <label className="sgg-mono mb-2 block text-[11px] uppercase tracking-[0.22em] text-[#6b7280]">
                      Usuário
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={loginForm.username}
                      onChange={handleLoginChange}
                      className={LOGIN_INPUT}
                      autoComplete="username"
                    />
                  </div>

                  <div>
                    <label className="sgg-mono mb-2 block text-[11px] uppercase tracking-[0.22em] text-[#6b7280]">
                      Senha
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      className={LOGIN_INPUT}
                      autoComplete="current-password"
                    />
                  </div>

                  {loginError ? (
                    <p className="sgg-mono text-sm text-red-400">{loginError}</p>
                  ) : null}

                  <button
                    type="submit"
                    className="sgg-mono inline-flex h-11 w-full items-center justify-center rounded-md bg-green-600 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-green-500"
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </div>
          ) : (
          <>
          <header className="fixed inset-x-0 top-0 z-40 h-14 border-b border-[#1a2e1a] bg-[#080c08]/90 backdrop-blur-sm">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
              <div className="flex items-baseline gap-2">
                <h1 className="sgg-heading text-xl font-bold uppercase tracking-[0.14em] text-[#f0fdf4]">
                  SELECAO.GG
                </h1>
                <span className="sgg-mono text-xs uppercase tracking-[0.18em] text-[#6b7280]">
                  / {activeTab === 'pedidos' ? 'pedidos' : 'preços'}
                </span>
              </div>

              <DropdownMenu.Root>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <DropdownMenu.Trigger asChild>
                      <button
                        aria-label="Abrir menu"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#1a2e1a] bg-[#0f1a0f] text-[#6b7280] transition hover:border-[#22c55e] hover:text-[#22c55e]"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenu.Trigger>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content sideOffset={8} className="rounded-md border border-[#1a2e1a] bg-[#0f1a0f] px-2 py-1 text-xs text-[#f0fdf4]">
                      Menu
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content align="end" className="z-50 min-w-[140px] rounded-md border border-[#1a2e1a] bg-[#0f1a0f] p-1 text-sm text-[#f0fdf4] shadow-2xl">
                    <DropdownMenu.Item
                      onClick={handleLogout}
                      className="sgg-mono flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-xs uppercase tracking-[0.22em] outline-none hover:bg-[#122312]"
                    >
                      <LogOut className="h-4 w-4 text-[#22c55e]" />
                      Sair
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </header>

          <div className="sgg-fade-in mx-auto max-w-7xl px-4 pb-6 pt-[72px] sm:px-6">
            <section className="mb-4 flex flex-wrap items-center gap-2">
              {[
                ['pedidos', 'Pedidos', ClipboardList],
                ['precos', 'Preços', CircleDollarSign],
              ].map(([tabId, label, Icon]) => (
                <button
                  key={tabId}
                  type="button"
                  onClick={() => setActiveTab(tabId)}
                  className={`sgg-mono inline-flex h-10 items-center gap-2 rounded-md border px-4 text-[11px] uppercase tracking-[0.2em] transition ${
                    activeTab === tabId
                      ? 'border-[#22c55e] bg-[#103114] text-[#f0fdf4]'
                      : 'border-[#1a2e1a] bg-[#0f1a0f] text-[#6b7280] hover:border-[#22c55e] hover:text-[#22c55e]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
              <div className="sgg-mono ml-auto text-xs uppercase tracking-[0.18em] text-[#6b7280]">
                {activeTab === 'pedidos' ? 'painel operacional' : 'calculadora de margem'}
              </div>
            </section>

            {activeTab === 'pedidos' ? (
            <>
            <section className="mb-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                ['PEDIDOS', summary.total, ClipboardList],
                ['PENDENTES', summary.pending, ShieldAlert],
                ['PRONTOS', summary.ready, PackageCheck],
                ['RECEITA', money(summary.revenue), CircleDollarSign],
              ].map(([label, value, Icon]) => (
                <div key={label} className={`${SURFACE} flex h-20 items-center justify-between border-l-2 border-l-green-600 px-4 py-3`}>
                  <div>
                    <div className="sgg-mono text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">
                      {label}
                    </div>
                    <div className="sgg-mono mt-2 text-2xl font-bold text-[#f0fdf4]">
                      {value}
                    </div>
                  </div>
                  <Icon className="h-[18px] w-[18px] text-green-600" />
                </div>
              ))}
            </section>

            <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className={`${SURFACE} overflow-hidden`}>
                <div className="flex items-center justify-between border-b border-[#1a2e1a] px-4 py-3">
                  <h2 className="sgg-heading text-lg uppercase tracking-[0.12em]">Pedidos</h2>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="sgg-mono inline-flex h-8 items-center rounded-md border border-[#1a2e1a] px-3 text-[11px] uppercase tracking-[0.2em] text-[#6b7280] transition hover:border-[#22c55e] hover:text-[#22c55e]"
                  >
                    Limpar
                  </button>
                </div>

                <div className="border-b border-[#1a2e1a] px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="relative min-w-[220px] flex-1">
                      <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#374151]" />
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="buscar pedido..."
                        className={`${TEXT_INPUT} h-9 pl-10`}
                      />
                    </label>
                    <TerminalSelect
                      value={payFilter}
                      onValueChange={setPayFilter}
                      options={['Todos', ...payStatuses]}
                      placeholder="Status de pagamento"
                      width="w-[170px]"
                    />
                    <TerminalSelect
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                      options={['Todos', ...orderStatuses]}
                      placeholder="Status do pedido"
                      width="w-[190px]"
                    />
                    <button
                      type="button"
                      onClick={exportCsv}
                      className="sgg-mono inline-flex h-9 items-center rounded-md border border-[#1a2e1a] px-3 text-[11px] uppercase tracking-[0.2em] text-[#f0fdf4] transition hover:border-[#22c55e] hover:text-[#22c55e]"
                    >
                      Exportar CSV
                    </button>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <button
                          type="button"
                          onClick={() => setClearDataOpen(true)}
                          aria-label="Limpar dados"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#1a2e1a] text-[#6b7280] transition hover:border-[#f87171] hover:text-[#f87171]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content sideOffset={8} className="rounded-md border border-[#1a2e1a] bg-[#0f1a0f] px-2 py-1 text-xs text-[#f0fdf4]">
                          Limpar dados
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                    <div className="sgg-mono ml-auto text-xs uppercase tracking-[0.18em] text-[#6b7280]">
                      {visibleOrders.length} {visibleOrders.length === 1 ? 'pedido' : 'pedidos'}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-[980px] w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#1a2e1a] text-[10px] uppercase tracking-[0.24em] text-[#6b7280]">
                        {[
                          ['PEDIDO', 'number'],
                          ['CLIENTE', 'client'],
                          ['CAMISA', 'shirt'],
                          ['TAM', 'size'],
                          ['PAGAMENTO', 'payStatus'],
                          ['STATUS', 'orderStatus'],
                          ['DATA', 'date'],
                        ].map(([label, key]) => (
                          <th key={label} className="px-3 py-3 font-medium">
                            <button
                              type="button"
                              onClick={() => toggleSort(key)}
                              className="inline-flex items-center gap-1 transition hover:text-[#f0fdf4]"
                            >
                              <span>{label}</span>
                              {sortConfig.key === key ? (
                                sortConfig.direction === 'asc' ? (
                                  <ChevronUp className="h-3.5 w-3.5" />
                                ) : (
                                  <ChevronDown className="h-3.5 w-3.5" />
                                )
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5 opacity-30" />
                              )}
                            </button>
                          </th>
                        ))}
                        <th className="px-3 py-3 font-medium">─</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={8} className="px-3 py-12">
                            <div className="flex flex-col items-center justify-center gap-3 text-zinc-600">
                              <Package className="h-6 w-6 animate-pulse" />
                              <span className="sgg-mono text-xs uppercase tracking-[0.24em]">carregando pedidos</span>
                            </div>
                          </td>
                        </tr>
                      ) : visibleOrders.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-3 py-12">
                            <div className="flex flex-col items-center justify-center gap-3 text-zinc-600">
                              <Package className="h-6 w-6" />
                              <span className="sgg-mono text-xs uppercase tracking-[0.24em]">nenhum pedido</span>
                            </div>
                          </td>
                        </tr>
                      ) : visibleOrders.map((order) => (
                        <tr key={order.id} className="h-11 border-t border-[#1a2e1a] transition hover:bg-[#1a2e1a]/50">
                          <td className="sgg-mono px-3 py-2">
                            <button onClick={() => openDetails(order)} className="text-green-400 transition hover:text-green-300">
                              {order.number}
                            </button>
                          </td>
                          <td className="px-3 py-2">{order.client}</td>
                          <td className="px-3 py-2">
                            <span>{order.shirtName}</span>
                            <span className="sgg-mono text-[#6b7280]"> / {order.shirtNumber}</span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex justify-center">
                              <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-[#1a2e1a] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-300">
                                {order.size}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <button
                              type="button"
                              onClick={() => togglePayment(order)}
                              className={`${statusBadgeClass('pay', order.payStatus)} ${badgeClass('pay', order.payStatus) ? '' : ''}`}
                            >
                              {order.payStatus}
                            </button>
                          </td>
                          <td className="px-3 py-2">
                            <RowStatusSelect value={order.orderStatus} onValueChange={(value) => updateRowStatus(order, value)} />
                          </td>
                          <td className="px-3 py-2">
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <span className="sgg-mono cursor-default text-xs text-[#6b7280]">
                                  {daysAgoLabel(order.date)}
                                </span>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content sideOffset={8} className="rounded-md border border-[#1a2e1a] bg-[#0f1a0f] px-2 py-1 text-xs text-[#f0fdf4]">
                                  {fullDateLabel(order.date)}
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </td>
                          <td className="px-3 py-2 text-right">
                            <DropdownMenu.Root>
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <DropdownMenu.Trigger asChild>
                                    <button
                                      aria-label={`Ações de ${order.number}`}
                                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#1a2e1a] text-[#6b7280] transition hover:border-[#22c55e] hover:text-[#22c55e]"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                  </DropdownMenu.Trigger>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content sideOffset={8} className="rounded-md border border-[#1a2e1a] bg-[#0f1a0f] px-2 py-1 text-xs text-[#f0fdf4]">
                                    Ações
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                              <DropdownMenu.Portal>
                                <DropdownMenu.Content align="end" className="z-50 min-w-[180px] rounded-md border border-[#1a2e1a] bg-[#0f1a0f] p-1 text-sm text-[#f0fdf4] shadow-2xl">
                                  <DropdownMenu.Item onClick={() => openDetails(order)} className="cursor-pointer rounded-md px-3 py-2 outline-none hover:bg-[#122312]">Ver detalhes</DropdownMenu.Item>
                                  <DropdownMenu.Separator className="my-1 h-px bg-[#1a2e1a]" />
                                  <DropdownMenu.Item onClick={() => setDeleteTarget(order)} className="cursor-pointer rounded-md px-3 py-2 text-[#fda4af] outline-none hover:bg-[#221114]">Excluir</DropdownMenu.Item>
                                </DropdownMenu.Content>
                              </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={`${SURFACE} h-fit`}>
                <div className="flex items-center justify-between border-b border-[#1a2e1a] px-4 py-3">
                  <h2 className="sgg-heading text-lg uppercase tracking-[0.12em]">Novo Pedido</h2>
                  <button
                    type="button"
                    onClick={resetNewOrder}
                    className="sgg-mono inline-flex h-9 items-center rounded-md border border-[#1a2e1a] px-3 text-[11px] uppercase tracking-[0.2em] text-[#6b7280] transition hover:border-[#22c55e] hover:text-[#22c55e]"
                  >
                    Limpar
                  </button>
                </div>

                <div className="grid gap-3 p-4">
                  <input ref={firstFieldRef} className={TEXT_INPUT} placeholder="Cliente" value={newOrder.client} onChange={(e) => setNewOrder((c) => ({ ...c, client: e.target.value }))} />
                  <input className={TEXT_INPUT} placeholder="Nome na camisa" value={newOrder.shirtName} onChange={(e) => setNewOrder((c) => ({ ...c, shirtName: e.target.value }))} />
                  <input className={TEXT_INPUT} placeholder="Numero na camisa" value={newOrder.shirtNumber} onChange={(e) => setNewOrder((c) => ({ ...c, shirtNumber: e.target.value }))} />
                  <input className={TEXT_INPUT} type="date" value={newOrder.date} onChange={(e) => setNewOrder((c) => ({ ...c, date: e.target.value }))} />
                  <TerminalSelect value={newOrder.size} onValueChange={(value) => setNewOrder((c) => ({ ...c, size: value }))} options={sizes} />
                  <TerminalSelect value={newOrder.payStatus} onValueChange={(value) => setNewOrder((c) => ({ ...c, payStatus: value }))} options={payStatuses} />
                  <TerminalSelect value={newOrder.orderStatus} onValueChange={(value) => setNewOrder((c) => ({ ...c, orderStatus: value }))} options={orderStatuses} />
                  <textarea disabled className={`${TEXT_INPUT} h-auto py-2 disabled:cursor-not-allowed disabled:opacity-60`} rows={5} placeholder="Observações não sincronizadas com o banco" value={newOrder.notes} onChange={(e) => setNewOrder((c) => ({ ...c, notes: e.target.value }))} />
                  <button disabled={isMutating} onClick={createOrder} className="sgg-mono inline-flex h-10 items-center justify-center rounded-md bg-green-600 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60">
                    {isMutating ? 'Salvando...' : 'Criar pedido'}
                  </button>
                </div>
              </div>
            </section>
            </>
            ) : (
            <>
            <section className={`${SURFACE} mb-4 overflow-hidden`}>
              <div className="flex items-center justify-between border-b border-[#1a2e1a] px-4 py-3">
                <h2 className="sgg-heading text-lg uppercase tracking-[0.12em]">Configurações</h2>
                <div className="sgg-mono text-xs uppercase tracking-[0.18em] text-[#6b7280]">
                  câmbio aplicado: {exchangeRate > 0 ? `R$ ${exchangeRate.toFixed(2)}` : '--'}
                </div>
              </div>

              <div className="grid gap-4 p-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className={`${SURFACE} bg-[#080c08] px-4 py-3`}>
                  <div className="sgg-mono text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Margem de lucro</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pricingMargins.map((margin) => (
                      <button
                        key={margin.label}
                        type="button"
                        onClick={() => setSelectedMargin(margin.value)}
                        className={`sgg-mono inline-flex h-9 items-center rounded-md border px-3 text-[11px] uppercase tracking-[0.2em] transition ${
                          selectedMargin === margin.value
                            ? 'border-[#22c55e] bg-[#103114] text-[#f0fdf4]'
                            : 'border-[#1a2e1a] text-[#6b7280] hover:border-[#22c55e] hover:text-[#22c55e]'
                        }`}
                      >
                        {margin.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`${SURFACE} bg-[#080c08] px-4 py-3`}>
                  <div className="sgg-mono text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Personalização</div>
                  <button
                    type="button"
                    onClick={() => setPersonalizationEnabled((current) => !current)}
                    className={`mt-3 flex w-full items-center justify-between rounded-md border px-3 py-3 text-left transition ${
                      personalizationEnabled
                        ? 'border-[#22c55e] bg-[#103114]'
                        : 'border-[#1a2e1a] bg-[#0f1a0f]'
                    }`}
                  >
                    <div>
                      <div className="sgg-mono text-[11px] uppercase tracking-[0.18em] text-[#f0fdf4]">+ Nome e número</div>
                      <div className="mt-1 text-sm text-[#6b7280]">Adiciona {usd(3)} ao fornecedor</div>
                    </div>
                    <span className={`inline-flex h-6 min-w-12 items-center rounded-full border px-2 text-[10px] uppercase tracking-[0.2em] ${
                      personalizationEnabled
                        ? 'border-[#1a3a23] bg-[#0f1f14] text-[#86efac]'
                        : 'border-[#2a332a] bg-[#111611] text-[#9ca3af]'
                    }`}>
                      {personalizationEnabled ? 'On' : 'Off'}
                    </span>
                  </button>
                </div>

                <div className={`${SURFACE} bg-[#080c08] px-4 py-3`}>
                  <div className="sgg-mono text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Quantidade</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      ['kit', '4+ peças'],
                      ['avulso', 'Menos de 4'],
                    ].map(([mode, label]) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setSelectedQuantityMode(mode)}
                        className={`sgg-mono inline-flex h-9 items-center rounded-md border px-3 text-[11px] uppercase tracking-[0.2em] transition ${
                          selectedQuantityMode === mode
                            ? mode === 'kit'
                              ? 'border-[#22c55e] bg-[#103114] text-[#f0fdf4]'
                              : 'border-[#f97316] bg-[#221208] text-[#fdba74]'
                            : 'border-[#1a2e1a] text-[#6b7280] hover:border-[#22c55e] hover:text-[#22c55e]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`${SURFACE} bg-[#080c08] px-4 py-3`}>
                  <div className="sgg-mono text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Câmbio R$/US$</div>
                  <input
                    value={exchangeRateInput}
                    onChange={(event) => setExchangeRateInput(event.target.value)}
                    inputMode="decimal"
                    className={`${TEXT_INPUT} mt-3`}
                    placeholder="5.23"
                  />
                </div>
              </div>
            </section>

            {orderedPricingGroups.map((group) => (
              <section
                key={group.id}
                className={`${SURFACE} mb-4 overflow-hidden ${
                  selectedQuantityMode === group.id
                    ? group.id === 'kit'
                      ? 'border-[#1f5f34]'
                      : 'border-[#7c2d12]'
                    : ''
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1a2e1a] px-4 py-3">
                  <div>
                    <h2 className="sgg-heading text-lg uppercase tracking-[0.12em]">{group.title}</h2>
                    <p className="mt-1 text-sm text-[#6b7280]">{group.note}</p>
                  </div>
                  <div className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] ${
                    group.id === 'kit'
                      ? 'border-[#1a3a23] bg-[#0f1f14] text-[#86efac]'
                      : 'border-[#5b3410] bg-[#201206] text-[#fdba74]'
                  }`}>
                    {group.badge}
                  </div>
                </div>

                <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
                  {pricingProducts.map((product) => {
                    const card = pricingCard(product, group, exchangeRate, selectedMargin, personalizationEnabled)

                    return (
                      <article
                        key={`${group.id}-${product.id}`}
                        className={`${SURFACE} overflow-hidden border-l-2 ${
                          group.id === 'kit' ? 'border-l-green-600' : 'border-l-orange-500'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 border-b border-[#1a2e1a] px-4 py-3">
                          <div>
                            <h3 className="sgg-heading text-lg uppercase tracking-[0.1em]">{product.label}</h3>
                            <p className="sgg-mono mt-1 text-[11px] uppercase tracking-[0.18em] text-[#6b7280]">
                              margem {Math.round(selectedMargin * 100)}%
                            </p>
                          </div>
                          <span className={`inline-flex items-center rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.22em] ${
                            group.id === 'kit'
                              ? 'border-[#1a3a23] bg-[#0f1f14] text-[#86efac]'
                              : 'border-[#5b3410] bg-[#201206] text-[#fdba74]'
                          }`}>
                            {group.badge}
                          </span>
                        </div>

                        <div className="space-y-3 px-4 py-4">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-[#6b7280]">Fornecedor</span>
                            <span className="sgg-mono text-right text-[#f0fdf4]">
                              {usd(card.supplierUsd)} → {brl(card.supplierBrl)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-[#6b7280]">Frete</span>
                            <span className="sgg-mono text-right text-[#f0fdf4]">
                              {group.id === 'kit' ? 'Grátis' : `${usd(card.shippingUsd)} → ${brl(card.shippingBrl)}`}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-[#6b7280]">Taxa RF</span>
                            <span className="sgg-mono text-right text-[#f0fdf4]">{group.taxLabel}</span>
                          </div>
                          <div className="flex items-center justify-between gap-3 border-t border-[#1a2e1a] pt-3 text-sm">
                            <span className="text-[#6b7280]">Custo total</span>
                            <span className="sgg-mono text-right text-[#f0fdf4]">{brl(card.totalCost)}</span>
                          </div>

                          <div className="rounded-md border border-[#1a3a23] bg-[#0f1f14] px-4 py-4">
                            <div className="sgg-mono text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Preço de venda</div>
                            <div className="mt-2 text-3xl font-bold text-[#86efac]">{brl(card.salePrice)}</div>
                          </div>

                          <div className="flex items-center justify-between gap-3 rounded-md border border-[#1a2e1a] bg-[#080c08] px-3 py-3 text-sm">
                            <span className="text-[#6b7280]">Lucro por peça</span>
                            <span className="sgg-mono text-right text-[#f0fdf4]">{brl(card.profit)}</span>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
            </>
            )}

            <footer className="mt-4 flex min-h-10 flex-wrap items-center justify-between gap-2 border-t border-[#1a2e1a] py-3 text-xs text-[#6b7280]">
              <span className="sgg-mono uppercase tracking-[0.18em]">© SELECAO.GG</span>
              {activeTab === 'pedidos' ? (
                <span className="sgg-mono inline-flex items-center gap-2 uppercase tracking-[0.14em] text-zinc-500">
                  <Save className="h-3.5 w-3.5" />
                  sincronizado às {savedAt ? saveTimeLabel(savedAt) : '--:--:--'}
                </span>
              ) : (
                <span className="sgg-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                  frete avulso: {usd(4)} por peça | kit com 4+ peças: frete grátis e taxa RF diluída por unidade
                </span>
              )}
            </footer>
          </div>

          <Dialog.Root open={Boolean(selectedOrder)} onOpenChange={(open) => !open && setDetailId(null)}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/70" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(920px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 rounded-md border border-[#1a2e1a] bg-[#0f1a0f] p-0 text-[#f0fdf4] shadow-2xl">
                {selectedOrder && detailDraft ? (
                  <>
                    <div className="flex items-center justify-between border-b border-[#1a2e1a] px-4 py-3">
                      <div>
                        <Dialog.Title className="sgg-heading text-xl uppercase tracking-[0.12em]">{selectedOrder.number}</Dialog.Title>
                      </div>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <Dialog.Close asChild>
                            <button
                              aria-label="Fechar"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#1a2e1a] text-[#6b7280] transition hover:border-[#22c55e] hover:text-[#22c55e]"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </Dialog.Close>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content sideOffset={8} className="rounded-md border border-[#1a2e1a] bg-[#0f1a0f] px-2 py-1 text-xs text-[#f0fdf4]">
                            Fechar
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </div>
                    <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_320px]">
                      <div className="space-y-4">
                        <div className={`${SURFACE} px-4 py-3`}>
                          <div className="grid gap-3 md:grid-cols-3">
                            {[
                              ['CLIENT', selectedOrder.client],
                              ['NAME', selectedOrder.shirtName],
                              ['NUMBER', selectedOrder.shirtNumber],
                              ['SIZE', selectedOrder.size],
                              ['DATE', shortDate(selectedOrder.date)],
                              ['PRICE', money(orderPrice(selectedOrder))],
                            ].map(([label, value]) => (
                              <div key={label}>
                                <div className="text-[10px] uppercase tracking-[0.24em] text-[#6b7280]">{label}</div>
                                <div className="sgg-mono mt-2 text-sm text-[#f0fdf4]">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className={`${SURFACE} px-4 py-3`}>
                          <div className="mb-3 flex items-center justify-between">
                            <div className="sgg-heading text-lg uppercase tracking-[0.12em]">History</div>
                            <div className="sgg-mono text-xs text-[#6b7280]">{selectedOrder.history.length} items</div>
                          </div>
                          <div className="space-y-2">
                            {[...selectedOrder.history].reverse().map((entry, index) => (
                              <div key={`${entry.ts}-${index}`} className="flex items-start justify-between gap-3 rounded-md border border-[#1a2e1a] bg-[#080c08] px-3 py-2">
                                <span className="text-sm text-[#f0fdf4]">{entry.desc}</span>
                                <span className="sgg-mono text-xs text-[#6b7280]">{dateTime(entry.ts)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className={`${SURFACE} h-fit px-4 py-3`}>
                        <div className="sgg-heading mb-3 text-lg uppercase tracking-[0.12em]">Adjustments</div>
                        <div className="space-y-3">
                          <TerminalSelect value={detailDraft.payStatus} onValueChange={(value) => setDetailDraft((current) => ({ ...current, payStatus: value }))} options={payStatuses} />
                          <TerminalSelect value={detailDraft.orderStatus} onValueChange={(value) => setDetailDraft((current) => ({ ...current, orderStatus: value }))} options={orderStatuses} />
                          <textarea disabled value={detailDraft.notes} rows={8} className={`${TEXT_INPUT} h-auto py-2 disabled:cursor-not-allowed disabled:opacity-60`} placeholder="Notas não sincronizadas com o banco" />
                          <button disabled={isMutating} onClick={saveDetails} className="inline-flex h-10 w-full items-center justify-center rounded-md border border-[#22c55e] text-sm font-medium uppercase tracking-[0.18em] text-[#22c55e] transition hover:bg-[#103114] disabled:cursor-not-allowed disabled:opacity-60">
                            {isMutating ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <AlertDialog.Root open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="fixed inset-0 bg-black/70" />
              <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(420px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 rounded-md border border-[#1a2e1a] bg-[#0f1a0f] p-4 text-[#f0fdf4] shadow-2xl">
                <div className="mb-3 flex items-center gap-2 text-[#fca5a5]">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertDialog.Title className="sgg-heading text-lg uppercase tracking-[0.12em]">Delete Order</AlertDialog.Title>
                </div>
                <AlertDialog.Description className="text-sm text-[#6b7280]">
                  Remove {deleteTarget?.number} from the panel?
                </AlertDialog.Description>
                <div className="mt-4 flex justify-end gap-2">
                  <AlertDialog.Cancel asChild>
                    <button className="inline-flex h-10 items-center rounded-md border border-[#1a2e1a] px-3 text-sm text-[#f0fdf4]">Cancel</button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button disabled={isMutating} onClick={removeOrder} className="inline-flex h-10 items-center rounded-md border border-[#3f1f23] bg-[#1b1113] px-3 text-sm text-[#fca5a5] disabled:cursor-not-allowed disabled:opacity-60">Delete</button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>

          <AlertDialog.Root open={clearDataOpen} onOpenChange={setClearDataOpen}>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="fixed inset-0 bg-black/70" />
              <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(420px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 rounded-md border border-[#1a2e1a] bg-[#0f1a0f] p-4 text-[#f0fdf4] shadow-2xl">
                <div className="mb-3 flex items-center gap-2 text-[#fca5a5]">
                  <Trash2 className="h-4 w-4" />
                  <AlertDialog.Title className="sgg-heading text-lg uppercase tracking-[0.12em]">Limpar Dados</AlertDialog.Title>
                </div>
                <AlertDialog.Description className="text-sm text-[#6b7280]">
                  Remover todos os pedidos salvos no banco?
                </AlertDialog.Description>
                <div className="mt-4 flex justify-end gap-2">
                  <AlertDialog.Cancel asChild>
                    <button className="inline-flex h-10 items-center rounded-md border border-[#1a2e1a] px-3 text-sm text-[#f0fdf4]">Cancelar</button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button disabled={isMutating} onClick={clearAllData} className="inline-flex h-10 items-center rounded-md border border-[#3f1f23] bg-[#1b1113] px-3 text-sm text-[#fca5a5] disabled:cursor-not-allowed disabled:opacity-60">Remover</button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>

          <Toast.Root open={toast.open} onOpenChange={(open) => setToast((current) => ({ ...current, open }))} duration={2600} key={toast.key} className="fixed bottom-4 right-4 z-[70] rounded-md border border-[#1a2e1a] bg-[#0f1a0f] px-4 py-3 text-[#f0fdf4] shadow-2xl">
            <Toast.Title className="sgg-mono text-xs uppercase tracking-[0.24em] text-[#22c55e]">{toast.title}</Toast.Title>
            <Toast.Description className="mt-1 text-sm text-[#f0fdf4]">{toast.message}</Toast.Description>
          </Toast.Root>
          <Toast.Viewport />
          </>
          )}
        </div>
      </Toast.Provider>
    </Tooltip.Provider>
  )
}
