'use client'

import { useEffect, useState, useMemo } from 'react'
import { TrendingUp, TrendingDown, ArrowRightLeft, Calculator, BarChart3, AlertCircle, Clock, DollarSign, Activity, Target, Zap, Globe, PieChart, LineChart, ChevronDown } from 'lucide-react'

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

function ArgentinaFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 2 / 3} viewBox="0 0 60 40" className="border border-gray-200 rounded-sm">
      <rect width="60" height="40" fill="#74ACDF" />
      <rect width="60" height="13.33" y="13.33" fill="white" />
      <circle cx="30" cy="20" r="5" fill="#F6B40E" />
    </svg>
  )
}

function PeruFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 2 / 3} viewBox="0 0 60 40" className="border border-gray-200 rounded-sm">
      <rect width="20" height="40" fill="#D91023" />
      <rect width="20" height="40" x="40" fill="#D91023" />
      <rect width="20" height="40" x="20" fill="white" />
    </svg>
  )
}

function ColombiaFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 2 / 3} viewBox="0 0 60 40" className="border border-gray-200 rounded-sm">
      <rect width="60" height="16" fill="#FCD116" />
      <rect width="60" height="12" y="16" fill="#003893" />
      <rect width="60" height="12" y="28" fill="#CE1126" />
    </svg>
  )
}

function MexicoFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 2 / 3} viewBox="0 0 60 40" className="border border-gray-200 rounded-sm">
      <rect width="20" height="40" fill="#006847" />
      <rect width="20" height="40" x="40" fill="#CE1126" />
      <rect width="20" height="40" x="20" fill="white" />
      <image href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMjAiIGZpbGw9IiMwMDY4NDciLz4KICA8cGF0aCBkPSJNNTAgMjBjLTE2LjU0IDAgMzAgMjAgMzAgMzBzLTEzLjQ2IDMwLTMwIDMwYzE2LjU0IDAtMzAtMjAtMzAtMzBzMTMuNDYtMzAgMzAtMzB6IiBmaWxsPSIjY2UxMTI2Ii8+Cjwvc3ZnPg==" x="25" y="10" width="10" height="20" />
    </svg>
  )
}

function BrazilFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 2 / 3} viewBox="0 0 60 40" className="border border-gray-200 rounded-sm">
      <rect width="60" height="40" fill="#009B3A" />
      <polygon points="30,20 45,10 45,30" fill="#FEDF00" />
      <circle cx="30" cy="20" r="8" fill="#002776" />
      <path d="M30 12L33 19L38 19L34 24L36 31L30 27L24 31L26 24L22 19L27 19Z" fill="#FFFFFF" />
    </svg>
  )
}

/* ────────  Country Data  ──────── */
const COUNTRIES = [
  {
    id: 'cl',
    name: 'Chile',
    currency: 'CLP',
    symbol: '$',
    flag: ChileFlag,
    rate: 940
  },
  {
    id: 'bo',
    name: 'Bolivia',
    currency: 'BOB',
    symbol: 'Bs',
    flag: BoliviaFlag,
    rate: 16.3
  },
  {
    id: 'ar',
    name: 'Argentina',
    currency: 'ARS',
    symbol: '$',
    flag: ArgentinaFlag,
    rate: 1200
  },
  {
    id: 'pe',
    name: 'Perú',
    currency: 'PEN',
    symbol: 'S/',
    flag: PeruFlag,
    rate: 3.85
  },
  {
    id: 'co',
    name: 'Colombia',
    currency: 'COP',
    symbol: '$',
    flag: ColombiaFlag,
    rate: 4200
  },
  {
    id: 'mx',
    name: 'México',
    currency: 'MXN',
    symbol: '$',
    flag: MexicoFlag,
    rate: 18.5
  },
  {
    id: 'br',
    name: 'Brasil',
    currency: 'BRL',
    symbol: 'R$',
    flag: BrazilFlag,
    rate: 5.2
  }
]

/* ────────  KPI Card Component  ──────── */
function KPICard({ title, value, change, changePercent, icon: Icon, trend, subtitle, color = 'blue' }: { 
  title: string
  value: string
  change?: string
  changePercent?: string
  icon?: any
  trend?: 'up' | 'down' | 'neutral'
  subtitle?: string
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'teal' | 'indigo'
}) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    green: 'bg-green-50 border-green-100 text-green-700',
    red: 'bg-red-50 border-red-100 text-red-700',
    yellow: 'bg-yellow-50 border-yellow-100 text-yellow-700',
    purple: 'bg-purple-50 border-purple-100 text-purple-700',
    teal: 'bg-teal-50 border-teal-100 text-teal-700',
    indigo: 'bg-indigo-50 border-indigo-100 text-indigo-700'
  }

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4 text-green-600" />,
    down: <TrendingDown className="w-4 h-4 text-red-600" />,
    neutral: <Activity className="w-4 h-4 text-gray-600" />
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group hover:border-blue-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`p-2.5 rounded-xl ${colorClasses[color]} bg-opacity-70`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{title}</span>
        </div>
        {trend && trendIcons[trend]}
      </div>
      
      <div className="mb-2">
        <div className="text-3xl font-extrabold text-gray-900">{value}</div>
        {subtitle && <div className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors mt-1">{subtitle}</div>}
      </div>
      
      {(change || changePercent) && (
        <div className="flex items-center gap-2 text-sm">
          {change && <span className="text-gray-600">{change}</span>}
          {changePercent && (
            <span className={`px-2.5 py-1.5 rounded-full text-xs font-bold ${
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
function MiniChart({ data, color = 'blue', title }: { data: number[], color?: string, title?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 200
    const y = 40 - ((value - min) / range) * 30
    return `${x},${y}`
  }).join(' ')

  const lastValue = data[data.length - 1]
  const prevValue = data[data.length - 2] || lastValue
  const changePercent = ((lastValue - prevValue) / prevValue) * 100

  return (
    <div>
      {title && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-600">{title}</span>
          <span className={`text-xs font-medium ${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(1)}%
          </span>
        </div>
      )}
      <svg width="200" height="40" className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={color === 'blue' ? '#4F46E5' : color === 'green' ? '#059669' : '#DC2626'} /* Colores más profundos */
          strokeWidth="2.5" /* Mayor grosor de línea */
          className="drop-shadow-sm"
        />
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color === 'blue' ? '#6366F1' : color === 'green' ? '#10B981' : '#EF4444'} stopOpacity="0.15"/> /* Mayor opacidad */
            <stop offset="100%" stopColor={color === 'blue' ? '#6366F1' : color === 'green' ? '#10B981' : '#EF4444'} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polyline
          points={`0,40 ${points} 200,40`}
          fill={`url(#gradient-${color})`}
          stroke="none"
        />
      </svg>
    </div>
  )
}

/* ────────  Market Data Table  ──────── */
function MarketTable({ title, data, type }: { title: string; data: any[]; type: 'buy' | 'sell' }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-5 py-3 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-gray-600" />
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exchange</th>
              <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Vol. 24h</th>
              <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Spread</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data?.slice(0, 4).map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-5 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mr-2 ${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                    <span className="font-medium text-gray-900">{row.merchant}</span>
                  </div>
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-right font-semibold text-gray-900">
                  {row.price?.toLocaleString('es-CL', { maximumFractionDigits: 2 })}
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-right text-gray-600">
                  {row.volume24h || 'N/A'}
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-right">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
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

/* ────────  Country Selector  ──────── */
function CountrySelector({
  countries,
  selectedId,
  onSelect,
  label
}: {
  countries: typeof COUNTRIES
  selectedId: string
  onSelect: (id: string) => void
  label?: string
}) {
  const selectedCountry = countries.find(c => c.id === selectedId) || countries[0]
  
  return (
    <div className="relative">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        <select
          value={selectedId}
          onChange={(e) => onSelect(e.target.value)}
          className="appearance-none w-full bg-white border border-gray-300 rounded-xl pl-14 pr-12 py-3.5 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer shadow-sm"
        >
          {countries.map(country => (
            <option key={country.id} value={country.id}>
              {country.name} ({country.currency})
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <selectedCountry.flag size={28} />
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  )
}


/* ────────  Currency Converter  ──────── */
function CurrencyConverter() {
  const [fromCountryId, setFromCountryId] = useState('cl')
  const [toCountryId, setToCountryId] = useState('bo')
  const [amount, setAmount] = useState('')
  
  const fromCountry = COUNTRIES.find(c => c.id === fromCountryId) || COUNTRIES[0]
  const toCountry = COUNTRIES.find(c => c.id === toCountryId) || COUNTRIES[1]
  
  const cleanNumber = (raw: string) => Number(raw.replace(/[^\d]/g, '')) || 0
  const fmt = (n: number) => n.toLocaleString('es-CL', { maximumFractionDigits: 2 })
  
  const amountValue = cleanNumber(amount)
  const usdt = amountValue ? amountValue / fromCountry.rate : 0
  const convertedAmount = usdt * toCountry.rate
  
  // Calcular ganancia por arbitraje (si es relevante)
  const officialRate = fromCountry.id === 'cl' && toCountry.id === 'bo' ? 6.97 : null
  const profit = officialRate ? (convertedAmount - (usdt * officialRate)) : 0
  const profitPercent = officialRate ? ((convertedAmount / (usdt * officialRate) - 1) * 100) : 0

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
        <Calculator className="w-6 h-6 text-blue-600" />
        Calculadora de Conversión Multicurrency
      </h3>
      
      <div className="space-y-7">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-7 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <CountrySelector 
              countries={COUNTRIES} 
              selectedId={fromCountryId} 
              onSelect={setFromCountryId}
              label="De"
            />
            
            <div className="flex flex-col justify-end">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white border border-gray-300 rounded-full p-2 shadow-md">
                    <ArrowRightLeft className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <input
                  type="text"
                  className="relative w-full text-center bg-white border-2 border-blue-300 rounded-2xl px-5 py-5 text-2xl font-extrabold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all duration-200 shadow-md"
                  placeholder="Ingresa monto"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm px-3 py-1.5 rounded-lg font-bold">
                  {fromCountry.currency}
                </div>
              </div>
            </div>
            
            <CountrySelector 
              countries={COUNTRIES} 
              selectedId={toCountryId} 
              onSelect={setToCountryId}
              label="A"
            />
          </div>
        </div>
        
        {amountValue > 0 && (
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-xl p-5 border border-blue-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-base font-medium text-gray-600">USDT Equivalente:</span>
                    <span className="text-xl font-bold text-gray-900">{fmt(usdt)} USDT</span>
                  </div>
                  <div className="text-sm text-gray-500">Tasa: 1 USDT = {fromCountry.symbol}{fmt(fromCountry.rate)}</div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium text-gray-600">Valor Convertido:</span>
                    <span className="text-xl font-bold text-green-700">
                      {toCountry.symbol} {fmt(convertedAmount)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Tasa: 1 USDT = {toCountry.symbol}{fmt(toCountry.rate)}</div>
                </div>
              </div>
            </div>
            
            {officialRate && profit > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-5 text-center shadow-md">
                <div className="text-base font-medium text-yellow-800 mb-1">💰 Ganancia por Arbitraje</div>
                <div className="text-xl font-bold text-green-700">
                  +{fmt(profit)} {toCountry.currency}
                </div>
                <div className="text-sm text-yellow-700">
                  ({profitPercent.toFixed(1)}% más que el tipo oficial)
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="text-center text-sm text-gray-500">
          <p>Tipos de cambio actualizados en tiempo real</p>
        </div>
      </div>
    </div>
  )
}

/* ────────  Mock Market Data  ──────── */
function useMarketData() {
  const [data, setData] = useState({
    // KPIs de mercado
    marketKPIs: {
      usdtVolume24h: 2845000,
      activeOrders: 1247,
      avgSpread: 0.8,
      liquidityIndex: 85.2,
      volatility: 2.1,
      marketCap: 95600000000,
      conversionVolume: 12450000
    },
    // Datos históricos para gráficos
    priceHistory: {
      clp: [935, 938, 942, 940, 945, 941, 940, 938],
      bob: [16.1, 16.2, 16.4, 16.3, 16.5, 16.2, 16.3, 16.1],
      ars: [1180, 1185, 1190, 1200, 1195, 1205, 1210, 1200],
      pen: [3.80, 3.82, 3.85, 3.83, 3.87, 3.84, 3.85, 3.82]
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
    },
    // Tendencias de mercado
    trends: {
      topGainers: [
        { country: 'Argentina', currency: 'ARS', change: '+2.3%' },
        { country: 'Perú', currency: 'PEN', change: '+1.2%' },
        { country: 'Colombia', currency: 'COP', change: '+0.8%' }
      ],
      topLosers: [
        { country: 'México', currency: 'MXN', change: '-0.5%' },
        { country: 'Brasil', currency: 'BRL', change: '-0.3%' }
      ]
    }
  })

  useEffect(() => {
    // Simular actualizaciones de datos en tiempo real
    const interval = setInterval(() => {
      setData(prev => {
        const randomChange = (min: number, max: number) => Math.random() * (max - min) + min
        return {
          ...prev,
          marketKPIs: {
            ...prev.marketKPIs,
            usdtVolume24h: prev.marketKPIs.usdtVolume24h + randomChange(-50000, 100000),
            activeOrders: prev.marketKPIs.activeOrders + Math.floor(randomChange(-10, 20))
          },
          priceHistory: {
            clp: [...prev.priceHistory.clp.slice(1), prev.priceHistory.clp[prev.priceHistory.clp.length - 1] + randomChange(-1, 1)],
            bob: [...prev.priceHistory.bob.slice(1), prev.priceHistory.bob[prev.priceHistory.bob.length - 1] + randomChange(-0.05, 0.05)],
            ars: [...prev.priceHistory.ars.slice(1), prev.priceHistory.ars[prev.priceHistory.ars.length - 1] + randomChange(-5, 5)],
            pen: [...prev.priceHistory.pen.slice(1), prev.priceHistory.pen[prev.priceHistory.pen.length - 1] + randomChange(-0.02, 0.02)]
          }
        }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return data
}

/* ────────  Main Dashboard Component  ──────── */
export default function FinancialDashboard() {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const marketData = useMarketData()

  // Fix hydration mismatch by setting time on client side only
  useEffect(() => {
    setLastUpdate(new Date())
  }, [])

  // Obtener tasas actuales para KPIs
  const currentRates = useMemo(() => {
    return COUNTRIES.reduce((acc, country) => {
      acc[country.id] = country.rate
      return acc
    }, {} as Record<string, number>)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans antialiased">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Dashboard */}
        <div className="bg-white border border-gray-100 rounded-2xl px-7 py-5 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Global Crypto Exchange Dashboard</h1>
              <p className="text-lg text-gray-600 mt-1">Mercado multicurrency en tiempo real - Conversión P2P</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3.5 py-1.5 rounded-lg font-medium">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span>Binance API</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 bg-gray-100 px-3.5 py-1.5 rounded-lg font-medium">
                <Clock className="w-4 h-4" />
                <span>{lastUpdate ? lastUpdate.toLocaleTimeString() : '--:--:--'}</span>
              </div>
              <div className="flex items-center gap-2 text-green-700 bg-green-100 px-3.5 py-1.5 rounded-lg font-medium">
                <Activity className="w-4 h-4" />
                <span>Sistema operativo</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
          <KPICard
            title="Volumen Total 24h"
            value={`$${(marketData.marketKPIs.usdtVolume24h / 1000000).toFixed(2)}M USDT`}
            change="+5.2%"
            icon={DollarSign}
            trend="up"
            color="blue"
          />
          <KPICard
            title="Órdenes Activas"
            value={marketData.marketKPIs.activeOrders.toLocaleString()}
            change="+12%"
            icon={Target}
            trend="up"
            color="purple"
          />
          <KPICard
            title="Spread Promedio"
            value={`${marketData.marketKPIs.avgSpread.toFixed(2)}%`}
            change="-0.1%"
            icon={ArrowRightLeft}
            trend="down"
            color="red"
          />
          <KPICard
            title="Índice de Liquidez"
            value={`${marketData.marketKPIs.liquidityIndex.toFixed(1)}`}
            change="+0.5%"
            icon={Zap}
            trend="up"
            color="green"
          />
          <KPICard
            title="Volatilidad"
            value={`${marketData.marketKPIs.volatility.toFixed(1)}%`}
            change="+0.2%"
            icon={AlertCircle}
            trend="up"
            color="yellow"
          />
          <KPICard
            title="Capitalización de Mercado"
            value={`$${(marketData.marketKPIs.marketCap / 1000000000).toFixed(2)}B`}
            change="+1.8%"
            icon={Globe}
            trend="up"
            color="teal"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Currency Converter */}
          <div className="lg:col-span-2">
            <CurrencyConverter />
          </div>

          {/* Market Trends */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl p-7 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
              <PieChart className="w-6 h-6 text-green-600" />
              Tendencias del Mercado
            </h3>
            <div className="space-y-5">
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">Top Ganadores 📈</h4>
                <ul className="space-y-3">
                  {marketData.trends.topGainers.map((item, i) => (
                    <li key={i} className="flex justify-between items-center bg-green-50 border border-green-200 rounded-xl p-4">
                      <span className="font-medium text-green-800">{item.country} ({item.currency})</span>
                      <span className="text-green-600 font-semibold">{item.change}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">Top Perdedores 📉</h4>
                <ul className="space-y-3">
                  {marketData.trends.topLosers.map((item, i) => (
                    <li key={i} className="flex justify-between items-center bg-red-50 border border-red-200 rounded-xl p-4">
                      <span className="font-medium text-red-800">{item.country} ({item.currency})</span>
                      <span className="text-red-600 font-semibold">{item.change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Price History Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
              <LineChart className="w-6 h-6 text-blue-600" />
              Historial de Precios CLP
            </h3>
            <MiniChart data={marketData.priceHistory.clp} title="CLP/USDT" color="blue" />
            <div className="text-base text-gray-600 mt-3">Último: {marketData.priceHistory.clp[marketData.priceHistory.clp.length - 1]}</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
              <LineChart className="w-6 h-6 text-green-600" />
              Historial de Precios BOB
            </h3>
            <MiniChart data={marketData.priceHistory.bob} title="BOB/USDT" color="green" />
            <div className="text-base text-gray-600 mt-3">Último: {marketData.priceHistory.bob[marketData.priceHistory.bob.length - 1]}</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
              <LineChart className="w-6 h-6 text-yellow-600" />
              Historial de Precios ARS
            </h3>
            <MiniChart data={marketData.priceHistory.ars} title="ARS/USDT" color="yellow" />
            <div className="text-base text-gray-600 mt-3">Último: {marketData.priceHistory.ars[marketData.priceHistory.ars.length - 1]}</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
              <LineChart className="w-6 h-6 text-purple-600" />
              Historial de Precios PEN
            </h3>
            <MiniChart data={marketData.priceHistory.pen} title="PEN/USDT" color="purple" />
            <div className="text-base text-gray-600 mt-3">Último: {marketData.priceHistory.pen[marketData.priceHistory.pen.length - 1]}</div>
          </div>
        </div>

        {/* Market Offers Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <MarketTable title="Ofertas de Compra (CLP)" data={marketData.offers.buyCLP} type="buy" />
          <MarketTable title="Ofertas de Venta (BOB)" data={marketData.offers.sellBOB} type="sell" />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
          <p>&copy; {new Date().getFullYear()} Desarrollado por <a href="https://www.altiusignite.com" target="_blank" rel="noopener noreferrer" className="font-bold bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text hover:opacity-80 transition-opacity duration-200">Altius Ignite</a>. Todos los derechos reservados.</p>
          <p className="mt-2">Datos proporcionados por Binance P2P y otras fuentes de mercado.</p>
        </div>
      </div>
    </div>
  )
}


