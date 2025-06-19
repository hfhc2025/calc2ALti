type Offer = {
    price: number
    available: number
    minLimit: number
    advertiser: string
  }
  
  export function OffersTable({ title, rows }: { title: string; rows: Offer[] }) {
    return (
      <div className="bg-white rounded-xl shadow p-4 w-full">
        <h3 className="font-semibold mb-2">{title}</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>Precio</th>
              <th>Disponible</th>
              <th>Mín. CLP/BOB</th>
              <th>Trader</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o, i) => (
              <tr key={i} className="border-b last:border-0">
                <td>{o.price.toLocaleString()}</td>
                <td>{o.available.toFixed(2)}</td>
                <td>{o.minLimit.toLocaleString()}</td>
                <td>{o.advertiser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }