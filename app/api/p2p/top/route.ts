import { NextResponse } from 'next/server'

type Offer = { price: string; surplusAmount: string; advertiser: { nickName: string } }

const body = (fiat: string, trade: 'BUY' | 'SELL') => ({
  page: 1,
  rows: 10,
  asset: 'USDT',
  tradeType: trade,
  fiat,
  payTypes: [],
  publisherType: null,
  merchantCheck: true,
})

async function fetchOffers(payload: object) {
  const res  = await fetch('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  return (json.data as Offer[]).map(o => ({
    price: Number(o.price),
    available: Number(o.surplusAmount),
    advertiser: o.advertiser.nickName,
  }))
}

export async function GET() {
  const [buyCLP, sellBOB] = await Promise.all([
    // 🔹 COMPRAR USDT CON CLP ⇒ anuncios SELL-CLP (nos venden USDT)
    fetchOffers(body('CLP', 'SELL')),

    // 🔸 VENDER USDT Y RECIBIR BOB ⇒ anuncios BUY-BOB (nos compran USDT)
    fetchOffers(body('BOB', 'BUY')),
  ])

  return NextResponse.json({ buyCLP, sellBOB })
}