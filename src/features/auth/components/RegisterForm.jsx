import { useState } from "react"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

const RegisterForm = ({ onSwitch }) => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  })

  const handleChange = (event, field) => {
    setForm((currentForm) => ({ ...currentForm, [field]: event.target.value }))
  }

  return (
    <div className="text-white">
      <h2 className="mb-2 text-2xl font-semibold">Crear cuenta</h2>

      <p className="mb-6 text-sm text-gray-400">
        Registra un nuevo usuario en el sistema
      </p>

      <div className="space-y-4">
        <div className="flex items-center rounded-lg border border-white/10 bg-white/10 px-3 transition focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
          <PersonOutlineIcon className="mr-2 text-gray-400" fontSize="small" />

          <input
            type="text"
            placeholder="Usuario"
            value={form.userName}
            onChange={(event) => handleChange(event, "userName")}
            autoComplete="username"
            inputMode="text"
            autoCapitalize="none"
            spellCheck="false"
            enterKeyHint="next"
            className="w-full bg-transparent py-3 text-base text-white outline-none"
          />
        </div>

        <div className="flex items-center rounded-lg border border-white/10 bg-white/10 px-3 transition focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
          <EmailOutlinedIcon className="mr-2 text-gray-400" fontSize="small" />

          <input
            type="email"
            placeholder="Correo electronico"
            value={form.email}
            onChange={(event) => handleChange(event, "email")}
            autoComplete="email"
            inputMode="email"
            enterKeyHint="next"
            className="w-full bg-transparent py-3 text-base text-white outline-none"
          />
        </div>

        <div className="flex items-center rounded-lg border border-white/10 bg-white/10 px-3 transition focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
          <LockOutlinedIcon className="mr-2 text-gray-400" fontSize="small" />

          <input
            type="password"
            placeholder="Contrasena"
            value={form.password}
            onChange={(event) => handleChange(event, "password")}
            autoComplete="new-password"
            inputMode="text"
            enterKeyHint="done"
            className="w-full bg-transparent py-3 text-base text-white outline-none"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-green-600 py-3 text-base font-medium transition active:scale-[0.98] hover:bg-green-700"
        >
          Registrar
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-400">
        Ya tienes cuenta?{" "}
        <button type="button" onClick={onSwitch} className="text-green-400 hover:underline">
          Iniciar sesion
        </button>
      </p>
    </div>
  )
}

export default RegisterForm
