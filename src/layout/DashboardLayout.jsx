import { Outlet } from "react-router-dom"
import { useState } from "react"

import Sidebar from "../components/layout/Sidebar"
import Header from "./Header"

const DashboardLayout = () => {
  const [pageTitle, setPageTitle] = useState("Dashboard")

  const handleLogout = () => {
    console.log("Cerrar sesión")
    // aquí luego va auth logout
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-neutral-950">
      
      {/* SIDEBAR */}
      <Sidebar onLogout={handleLogout} />

      {/* CONTENIDO DERECHO */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* HEADER */}
        <Header
          title={pageTitle}
          userInitials="JD"
        />

        {/* CONTENIDO DINÁMICO */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet context={{ setPageTitle }} />
        </main>

      </div>
    </div>
  )
}

export default DashboardLayout