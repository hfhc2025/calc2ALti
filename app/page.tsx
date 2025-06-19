'use client'

import { useEffect, useState } from 'react'
import { useTop10 } from './hooks/useTop'
import { Card } from './components/Card'
import { OffersTable } from './components/OffersTable'

/* ────────  SVG Flags  ──────── */
function ChileFlag({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size * 2 / 3} viewBox="0 0 60 40">
      <rect width="60" height="20" y="20" fill="#D52B1E" />
      <rect width="60" height="20" fill="white" />
      <rect width="20" height="20" fill="#0033A0" />
      <polygon
        fill="white"
        points="10,3 11.76,8.09 17.09,8.09 12.67,11.18 14.43,16.27 10,13.18 5.57,16.27 7.33,11.18 2.91,8.09 8.24,8.09"
      />
    </svg>
  )
}

function BoliviaFlag({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size * 2 / 3} viewBox="0 0 60 40">
      <rect width="60" height="13.33" y="0" fill="#D52B1E" />
      <rect width="60" height="13.33" y="13.33" fill="#FFD700" />
      <rect width="60" height="13.33" y="26.66" fill="#007A33" />
    </svg>
  )
}

/* ────────  Helpers  ──────── */
const cleanNumber = (raw: string) =>
  Number(raw.replace(/[\.\s,]/g, '')) || 0

const fmt = (n: number) =>
  n.toLocaleString('es-CL', { maximumFractionDigits: 2 })

/* ────────  Página  ──────── */
export default function Page() {
  const [clpInput, setClpInput] = useState('')

  // Precios CLP⇄USDT, BOB⇄USDT y oficial
  const [rates, setRates] = useState<{
    clpPerUSDT: number
    bobParaleloPerUSDT: number
    bobOfficialPerUSDT: number
  }>()
  // Arrays top-10 para buscar el mejor precio de compra y venta
  const { offers } = useTop10()

  /* Fetch precios básicos cada 30 s */
  useEffect(() => {
    const load = () => fetch('/api/p2p').then(r => r.json()).then(setRates)
    load()
    const id = setInterval(load, 30_000)
    return () => clearInterval(id)
  }, [])

  /* ───── Cálculo principal ───── */
  const amountClp = cleanNumber(clpInput)

  const bestBuyPrice = offers?.buyCLP?.length
    ? Math.min(...offers.buyCLP.map(o => o.price))
    : NaN                                   // precio + barato para comprar USDT

  const bestSellPrice = offers?.sellBOB?.length
    ? Math.max(...offers.sellBOB.map(o => o.price))
    : NaN                                   // precio + caro para vender USDT

  const usdt        = amountClp && !isNaN(bestBuyPrice) ? amountClp / bestBuyPrice : 0
  const bobParalelo = !isNaN(bestSellPrice)             ? usdt * bestSellPrice    : 0
  const bobOficial  = rates                              ? usdt * rates.bobOfficialPerUSDT : 0

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-gray-800 p-6 flex flex-col items-center">
      {/* Encabezado */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#4F46E5] mb-1">
        Calculadora Altius
      </h1>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Consulta en tiempo real el mejor tipo de cambio entre Chile y Bolivia.
      </p>

      {/* Input con banderas */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between gap-4 w-80 md:w-96 mb-6">
        <ChileFlag size={28} />
        <input
          className="flex-1 text-center border-none outline-none text-xl font-medium placeholder:text-gray-400"
          placeholder="Monto en CLP"
          value={clpInput}
          onChange={e => setClpInput(e.target.value)}
        />
        <BoliviaFlag size={28} />
      </div>

      {/* Resultados */}
      {amountClp > 0 && (
        <div className="grid gap-4 w-80 md:w-96 mb-10">
          <Card label="USDT obtenidos" value={fmt(usdt)} />
          <Card label="BOB (paralelo)" value={fmt(bobParalelo)} />
          <Card label="BOB (oficial)" value={fmt(bobOficial)} />
        </div>
      )}

      {/* Tablas top-10 */}
      {offers && (
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl">
          <OffersTable
            title="Top 10 – Comprar USDT con CLP"
            rows={offers.buyCLP}
          />
          <OffersTable
            title="Top 10 – Vender USDT por BOB"
            rows={offers.sellBOB}
          />
        </div>
      )}
    </main>
  )
}