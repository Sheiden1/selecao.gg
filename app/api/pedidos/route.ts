import { NextResponse } from 'next/server'

import { getSupabase, type Pedido } from '@/lib/supabase'

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
        error: error instanceof Error ? error.message : 'Erro ao buscar pedidos',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase()
    const body = (await request.json()) as Pedido

    const { data, error } = await supabase
      .from('pedidos')
      .insert(body)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Erro ao criar pedido',
      },
      { status: 500 }
    )
  }
}
