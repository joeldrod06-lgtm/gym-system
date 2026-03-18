import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline"
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../../components/layout/Sidebar"
import Header from "../../../components/layout/Header"
import StatCard from "../../../components/ui/StatCard"
import { useTheme } from "../../../hooks/useTheme"

const stats = [
  { title: "Miembros activos", value: "128", icon: PeopleOutlineIcon },
  { title: "Ingresos del mes", value: "$24,500", icon: CreditCardOutlinedIcon },
  { title: "Nuevos registros", value: "32", icon: DashboardOutlinedIcon },
]

const activity = [
  "Juan Perez registro pago mensual",
  "Maria Lopez se registro en el sistema",
  "Nuevo pago procesado correctamente",
]

const DashboardPage = () => {
  const navigate = useNavigate()
  const { resolvedTheme } = useTheme()

  const handleLogout = () => {
    navigate("/")
  }

  return (
    <div className="dashboard-shell flex h-screen" data-theme={resolvedTheme}>
      <Sidebar onLogout={handleLogout} />

      <main className="flex flex-1 flex-col">
        <Header title="Dashboard" userInitials="JD" />

        <section className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </div>

          <div className="dashboard-panel rounded-xl p-6">
            <h3 className="dashboard-panel-title mb-4 text-lg">Actividad reciente</h3>

            <div className="space-y-3 text-sm dashboard-muted-text">
              {activity.map((item) => (
                <div key={item} className="dashboard-activity-item pb-2 last:border-0">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage
