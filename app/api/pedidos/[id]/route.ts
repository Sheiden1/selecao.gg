import { NextResponse } from 'next/server'

import { getErrorMessage, getSupabase, isInputError, parsePedidoUpdate } from '@/lib/supabase'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const supabase = getSupabase()
    const { id } = await params
    const updates = parsePedidoUpdate(await request.json())

    const { error } = await supabase.from('pedidos').update(updates).eq('id', id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    const message = getErrorMessage(error, 'Erro ao atualizar pedido')

    return NextResponse.json(
      {
        error: message,
      },
      { status: isInputError(error) ? 400 : 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const supabase = getSupabase()
    const { id } = await params

    const { error } = await supabase.from('pedidos').delete().eq('id', id)

    if (error) {
      throw error
    }

    return NextResponse.json({ message: 'Pedido removido com sucesso' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        error: getErrorMessage(error, 'Erro ao remover pedido'),
      },
      { status: 500 }
    )
  }
}
