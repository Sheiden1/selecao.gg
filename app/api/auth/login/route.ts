import { NextResponse } from 'next/server'

const ADMIN_USUARIO = 'admin'
const ADMIN_SENHA = 'selecao2026'

export async function POST(request: Request) {
  try {
    const { usuario, senha } = await request.json()

    if (usuario !== ADMIN_USUARIO || senha !== ADMIN_SENHA) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true }, { status: 200 })

    response.cookies.set({
      name: 'admin_auth',
      value: 'true',
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    })

    return response
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Erro ao fazer login',
      },
      { status: 500 }
    )
  }
}
