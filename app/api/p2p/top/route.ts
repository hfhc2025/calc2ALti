import { NextResponse } from 'next/server'

type Offer = {
  price: number            // precio por 1 USDT
  available: number        // USDT disponibles en el aviso
  minLimit: number         // compra mínima en fiat
  advertiser: string       // alias del comerciante
}

const binanceBody = (fiat: string, trade: 'BUY' | 'SELL'): object => ({
  page: 1,
  rows: 10,               // ← top-10
  asset: 'USDT',
  tradeType: trade,
  fiat,
  payTypes: [],           // o ['Santander'] si quieres filtrar
  publisherType: null,
  merchantCheck: true     // true = solo merchants verificados
})

async function fetchOffers(body: object): Promise<Offer[]> {
  const res  = await fetch(
    'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
    { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }
  )
  const json = await res.json()

  return (json.data ?? []).map((d: any) => ({
    price     : Number(d.adv.price),
    available : Number(d.adv.surplusAmount),
    minLimit  : Number(d.adv.minSingleTransAmount),
    advertiser: d.advertiser.nickName
  }))
}

export async function GET() {
  const [buyCLP, sellBOB] = await Promise.all([
    fetchOffers(binanceBody('CLP', 'BUY')),    // comprar USDT con CLP → precio más bajo
    fetchOffers(binanceBody('BOB', 'SELL'))    // vender USDT y recibir BOB → precio más alto
  ])

  return NextResponse.json({ buyCLP, sellBOB })
}