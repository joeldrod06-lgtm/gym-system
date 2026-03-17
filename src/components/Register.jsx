import React, { useState } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const Register = ({ onSwitch }) => {

  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: ''
  })

  const handleChange = (e, field) => {
    setForm({ ...form, [field]: e.target.value })
  }

  return (
    <div className="text-white">

      <h2 className="text-2xl font-semibold mb-2">
        Crear cuenta
      </h2>

      <p className="text-gray-400 text-sm mb-6">
        Registra un nuevo usuario en el sistema
      </p>

      <div className="space-y-4">

        {/* USERNAME */}
        <div className="flex items-center border border-white/10 rounded-lg px-3 bg-white/10 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition">
          <PersonOutlineIcon className="text-gray-400 mr-2" fontSize="small" />

          <input
            type="text"
            placeholder="Usuario"
            value={form.userName}
            onChange={(e) => handleChange(e, 'userName')}
            autoComplete="username"
            inputMode="text"
            autoCapitalize="none"
            spellCheck="false"
            enterKeyHint="next"
            className="
              w-full
              py-3
              bg-transparent
              outline-none
              text-white
              text-base
            "
          />
        </div>

        {/* EMAIL */}
        <div className="flex items-center border border-white/10 rounded-lg px-3 bg-white/10 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition">
          <EmailOutlinedIcon className="text-gray-400 mr-2" fontSize="small" />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={(e) => handleChange(e, 'email')}
            autoComplete="email"
            inputMode="email"
            enterKeyHint="next"
            className="
              w-full
              py-3
              bg-transparent
              outline-none
              text-white
              text-base
            "
          />
        </div>

        {/* PASSWORD */}
        <div className="flex items-center border border-white/10 rounded-lg px-3 bg-white/10 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition">
          <LockOutlinedIcon className="text-gray-400 mr-2" fontSize="small" />

          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => handleChange(e, 'password')}
            autoComplete="new-password"
            inputMode="text"
            enterKeyHint="done"
            className="
              w-full
              py-3
              bg-transparent
              outline-none
              text-white
              text-base
            "
          />
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-base font-medium transition active:scale-[0.98]">
          Registrar
        </button>

      </div>

      <p className="text-gray-400 text-sm mt-6 text-center">
        ¿Ya tienes cuenta?{" "}
        <button
          onClick={onSwitch}
          className="text-green-400 hover:underline"
        >
          Iniciar sesión
        </button>
      </p>

    </div>
  )
}

export default Register