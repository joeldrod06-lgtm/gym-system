import { useNavigate } from "react-router-dom"
import Sidebar from "../../../components/layout/Sidebar"
import { useTheme } from "../../../hooks/useTheme"

const MembersPage = () => {
  const navigate = useNavigate()
  const { resolvedTheme } = useTheme()

  const handleLogout = () => {
    navigate("/")
  }

  return (
    <div className="dashboard-shell flex min-h-screen" data-theme={resolvedTheme}>
      <Sidebar onLogout={handleLogout} />

      <main className="min-w-0 flex-1 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="dashboard-panel rounded-2xl p-6 sm:p-8">
          <h1 className="dashboard-title text-3xl font-bold sm:text-4xl">Hola desde Miembros</h1>
        </div>
      </main>
    </div>
  )
}

export default MembersPage
