import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/home"
import Dashboard from "./Pages/Dashboard/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App