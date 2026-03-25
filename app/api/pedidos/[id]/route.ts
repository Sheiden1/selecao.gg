import { NextResponse } from 'next/server'

import { getSupabase, type Pedido } from '@/lib/supabase'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const supabase = getSupabase()
    const { id } = await params
    const body = (await request.json()) as Partial<Pedido>
    const updates = Object.fromEntries(
      Object.entries(body).filter(([, value]) => value !== undefined)
    )

    const { error } = await supabase.from('pedidos').update(updates).eq('id', id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Erro ao atualizar pedido',
      },
      { status: 500 }
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
        error: error instanceof Error ? error.message : 'Erro ao remover pedido',
      },
      { status: 500 }
    )
  }
}
