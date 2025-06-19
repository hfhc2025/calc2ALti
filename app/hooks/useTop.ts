// hooks/useTop10.ts
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useTop10() {
  const { data, error } = useSWR('/api/p2p/top', fetcher, {
    refreshInterval: 30_000, // cada 30 segundos
  })

  return {
    offers: data as {
      buyCLP: {
        price: number
        available: number
        minLimit: number
        advertiser: string
      }[]
      sellBOB: {
        price: number
        available: number
        minLimit: number
        advertiser: string
      }[]
    } | undefined,
    error,
  }
}