import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useNavigate } from "react-router-dom"

const LoginForm = ({ onSwitch }) => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/dashboard")
  }

  return (
    <div className="text-white">
      <h2 className="mb-2 text-2xl font-semibold">Iniciar sesion</h2>

      <p className="mb-6 text-sm text-gray-400">
        Accede al sistema de administracion del gimnasio
      </p>

      <div className="space-y-4">
        <div className="flex items-center rounded-lg border border-white/10 bg-white/10 px-3 transition focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
          <PersonOutlineIcon className="mr-2 text-gray-400" fontSize="small" />

          <input
            type="text"
            placeholder="Usuario"
            autoComplete="username"
            inputMode="text"
            autoCapitalize="none"
            spellCheck="false"
            enterKeyHint="next"
            className="w-full bg-transparent py-3 text-base text-white outline-none"
          />
        </div>

        <div className="flex items-center rounded-lg border border-white/10 bg-white/10 px-3 transition focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
          <LockOutlinedIcon className="mr-2 text-gray-400" fontSize="small" />

          <input
            type="password"
            placeholder="Contrasena"
            autoComplete="current-password"
            inputMode="text"
            enterKeyHint="go"
            className="w-full bg-transparent py-3 text-base text-white outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="w-full rounded-lg bg-purple-600 py-3 text-base font-medium transition active:scale-[0.98] hover:bg-purple-700"
        >
          Entrar
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-400">
        No tienes cuenta?{" "}
        <button type="button" onClick={onSwitch} className="text-purple-400 hover:underline">
          Crear una cuenta
        </button>
      </p>
    </div>
  )
}

export default LoginForm
