export function Card({ label, value }: { label: string; value: string }) {
    return (
      <div className="bg-white rounded-xl p-4 shadow">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    )
  }