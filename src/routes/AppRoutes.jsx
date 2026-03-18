import { Routes, Route } from "react-router-dom"
import HomePage from "../features/home/pages/HomePage"
import DashboardPage from "../features/dashboard/pages/DashboardPage"
import MembersPage from "../features/members/pages/MembersPage"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/members" element={<MembersPage />} />
    </Routes>
  )
}

export default AppRoutes
