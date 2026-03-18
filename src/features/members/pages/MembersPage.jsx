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

      <main className="flex-1 min-h-screen p-8">
        <div className="dashboard-panel rounded-2xl p-8">
          <h1 className="dashboard-title text-4xl font-bold">Hola desde Miembros</h1>
        </div>
      </main>
    </div>
  )
}

export default MembersPage
