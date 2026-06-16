export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-2xl text-slate-500 mt-1">Welcome back, Supun! Heres your project overview.</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Active Projects', value: '12', change: '+2 this month', color: 'text-blue-600' },
          { label: 'Total Budget', value: 'Rs 45.2M', change: '85% utilized', color: 'text-emerald-600' },
          { label: 'Workers On-site', value: '248', change: 'Across 8 sites', color: 'text-orange-600' },
          { label: 'Materials Used', value: '1,240', change: 'This month', color: 'text-purple-600' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
        <p className="text-lg text-slate-400">Charts and project list coming in Part 2 🚧</p>
      </div>
    </div>
  )
}