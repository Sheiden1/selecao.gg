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
const STORAGE_KEY = 'selecao_gg_orders'

const sizes = ['PP', 'P', 'M', 'G', 'GG', 'XGG']
const payStatuses = ['Pendente', 'Pago']
const orderStatuses = ['Aguardando', 'Em produção', 'Pronto', 'Entregue']

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

const SAMPLE_ORDERS = [
  {
    id: 1,
    number: '#0001',
    client: 'Lucas Almeida',
    shirtName: 'NEYMAR JR',
    shirtNumber: '10',
    size: 'M',
    payStatus: 'Pago',
    orderStatus: 'Em produção',
    date: '2026-03-18',
    notes: 'Prioridade para presente.',
    history: [
      { ts: '2026-03-18T09:15:00', desc: 'Pedido criado' },
      { ts: '2026-03-18T09:42:00', desc: 'Pagamento confirmado' },
      { ts: '2026-03-19T11:10:00', desc: 'Status alterado para Em produção' },
    ],
  },
  {
    id: 2,
    number: '#0002',
    client: 'Mariana Santos',
    shirtName: 'KAKA',
    shirtNumber: '8',
    size: 'G',
    payStatus: 'Pendente',
    orderStatus: 'Aguardando',
    date: '2026-03-20',
    notes: 'Conferir acento no nome.',
    history: [{ ts: '2026-03-20T10:05:00', desc: 'Pedido criado' }],
  },
  {
    id: 3,
    number: '#0003',
    client: 'Bruno Costa',
    shirtName: 'MESSI',
    shirtNumber: '10',
    size: 'P',
    payStatus: 'Pago',
    orderStatus: 'Pronto',
    date: '2026-03-21',
    notes: 'Separar embalagem premium.',
    history: [
      { ts: '2026-03-21T08:32:00', desc: 'Pedido criado' },
      { ts: '2026-03-21T09:10:00', desc: 'Pagamento confirmado' },
      { ts: '2026-03-22T13:20:00', desc: 'Status alterado para Em produção' },
      { ts: '2026-03-23T16:12:00', desc: 'Status alterado para Pronto' },
    ],
  },
  {
    id: 4,
    number: '#0004',
    client: 'Camila Torres',
    shirtName: 'VINI JR',
    shirtNumber: '7',
    size: 'GG',
    payStatus: 'Pago',
    orderStatus: 'Entregue',
    date: '2026-03-16',
    notes: 'Entrega concluida no balcão.',
    history: [
      { ts: '2026-03-16T14:40:00', desc: 'Pedido criado' },
      { ts: '2026-03-16T15:02:00', desc: 'Pagamento confirmado' },
      { ts: '2026-03-17T10:00:00', desc: 'Status alterado para Em produção' },
      { ts: '2026-03-18T12:25:00', desc: 'Status alterado para Pronto' },
      { ts: '2026-03-19T18:05:00', desc: 'Status alterado para Entregue' },
    ],
  },
  {
    id: 5,
    number: '#0005',
    client: 'Rafael Lima',
    shirtName: 'RONALDO',
    shirtNumber: '9',
    size: 'XGG',
    payStatus: 'Pendente',
    orderStatus: 'Em produção',
    date: '2026-03-22',
    notes: 'Cliente pediu contato antes do envio.',
    history: [
      { ts: '2026-03-22T11:17:00', desc: 'Pedido criado' },
      { ts: '2026-03-23T09:48:00', desc: 'Status alterado para Em produção' },
    ],
  },
]

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
        'Em produÃ§Ã£o': 'bg-amber-950/40 text-amber-400',
        Pronto: 'bg-sky-950/40 text-sky-400',
        Entregue: 'bg-green-950/40 text-green-400',
      }

  return `${base} ${map[value]}`
}

function sortValue(order, key) {
  switch (key) {
    case 'number':
      return Number(order.number.replace('#', ''))
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

function createNextDraft(orders) {
  const next = Math.max(...orders.map((item) => item.id), 0) + 1
  return {
    id: next,
    number: `#${String(next).padStart(4, '0')}`,
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

function loadOrders() {
  if (typeof window === 'undefined') {
    return SAMPLE_ORDERS.map((order) => ({ ...order, history: [...order.history] }))
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return SAMPLE_ORDERS.map((order) => ({ ...order, history: [...order.history] }))
    }

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return SAMPLE_ORDERS.map((order) => ({ ...order, history: [...order.history] }))
    }

    return parsed
  } catch {
    return SAMPLE_ORDERS.map((order) => ({ ...order, history: [...order.history] }))
  }
}

function saveOrders(orders) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
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
  const [orders, setOrders] = useState(SAMPLE_ORDERS)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [search, setSearch] = useState('')
  const [payFilter, setPayFilter] = useState('Todos')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [detailId, setDetailId] = useState(null)
  const [detailDraft, setDetailDraft] = useState(null)
  const [newOrder, setNewOrder] = useState(() => createNextDraft(SAMPLE_ORDERS))
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [clearDataOpen, setClearDataOpen] = useState(false)
  const [savedAt, setSavedAt] = useState(null)
  const [toast, setToast] = useState({ open: false, title: '', message: '', key: 0 })
  const [isStorageReady, setIsStorageReady] = useState(false)
  const skipNextSaveRef = useRef(false)
  const firstFieldRef = useRef(null)

  useEffect(() => {
    const storedOrders = loadOrders()
    setOrders(storedOrders)
    setNewOrder(createNextDraft(storedOrders))
    setIsStorageReady(true)
  }, [])

  useEffect(() => {
    if (!isStorageReady) return
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false
      return
    }

    saveOrders(orders)
    setSavedAt(new Date().toISOString())
  }, [orders, isStorageReady])

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'SELECAO.GG — Pedidos'

    return () => {
      document.title = previousTitle
    }
  }, [])

  useEffect(() => {
    function handleKeydown(event) {
      if (!isAuthenticated) return
      if (!event.ctrlKey || event.key.toLowerCase() !== 'n') return

      event.preventDefault()
      firstFieldRef.current?.focus()
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isAuthenticated])

  const selectedOrder = orders.find((order) => order.id === detailId) ?? null
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

  function notify(title, message) {
    setToast({ open: false, title, message, key: Date.now() })
    requestAnimationFrame(() => setToast((current) => ({ ...current, open: true })))
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
      setIsAuthenticated(true)
      setLoginError('')
      setLoginForm({ username: '', password: '' })
      return
    }

    setLoginError('Credenciais inválidas')
  }

  function handleLogout() {
    setIsAuthenticated(false)
    setLoginError('')
    setLoginForm({ username: '', password: '' })
    setDetailId(null)
    setDetailDraft(null)
    setDeleteTarget(null)
  }

  function openDetails(order) {
    setDetailId(order.id)
    setDetailDraft({
      payStatus: order.payStatus,
      orderStatus: order.orderStatus,
      notes: order.notes,
    })
  }

  function saveDetails() {
    if (!selectedOrder || !detailDraft) return
    setOrders((current) =>
      current.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              payStatus: detailDraft.payStatus,
              orderStatus: detailDraft.orderStatus,
              notes: detailDraft.notes,
              history:
                order.payStatus !== detailDraft.payStatus || order.orderStatus !== detailDraft.orderStatus
                  ? [
                      ...order.history,
                      {
                        ts: new Date().toISOString(),
                        desc: `${order.payStatus !== detailDraft.payStatus ? `Pagamento: ${order.payStatus} -> ${detailDraft.payStatus}` : ''}${order.payStatus !== detailDraft.payStatus && order.orderStatus !== detailDraft.orderStatus ? ' | ' : ''}${order.orderStatus !== detailDraft.orderStatus ? `Pedido: ${order.orderStatus} -> ${detailDraft.orderStatus}` : ''}`,
                      },
                    ]
                  : order.history,
            }
          : order
      )
    )
    setDetailId(null)
    setDetailDraft(null)
    notify('ORDER UPDATED', `${selectedOrder.number} synchronized`)
  }

  function togglePayment(order) {
    const next = order.payStatus === 'Pago' ? 'Pendente' : 'Pago'
    setOrders((current) =>
      current.map((item) =>
        item.id === order.id
          ? {
              ...item,
              payStatus: next,
              history: [...item.history, { ts: new Date().toISOString(), desc: `Pagamento: ${item.payStatus} -> ${next}` }],
            }
          : item
      )
    )
    notify('PAYMENT UPDATED', `${order.number} -> ${next}`)
  }

  function updateRowStatus(order, next) {
    setOrders((current) =>
      current.map((item) =>
        item.id === order.id
          ? {
              ...item,
              orderStatus: next,
              history: [...item.history, { ts: new Date().toISOString(), desc: `Pedido: ${item.orderStatus} -> ${next}` }],
            }
          : item
      )
    )
    notify('STATUS UPDATED', `${order.number} -> ${next}`)
  }

  function createOrder() {
    const entry = {
      ...newOrder,
      client: newOrder.client.trim(),
      shirtName: newOrder.shirtName.trim().toUpperCase(),
      shirtNumber: newOrder.shirtNumber.trim(),
      notes: newOrder.notes.trim(),
      history: [{ ts: new Date().toISOString(), desc: 'Pedido criado' }],
    }
    setOrders((current) => [entry, ...current])
    setNewOrder(createNextDraft([entry, ...orders]))
    notify('ORDER CREATED', `${entry.number} registered`)
  }

  function removeOrder() {
    if (!deleteTarget) return
    setOrders((current) => current.filter((order) => order.id !== deleteTarget.id))
    setDeleteTarget(null)
    notify('ORDER REMOVED', 'Record deleted from panel')
  }

  function clearAllData() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
    skipNextSaveRef.current = true
    setOrders([])
    setNewOrder(createNextDraft([]))
    setDetailId(null)
    setDetailDraft(null)
    setDeleteTarget(null)
    setClearDataOpen(false)
    setSavedAt(new Date().toISOString())
    notify('DADOS', 'Dados removidos.')
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
    setNewOrder(createNextDraft(orders))
  }

  return (
    <Tooltip.Provider delayDuration={120}>
      <Toast.Provider swipeDirection="right">
        <div className="sgg-shell min-h-screen text-[#f0fdf4]">
          <style>{fontStyles}</style>
          {!isAuthenticated ? (
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
                  / pedidos
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
                      {visibleOrders.length === 0 ? (
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
                  <textarea className={`${TEXT_INPUT} h-auto py-2`} rows={5} placeholder="Observacoes internas" value={newOrder.notes} onChange={(e) => setNewOrder((c) => ({ ...c, notes: e.target.value }))} />
                  <button onClick={createOrder} className="sgg-mono inline-flex h-10 items-center justify-center rounded-md bg-green-600 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-green-500">
                    Criar pedido
                  </button>
                </div>
              </div>
            </section>

            <footer className="mt-4 flex h-10 items-center justify-between border-t border-[#1a2e1a] text-xs text-[#6b7280]">
              <span className="sgg-mono uppercase tracking-[0.18em]">© SELECAO.GG</span>
              <span className="sgg-mono inline-flex items-center gap-2 uppercase tracking-[0.14em] text-zinc-500">
                <Save className="h-3.5 w-3.5" />
                salvo às {savedAt ? saveTimeLabel(savedAt) : '--:--:--'}
              </span>
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
                          <textarea value={detailDraft.notes} onChange={(event) => setDetailDraft((current) => ({ ...current, notes: event.target.value }))} rows={8} className={`${TEXT_INPUT} h-auto py-2`} placeholder="Internal notes" />
                          <button onClick={saveDetails} className="inline-flex h-10 w-full items-center justify-center rounded-md border border-[#22c55e] text-sm font-medium uppercase tracking-[0.18em] text-[#22c55e] transition hover:bg-[#103114]">
                            Save
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
                    <button onClick={removeOrder} className="inline-flex h-10 items-center rounded-md border border-[#3f1f23] bg-[#1b1113] px-3 text-sm text-[#fca5a5]">Delete</button>
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
                  Remover todos os pedidos salvos deste navegador?
                </AlertDialog.Description>
                <div className="mt-4 flex justify-end gap-2">
                  <AlertDialog.Cancel asChild>
                    <button className="inline-flex h-10 items-center rounded-md border border-[#1a2e1a] px-3 text-sm text-[#f0fdf4]">Cancelar</button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button onClick={clearAllData} className="inline-flex h-10 items-center rounded-md border border-[#3f1f23] bg-[#1b1113] px-3 text-sm text-[#fca5a5]">Remover</button>
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
