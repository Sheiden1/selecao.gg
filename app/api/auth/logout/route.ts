import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 })

  response.cookies.set({
    name: 'admin_auth',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
  })

  return response
}
