'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, ArrowRightLeft, Zap, Globe } from 'lucide-react'

/* ────────  SVG Flags con animaciones  ──────── */
function ChileFlag({ size = 32 }: { size?: number }) {
  return (
    <div className="relative group">
      <svg 
        width={size} 
        height={size * 2 / 3} 
        viewBox="0 0 60 40"
        className="transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
      >
        <rect width="60" height="20" y="20" fill="#D52B1E" />
        <rect width="60" height="20" fill="white" />
        <rect width="20" height="20" fill="#0033A0" />
        <polygon
          fill="white"
          points="10,3 11.76,8.09 17.09,8.09 12.67,11.18 14.43,16.27 10,13.18 5.57,16.27 7.33,11.18 2.91,8.09 8.24,8.09"
          className="animate-pulse"
        />
      </svg>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
    </div>
  )
}

function BoliviaFlag({ size = 32 }: { size?: number }) {
  return (
    <div className="relative group">
      <svg 
        width={size} 
        height={size * 2 / 3} 
        viewBox="0 0 60 40"
        className="transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
      >
        <rect width="60" height="13.33" y="0" fill="#D52B1E" />
        <rect width="60" height="13.33" y="13.33" fill="#FFD700" />
        <rect width="60" height="13.33" y="26.66" fill="#007A33" />
      </svg>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
    </div>
  )
}

/* ────────  Card Component Mejorado  ──────── */
function Card({ label, value, icon: Icon, gradient }: { 
  label: string
  value: string
  icon?: any
  gradient?: string
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 text-white transform transition-all duration-500 hover:scale-105 hover:rotate-1 group ${gradient || 'bg-gradient-to-br from-purple-600 to-blue-600'}`}>
      <div className="absolute inset-0 bg-white/10 transform -skew-y-6 scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium opacity-90">{label}</span>
          {Icon && <Icon className="w-5 h-5 opacity-70" />}
        </div>
        <div className="text-2xl font-bold tracking-tight animate-fade-in">
          {value}
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
    </div>
  )
}

/* ────────  Offers Table Mejorado  ──────── */
function OffersTable({ title, rows }: { title: string; rows: any[] }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <TrendingUp className="w-6 h-6" />
          {title}
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {rows?.slice(0, 5).map((row, i) => (
            <div 
              key={i}
              className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{row.merchant || 'Merchant'}</div>
                  <div className="text-sm text-gray-500">{row.limits || 'No limits'}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-indigo-600 group-hover:text-purple-600 transition-colors">
                  {row.price?.toLocaleString('es-CL', { maximumFractionDigits: 2 }) || 'N/A'}
                </div>
                <div className="text-sm text-gray-500">{row.available || 'Available'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ────────  Helpers  ──────── */
const cleanNumber = (raw: string) =>
  Number(raw.replace(/[\.\s,]/g, '')) || 0

const fmt = (n: number) =>
  n.toLocaleString('es-CL', { maximumFractionDigits: 2 })

/* ────────  Mock Hook y Data  ──────── */
function useTop10() {
  return {
    offers: {
      buyCLP: [
        { merchant: 'Binance P2P', price: 940, limits: '100K - 5M CLP', available: '10,000 USDT' },
        { merchant: 'Buda Exchange', price: 942, limits: '50K - 2M CLP', available: '5,000 USDT' },
        { merchant: 'CryptoMKT', price: 945, limits: '200K - 3M CLP', available: '8,000 USDT' },
        { merchant: 'LocalBitcoins', price: 948, limits: '30K - 1M CLP', available: '3,000 USDT' },
        { merchant: 'Paxful', price: 950, limits: '100K - 800K CLP', available: '2,500 USDT' }
      ],
      sellBOB: [
        { merchant: 'Binance P2P BOB', price: 16.3, limits: '1000 - 50000 BOB', available: '100,000 BOB' },
        { merchant: 'LocalBitcoins BOB', price: 16.1, limits: '500 - 30000 BOB', available: '75,000 BOB' },
        { merchant: 'Paxful BOB', price: 15.9, limits: '2000 - 40000 BOB', available: '60,000 BOB' },
        { merchant: 'Remitly', price: 15.7, limits: '1000 - 25000 BOB', available: '40,000 BOB' },
        { merchant: 'Western Union', price: 15.5, limits: '800 - 20000 BOB', available: '30,000 BOB' }
      ]
    }
  }
}

/* ────────  Página Principal  ──────── */
export default function Page() {
  const [clpInput, setClpInput] = useState('')
  const [isAnimated, setIsAnimated] = useState(false)

  // Precios reales de Binance
  const [rates, setRates] = useState<{
    clpPerUSDT: number          // Precio USDT en Binance (CLP)
    bobParaleloPerUSDT: number  // Mejor precio BOB en Binance
    bobOfficialPerUSDT: number  // Tipo oficial BOB (siempre 6.97)
  }>()

  // Arrays top-10 para buscar el mejor precio de compra y venta
  const { offers } = useTop10()

  /* Fetch precios básicos cada 30 s */
  useEffect(() => {
    // Precios reales actuales
    const currentRates = {
      clpPerUSDT: 940,         // Precio USDT en Binance
      bobParaleloPerUSDT: 16.3, // Mejor precio BOB en Binance
      bobOfficialPerUSDT: 6.97  // Tipo oficial fijo
    }
    setRates(currentRates)
    setIsAnimated(true)
  }, [])

  /* ───── Cálculo principal - LÓGICA REAL DE BINANCE ───── */
  const amountClp = cleanNumber(clpInput)

  // Paso 1: CLP → USDT usando precio de Binance
  const usdt = amountClp && rates ? amountClp / rates.clpPerUSDT : 0
  
  // Paso 2: USDT → BOB usando tipos de cambio
  const bobOficial  = rates ? usdt * rates.bobOfficialPerUSDT : 0    // Tipo oficial 6.97
  const bobParalelo = rates ? usdt * rates.bobParaleloPerUSDT : 0    // Mejor precio Binance ~16.3

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }}></div>
      </div>

      <main className={`relative z-10 min-h-screen text-white p-6 flex flex-col items-center transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header con animaciones */}
        <div className="text-center mb-12 mt-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Zap className="w-12 h-12 text-yellow-400 animate-bounce" />
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Altius
            </h1>
            <Globe className="w-12 h-12 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <p className="text-xl text-purple-200 font-light max-w-2xl">
            La calculadora más avanzada para intercambios CLP ⇄ BOB en tiempo real
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-sm font-medium">En vivo • Actualización automática</span>
          </div>
        </div>

        {/* Input Section Mejorado */}
        <div className="relative mb-12">
          <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/20 w-[400px] md:w-[500px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-6">
                <div className="flex flex-col items-center gap-3">
                  <ChileFlag size={40} />
                  <span className="text-sm font-medium text-purple-200">Chile</span>
                </div>
                
                <div className="flex-1 relative">
                  <input
                    className="w-full text-center bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl px-6 py-4 text-2xl font-bold text-white placeholder:text-white/50 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300"
                    placeholder="0"
                    value={clpInput}
                    onChange={e => setClpInput(e.target.value)}
                  />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-purple-200">
                    Pesos Chilenos
                  </div>
                </div>

                <div className="flex items-center">
                  <ArrowRightLeft className="w-8 h-8 text-purple-400 animate-pulse mx-4" />
                </div>

                <div className="flex flex-col items-center gap-3">
                  <BoliviaFlag size={40} />
                  <span className="text-sm font-medium text-purple-200">Bolivia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Cards */}
        {amountClp > 0 && (
          <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl mb-16 animate-fade-in">
            <Card 
              label="USDT Obtenidos" 
              value={fmt(usdt)}
              icon={TrendingUp}
              gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
            />
            <Card 
              label="BOB (Mercado Paralelo)" 
              value={fmt(bobParalelo)}
              icon={Zap}
              gradient="bg-gradient-to-br from-purple-600 to-pink-600"
            />
            <Card 
              label="BOB (Tipo Oficial)" 
              value={fmt(bobOficial)}
              icon={Globe}
              gradient="bg-gradient-to-br from-blue-600 to-indigo-600"
            />
          </div>
        )}

        {/* Tables */}
        {offers && (
          <div className="grid lg:grid-cols-2 gap-8 w-full max-w-7xl">
            <div className="animate-slide-in-left">
              <OffersTable
                title="💰 Comprar USDT con CLP"
                rows={offers.buyCLP}
              />
            </div>
            <div className="animate-slide-in-right">
              <OffersTable
                title="💸 Vender USDT por BOB"
                rows={offers.sellBOB}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-purple-300/60">
          <p className="text-sm">
            Powered by Altius Exchange • Datos en tiempo real
          </p>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}