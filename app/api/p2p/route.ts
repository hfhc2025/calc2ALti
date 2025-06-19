// app/api/p2p/route.ts
import { NextResponse } from 'next/server'

/** Tipo de cambio oficial del BCB – 1 USD ≈ 6.96 BOB */
const BOB_OFFICIAL_PER_USD = 6.96

/** Cuerpo que exige la API P2P de Binance */
const payload = (fiat: string, trade: 'BUY' | 'SELL') => ({
  page: 1,
  rows: 1,           // solo el mejor precio
  asset: 'USDT',
  tradeType: trade,  // BUY = compras USDT; SELL = vendes USDT
  fiat,
  payTypes: [],      // ej. ['Santander'] si quieres filtrar
  publisherType: null,
  merchantCheck: true
})

/** Llama a Binance y devuelve el precio (fiat por 1 USDT) */
async function fetchPrice(body: object): Promise<number> {
  const res = await fetch(
    'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    }
  )

  if (!res.ok) throw new Error(`Binance P2P error: ${res.status}`)

  const json = (await res.json()) as any
  const priceStr = json.data?.[0]?.adv?.price
  if (!priceStr) throw new Error('Sin precio en la respuesta de Binance')

  return Number(priceStr)
}

/** GET /api/p2p – Devuelve precios básicos para la conversión */
export async function GET() {
  try {
    // 1️⃣ precio para COMPRAR USDT con CLP
    // 2️⃣ precio para VENDER USDT y recibir BOB (paralelo)
    const [clpPerUSDT, bobParaleloPerUSDT] = await Promise.all([
      fetchPrice(payload('CLP', 'BUY')),
      fetchPrice(payload('BOB', 'SELL'))
    ])

    return NextResponse.json({
      clpPerUSDT,
      bobParaleloPerUSDT,
      bobOfficialPerUSDT: BOB_OFFICIAL_PER_USD
    })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: 'No se pudieron obtener precios de Binance' },
      { status: 502 }
    )
  }
}