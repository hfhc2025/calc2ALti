'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, ArrowRightLeft, Calculator, BarChart3, AlertCircle, Clock, DollarSign, Activity, Target, Zap, Globe, PieChart, LineChart } from 'lucide-react'

/* ────────  SVG Flags  ──────── */
function ChileFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 2 / 3} viewBox="0 0 60 40" className="border border-gray-200 rounded-sm">
      <rect width="60" height="20" y="20" fill="#D52B1E" />
      <rect width="60" height="20" fill="white" />
      <rect width="20" height="20" fill="#0033A0" />
      <polygon fill="white" points="10,3 11.76,8.09 17.09,8.09 12.67,11.18 14.43,16.27 10,13.18 5.57,16.27 7.33,11.18 2.91,8.09 8.24,8.09" />
    </svg>
  )
}

function BoliviaFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 2 / 3} viewBox="0 0 60 40" className="border border-gray-200 rounded-sm">
      <rect width="60" height="13.33" y="0" fill="#D52B1E" />
      <rect width="60" height="13.33" y="13.33" fill="#FFD700" />
      <rect width="60" height="13.33" y="26.66" fill="#007A33" />
    </svg>
  )
}

/* ────────  KPI Card Component  ──────── */
function KPICard({ title, value, change, changePercent, icon: Icon, trend, subtitle, color = 'blue' }: { 
  title: string
  value: string
  change?: string
  changePercent?: string
  icon?: any
  trend?: 'up' | 'down' | 'neutral'
  subtitle?: string
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
}) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700'
  }

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4 text-green-600" />,
    down: <TrendingDown className="w-4 h-4 text-red-600" />,
    neutral: <Activity className="w-4 h-4 text-gray-600" />
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>
        {trend && trendIcons[trend]}
      </div>
      
      <div className="mb-2">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
      </div>
      
      {(change || changePercent) && (
        <div className="flex items-center gap-2 text-sm">
          {change && <span className="text-gray-600">{change}</span>}
          {changePercent && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              changePercent.startsWith('+') ? 'bg-green-100 text-green-700' : 
              changePercent.startsWith('-') ? 'bg-red-100 text-red-700' : 
              'bg-gray-100 text-gray-700'
            }`}>
              {changePercent}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

/* ────────  Mini Chart Component  ──────── */
function MiniChart({ data, color = 'blue' }: { data: number[], color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 200
    const y = 40 - ((value - min) / range) * 30
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width="200" height="40" className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color === 'blue' ? '#3B82F6' : color === 'green' ? '#10B981' : '#EF4444'}
        strokeWidth="2"
        className="drop-shadow-sm"
      />
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color === 'blue' ? '#3B82F6' : color === 'green' ? '#10B981' : '#EF4444'} stopOpacity="0.1"/>
          <stop offset="100%" stopColor={color === 'blue' ? '#3B82F6' : color === 'green' ? '#10B981' : '#EF4444'} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline
        points={`0,40 ${points} 200,40`}
        fill={`url(#gradient-${color})`}
        stroke="none"
      />
    </svg>
  )
}

/* ────────  Market Data Table  ──────── */
function MarketTable({ title, data, type }: { title: string; data: any[]; type: 'buy' | 'sell' }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-gray-600" />
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Exchange</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Precio</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Vol. 24h</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Spread</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.slice(0, 4).map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${i === 0 ? 'bg-green-400' : i === 1 ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                    <span className="font-medium text-gray-900">{row.merchant}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right font-semibold text-gray-900">
                  {row.price?.toLocaleString('es-CL', { maximumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-gray-600">
                  {row.volume24h || 'N/A'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    (row.spread || 0) < 1 ? 'bg-green-100 text-green-700' : 
                    (row.spread || 0) < 2 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {row.spread ? `${row.spread}%` : 'N/A'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ────────  Helpers  ──────── */
const cleanNumber = (raw: string) => Number(raw.replace(/[\.\s,]/g, '')) || 0
const fmt = (n: number) => n.toLocaleString('es-CL', { maximumFractionDigits: 2 })

/* ────────  Mock Market Data  ──────── */
function useMarketData() {
  const [data, setData] = useState({
    // Precios actuales
    rates: {
      clpPerUSDT: 940,
      bobParaleloPerUSDT: 16.3,
      bobOfficialPerUSDT: 6.97
    },
    // KPIs de mercado
    marketKPIs: {
      usdtVolume24h: 2845000,
      activeOrders: 1247,
      avgSpread: 0.8,
      liquidityIndex: 85.2,
      volatility: 2.1,
      marketCap: 95600000000
    },
    // Datos históricos para gráficos
    priceHistory: {
      clp: [935, 938, 942, 940, 945, 941, 940, 938],
      bob: [16.1, 16.2, 16.4, 16.3, 16.5, 16.2, 16.3, 16.1]
    },
    // Ofertas del mercado
    offers: {
      buyCLP: [
        { merchant: 'Binance P2P', price: 940, volume24h: '1.2M USDT', spread: 0.5 },
        { merchant: 'Buda', price: 942, volume24h: '800K USDT', spread: 0.8 },
        { merchant: 'CryptoMKT', price: 945, volume24h: '600K USDT', spread: 1.2 },
        { merchant: 'Bitso', price: 948, volume24h: '450K USDT', spread: 1.8 }
      ],
      sellBOB: [
        { merchant: 'Binance P2P', price: 16.3, volume24h: '950K BOB', spread: 0.6 },
        { merchant: 'LocalBitcoins', price: 16.1, volume24h: '720K BOB', spread: 1.1 },
        { merchant: 'Paxful', price: 15.9, volume24h: '580K BOB', spread: 1.5 },
        { merchant: 'Remitly', price: 15.7, volume24h: '380K BOB', spread: 2.2 }
      ]
    }
  })

  useEffect(() => {
    // Simular actualizaciones de datos en tiempo real
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        rates: {
          ...prev.rates,
          clpPerUSDT: prev.rates.clpPerUSDT + (Math.random() - 0.5) * 2,
          bobParaleloPerUSDT: prev.rates.bobParaleloPerUSDT + (Math.random() - 0.5) * 0.1
        }
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return data
}

/* ────────  Main Dashboard Component  ──────── */
export default function FinancialDashboard() {
  const [clpInput, setClpInput] = useState('')
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const marketData = useMarketData()

  // Fix hydration mismatch by setting time on client side only
  useEffect(() => {
    setLastUpdate(new Date())
  }, [])

  const amountClp = cleanNumber(clpInput)
  const usdt = amountClp ? amountClp / marketData.rates.clpPerUSDT : 0
  const bobOficial = usdt * marketData.rates.bobOfficialPerUSDT
  const bobParalelo = usdt * marketData.rates.bobParaleloPerUSDT

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header Dashboard */}
        <div className="bg-white border border-gray-200 rounded-lg px-6 py-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Financiero CLP-BOB</h1>
              <p className="text-gray-600">Análisis de mercado y conversión de divisas en tiempo real</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Binance API</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{lastUpdate ? lastUpdate.toLocaleTimeString() : '--:--:--'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <KPICard
            title="Precio USDT/CLP"
            value={`$${fmt(marketData.rates.clpPerUSDT)}`}
            changePercent="+0.3%"
            icon={DollarSign}
            trend="up"
            color="green"
            subtitle="Binance P2P"
          />
          <KPICard
            title="USDT/BOB Paralelo"
            value={`Bs ${marketData.rates.bobParaleloPerUSDT.toFixed(2)}`}
            changePercent="-0.1%"
            icon={TrendingUp}
            trend="down"
            color="blue"
            subtitle="Mejor oferta"
          />
          <KPICard
            title="Volumen 24h"
            value={`$${(marketData.marketKPIs.usdtVolume24h / 1000000).toFixed(1)}M`}
            changePercent="+12.5%"
            icon={BarChart3}
            trend="up"
            color="purple"
            subtitle="USDT total"
          />
          <KPICard
            title="Órdenes Activas"
            value={marketData.marketKPIs.activeOrders.toLocaleString()}
            change="+47 hoy"
            icon={Activity}
            trend="up"
            color="yellow"
            subtitle="P2P Global"
          />
          <KPICard
            title="Spread Promedio"
            value={`${marketData.marketKPIs.avgSpread}%`}
            changePercent="-0.2%"
            icon={Target}
            trend="neutral"
            color="green"
            subtitle="Mercado CLP"
          />
          <KPICard
            title="Índice Liquidez"
            value={`${marketData.marketKPIs.liquidityIndex}%`}
            changePercent="+2.1%"
            icon={Zap}
            trend="up"
            color="blue"
            subtitle="Muy alto"
          />
        </div>

        {/* Calculator + Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Calculator */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Calculadora de Conversión
            </h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-3 gap-6 items-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 p-2 bg-white rounded-lg shadow-sm border border-gray-200 w-fit">
                      <ChileFlag size={40} />
                    </div>
                    <div className="text-sm font-semibold text-gray-700">Pesos Chilenos</div>
                    <div className="text-xs text-gray-500">CLP</div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-20"></div>
                    <input
                      type="text"
                      className="relative w-full text-center bg-white border-2 border-blue-300 rounded-lg px-4 py-4 text-xl font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 shadow-sm"
                      placeholder="Ingresa monto"
                      value={clpInput}
                      onChange={e => setClpInput(e.target.value)}
                    />
                    <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                      CLP
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 p-2 bg-white rounded-lg shadow-sm border border-gray-200 w-fit">
                      <BoliviaFlag size={40} />
                    </div>
                    <div className="text-sm font-semibold text-gray-700">Bolivianos</div>
                    <div className="text-xs text-gray-500">BOB</div>
                  </div>
                </div>
              </div>
              
              {amountClp > 0 && (
                <div className="space-y-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      <ArrowRightLeft className="w-4 h-4" />
                      Resultado de Conversión
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">USDT Equivalente:</span>
                        <span className="text-lg font-bold text-gray-900">{fmt(usdt)} USDT</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">BOB (Mercado Paralelo):</span>
                        <span className="text-lg font-bold text-green-600">{fmt(bobParalelo)} BOB</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg p-4 border border-blue-200 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">BOB (Tipo Oficial):</span>
                        <span className="text-lg font-bold text-blue-600">{fmt(bobOficial)} BOB</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <div className="text-sm font-medium text-yellow-800 mb-1">💰 Ganancia por Arbitraje</div>
                    <div className="text-lg font-bold text-green-700">
                      +{fmt(bobParalelo - bobOficial)} BOB
                    </div>
                    <div className="text-sm text-yellow-700">
                      ({((bobParalelo/bobOficial - 1) * 100).toFixed(1)}% más que el tipo oficial)
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Price Charts */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Tendencia CLP/USDT
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Últimas 8 horas</span>
                  <span className="text-sm font-medium text-green-600">+0.5%</span>
                </div>
                <MiniChart data={marketData.priceHistory.clp} color="blue" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Máximo</div>
                  <div className="font-semibold">$945</div>
                </div>
                <div>
                  <div className="text-gray-600">Mínimo</div>
                  <div className="font-semibold">$935</div>
                </div>
              </div>
            </div>
          </div>

          {/* BOB Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Tendencia BOB/USDT
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Mercado Paralelo</span>
                  <span className="text-sm font-medium text-red-600">-0.2%</span>
                </div>
                <MiniChart data={marketData.priceHistory.bob} color="green" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Paralelo</div>
                  <div className="font-semibold">Bs 16.3</div>
                </div>
                <div>
                  <div className="text-gray-600">Oficial</div>
                  <div className="font-semibold">Bs 6.97</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Tables */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <MarketTable
            title="Mercado USDT/CLP - Mejores Ofertas"
            data={marketData.offers.buyCLP}
            type="buy"
          />
          <MarketTable
            title="Mercado USDT/BOB - Mejores Ofertas"
            data={marketData.offers.sellBOB}
            type="sell"
          />
        </div>

        {/* Market Insights */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Análisis de Tendencia</h4>
                <p className="text-sm text-blue-700">
                  El mercado CLP/USDT muestra estabilidad con ligera tendencia alcista. 
                  Volumen por encima del promedio en las últimas 24h.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-green-900 mb-2">Oportunidad de Arbitraje</h4>
                <p className="text-sm text-green-700">
                  Diferencia del {((marketData.rates.bobParaleloPerUSDT/marketData.rates.bobOfficialPerUSDT - 1) * 100).toFixed(1)}% 
                  entre tipo oficial y paralelo BOB. Spread favorable para operaciones.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Globe className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Estado del Mercado</h4>
                <p className="text-sm text-purple-700">
                  Alta liquidez en ambos mercados. {marketData.marketKPIs.activeOrders.toLocaleString()} órdenes activas. 
                  Condiciones ideales para operaciones de gran volumen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
          <p>© 2025 Altius Financial Analytics • Powered by Binance API • Datos actualizados cada 5 segundos</p>
        </div>
      </div>
    </div>
  )
}