import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import { useTheme } from "../../hooks/useTheme"

const ThemeToggle = ({ isExpanded }) => {
  const { resolvedTheme, tokens, changeTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    changeTheme(isDark ? "light" : "dark")
  }

  return (
    <div
      className={`flex items-center rounded-xl transition-all duration-300 ${
        isExpanded ? "justify-between gap-3 px-3 py-2" : "justify-center py-2"
      }`}
    >
      {isExpanded && <span className={`text-sm ${tokens.themeToggleLabel}`}>Tema</span>}

      <button
        type="button"
        title={!isExpanded ? (isDark ? "Cambiar a claro" : "Cambiar a oscuro") : undefined}
        aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        onClick={toggleTheme}
        className={`
          relative flex h-7 w-14 items-center rounded-full transition-all duration-300
          ${isDark ? tokens.themeSwitchTrackActive : tokens.themeSwitchTrack}
        `}
      >
        <LightModeIcon
          fontSize="inherit"
          className={`absolute left-1 text-[16px] transition-all duration-300 ${
            isDark ? `opacity-40 ${tokens.themeSwitchSunMuted}` : `opacity-100 ${tokens.themeSwitchSun}`
          }`}
        />

        <DarkModeIcon
          fontSize="inherit"
          className={`absolute right-1 text-[16px] transition-all duration-300 ${
            isDark ? `opacity-100 ${tokens.themeSwitchMoon}` : `opacity-40 ${tokens.themeSwitchMoonMuted}`
          }`}
        />

        <span
          className={`
            absolute top-1 h-5 w-5 rounded-full transition-all duration-300 ease-out
            ${isDark ? "translate-x-8" : "translate-x-1"}
            ${isDark ? tokens.themeSwitchThumbActive : tokens.themeSwitchThumb}
          `}
        />
      </button>
    </div>
  )
}

export default ThemeToggle
