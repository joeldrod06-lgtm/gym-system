import React from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useNavigate } from "react-router-dom"

const Login = ({ onSwitch }) => {

  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/dashboard")
  }

  return (
    <div className="text-white">

      <h2 className="text-2xl font-semibold mb-2">
        Iniciar sesión
      </h2>

      <p className="text-gray-400 text-sm mb-6">
        Accede al sistema de administración del gimnasio
      </p>

      <div className="space-y-4">

        {/* USER */}
        <div className="flex items-center border border-white/10 rounded-lg px-3 bg-white/10 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition">
          <PersonOutlineIcon className="text-gray-400 mr-2" fontSize="small" />

          <input
            type="text"
            placeholder="Usuario"
            autoComplete="username"
            inputMode="text"
            autoCapitalize="none"
            spellCheck="false"
            enterKeyHint="next"
            className="w-full py-3 bg-transparent outline-none text-white text-base"
          />
        </div>

        {/* PASSWORD */}
        <div className="flex items-center border border-white/10 rounded-lg px-3 bg-white/10 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition">
          <LockOutlinedIcon className="text-gray-400 mr-2" fontSize="small" />

          <input
            type="password"
            placeholder="Contraseña"
            autoComplete="current-password"
            inputMode="text"
            enterKeyHint="go"
            className="w-full py-3 bg-transparent outline-none text-white text-base"
          />
        </div>

        {/* BOTÓN CORRECTO */}
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg text-base font-medium transition active:scale-[0.98]"
        >
          Entrar
        </button>

      </div>

      {/* SWITCH A REGISTER */}
      <p className="text-gray-400 text-sm mt-6 text-center">
        ¿No tienes cuenta?{" "}
        <button
          onClick={onSwitch}
          className="text-purple-400 hover:underline"
        >
          Crear una cuenta
        </button>
      </p>

    </div>
  )
}

export default Login