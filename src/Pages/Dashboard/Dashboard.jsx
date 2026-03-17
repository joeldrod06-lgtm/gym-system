import React from "react"

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline"
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined"
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-[#0b0b0f] text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white/5 border-r border-white/10 flex flex-col p-6">

        <h1 className="text-xl tracking-widest text-purple-400 mb-10">
          GYM ADMIN
        </h1>

        <nav className="space-y-2">

          <SidebarItem icon={<DashboardOutlinedIcon />} text="Dashboard" active />
          <SidebarItem icon={<PeopleOutlineIcon />} text="Miembros" />
          <SidebarItem icon={<CreditCardOutlinedIcon />} text="Pagos" />
          <SidebarItem icon={<FitnessCenterOutlinedIcon />} text="Rutinas" />
          <SidebarItem icon={<SettingsOutlinedIcon />} text="Configuración" />

        </nav>

        <div className="mt-auto text-xs text-gray-400">
          Gym Management System
        </div>

      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8">

          <h2 className="text-lg font-medium">
            Dashboard
          </h2>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-sm">
              JD
            </div>
          </div>

        </header>

        {/* CONTENT */}
        <section className="flex-1 overflow-y-auto p-8 space-y-8">

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <StatCard
              title="Miembros activos"
              value="128"
              icon={<PeopleOutlineIcon fontSize="small" />}
            />

            <StatCard
              title="Ingresos del mes"
              value="$24,500"
              icon={<CreditCardOutlinedIcon fontSize="small" />}
            />

            <StatCard
              title="Nuevos registros"
              value="32"
              icon={<DashboardOutlinedIcon fontSize="small" />}
            />

          </div>

          {/* ACTIVITY PANEL */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg mb-4">Actividad reciente</h3>

            <div className="space-y-3 text-sm text-gray-300">

              <ActivityItem text="Juan Pérez registró pago mensual" />
              <ActivityItem text="María López se registró en el sistema" />
              <ActivityItem text="Nuevo pago procesado correctamente" />

            </div>
          </div>

        </section>

      </main>
    </div>
  )
}

/* ================= COMPONENTES ================= */

const SidebarItem = ({ icon, text, active }) => (
  <div
    className={`
      flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
      ${active
        ? "bg-purple-600 text-white"
        : "text-gray-300 hover:bg-white/10"}
    `}
  >
    {icon}
    <span className="text-sm">{text}</span>
  </div>
)

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between">

    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-semibold mt-1">{value}</h3>
    </div>

    <div className="bg-purple-600/20 p-3 rounded-lg text-purple-400">
      {icon}
    </div>

  </div>
)

const ActivityItem = ({ text }) => (
  <div className="border-b border-white/5 pb-2">
    {text}
  </div>
)

export default Dashboard