const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="dashboard-card flex items-center justify-between rounded-xl p-6 transition-all">
      <div>
        <p className="dashboard-muted-text text-sm">{title}</p>
        <h3 className="dashboard-stat-value mt-1 text-2xl font-semibold">{value}</h3>
      </div>

      <div className="dashboard-stat-icon rounded-lg p-3">
        <Icon fontSize="small" />
      </div>
    </div>
  )
}

export default StatCard
