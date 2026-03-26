import { NextResponse } from 'next/server'

import { getErrorMessage, getSupabase, isInputError, parsePedido } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .order('criado_em', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json(data ?? [], { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        error: getErrorMessage(error, 'Erro ao buscar pedidos'),
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase()
    const body = parsePedido(await request.json())

    const { error } = await supabase.from('pedidos').insert(body)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    const message = getErrorMessage(error, 'Erro ao criar pedido')

    return NextResponse.json(
      {
        error: message,
      },
      { status: isInputError(error) ? 400 : 500 }
    )
  }
}
