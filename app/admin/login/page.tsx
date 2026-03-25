'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const surface = 'rounded-md border border-[#1a2e1a] bg-[#0f1a0f]'
const inputClass =
  'h-11 w-full rounded-md border border-[#1a2e1a] bg-[#080c08] px-3 text-sm text-[#f0fdf4] outline-none placeholder:text-[#374151] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/30'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ usuario: '', senha: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsLoading(true)
      setError('')

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(payload?.error ?? 'Erro ao fazer login')
      }

      router.push('/admin')
      router.refresh()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#080c08] bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:28px_28px] px-4 py-10 text-[#f0fdf4]">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md items-center justify-center">
        <div className={`${surface} w-full p-6 shadow-2xl`}>
          <div className="text-center">
            <h1 className="text-3xl font-bold uppercase tracking-[0.14em] text-[#f0fdf4]">SELECAO.GG</h1>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-[#6b7280]">
              painel administrativo
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-[#6b7280]">
                Usuário
              </label>
              <input
                type="text"
                value={form.usuario}
                onChange={(event) =>
                  setForm((current) => ({ ...current, usuario: event.target.value }))
                }
                className={inputClass}
                autoComplete="username"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-[#6b7280]">
                Senha
              </label>
              <input
                type="password"
                value={form.senha}
                onChange={(event) =>
                  setForm((current) => ({ ...current, senha: event.target.value }))
                }
                className={inputClass}
                autoComplete="current-password"
              />
            </div>

            {error ? <p className="font-mono text-sm text-red-400">{error}</p> : null}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-green-600 font-mono text-sm uppercase tracking-[0.18em] text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
