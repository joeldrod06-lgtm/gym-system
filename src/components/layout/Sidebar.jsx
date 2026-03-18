import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ThemeToggle from "../theme/ThemeToggle"
import { useTheme } from "../../hooks/useTheme"

const DESKTOP_BREAKPOINT = 1024
const EXPANDED_WIDTH = "280px"
const COLLAPSED_WIDTH = "92px"

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: DashboardOutlinedIcon, path: "/dashboard" },
  { id: "members", label: "Miembros", icon: PeopleOutlineIcon, path: "/members" },
]

const themeLabels = {
  light: "claro",
  dark: "oscuro",
}

const Sidebar = ({ onLogout }) => {
  const location = useLocation()
  const { resolvedTheme, tokens } = useTheme()
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= DESKTOP_BREAKPOINT : true
  )
  const [isExpanded, setIsExpanded] = useState(
    typeof window !== "undefined" ? window.innerWidth >= DESKTOP_BREAKPOINT : true
  )
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    const media = window.matchMedia(`(min-width:${DESKTOP_BREAKPOINT}px)`)

    const handler = (event) => {
      setIsDesktop(event.matches)
      setIsExpanded(event.matches)
    }

    setIsDesktop(media.matches)
    setIsExpanded(media.matches)
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [])

  const toggleSidebar = () => setIsExpanded((prev) => !prev)

  const sidebarWidth = isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH

  const handleNavigation = () => {
    if (!isDesktop) {
      setIsExpanded(false)
    }
  }

  return (
    <>
      {!isDesktop && isExpanded && (
        <div
          className={`fixed inset-0 z-30 transition-opacity duration-300 ${tokens.overlay}`}
          onClick={() => setIsExpanded(false)}
        />
      )}

      <aside
        className={`fixed lg:relative z-40 h-screen border-r transition-all duration-500 ease-out flex flex-col overflow-hidden will-change-[width,transform] ${tokens.sidebar}`}
        style={{
          width: isDesktop ? sidebarWidth : EXPANDED_WIDTH,
          transform: !isDesktop && !isExpanded ? "translateX(-100%)" : "translateX(0)",
        }}
      >
        <div className={`relative flex items-center h-20 border-b px-4 ${tokens.footerBorder}`}>
          <div className={`absolute inset-0 bg-gradient-to-b ${tokens.sidebarTopGlow}`} />

          <div className="flex items-center justify-between w-full relative">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${tokens.brandBadge}`}
                >
                  <span className="text-white font-bold text-xl">G</span>
                </div>

                {isExpanded && (
                  <span className={`font-semibold tracking-wide text-lg ${tokens.brandText}`}>
                    GYM<span className={tokens.brandAccent}>ADMIN</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={toggleSidebar}
                className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-300 ${tokens.toggleButton}`}
                aria-label={isExpanded ? "Cerrar sidebar" : "Abrir sidebar"}
              >
                {isExpanded ? <MenuIcon /> : <ChevronRightIcon />}
              </button>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-8 px-3 space-y-2 overflow-y-auto scrollbar-hide">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isHovered = hoveredItem === item.id
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleNavigation}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  relative group flex items-center rounded-xl cursor-pointer no-underline
                  transition-all duration-300 ease-out
                  ${isExpanded ? "px-4 py-3 gap-4" : "px-0 py-3 justify-center"}
                  ${isActive ? tokens.navActive : tokens.navInactive}
                `}
              >
                {isActive && (
                  <div
                    className={`absolute left-0 w-1 h-8 rounded-r-full transition-all duration-300 bg-gradient-to-b ${tokens.navIndicator}`}
                  />
                )}

                {!isExpanded && isHovered && (
                  <div
                    className={`absolute left-full ml-2 px-3 py-1.5 text-sm rounded-lg whitespace-nowrap z-50 animate-in fade-in slide-in-from-left-2 duration-200 ${tokens.tooltip}`}
                  >
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 h-2 w-2 rotate-45 border-l border-t border-inherit bg-inherit" />
                  </div>
                )}

                <Icon
                  fontSize="small"
                  className={`
                    transition-all duration-300 ease-out
                    ${isActive ? `${tokens.activeIcon} scale-110` : `${tokens.inactiveIcon} group-hover:scale-110`}
                  `}
                />

                {isExpanded && (
                  <span className="text-sm font-medium flex-1 transition-all duration-300">
                    {item.label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className={`p-3 border-t space-y-3 ${tokens.footerBorder}`}>
          <ThemeToggle isExpanded={isExpanded} />

          <button
            type="button"
            onClick={onLogout}
            className={`
              group relative flex items-center rounded-xl w-full
              transition-all duration-300 ease-out
              ${isExpanded
                ? `px-4 py-3 gap-4 ${tokens.navInactive} ${tokens.logoutHover}`
                : `px-0 py-3 justify-center ${tokens.navInactive} ${tokens.logoutHover}`}
            `}
            aria-label="Cerrar sesion"
          >
            {!isExpanded && (
              <div
                className={`absolute left-full ml-2 px-3 py-1.5 text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-0 group-hover:translate-x-1 ${tokens.tooltip}`}
              >
                Cerrar sesion
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 h-2 w-2 rotate-45 border-l border-t border-inherit bg-inherit" />
              </div>
            )}

            <LogoutOutlinedIcon
              fontSize="small"
              className={`
                transition-all duration-300 ease-out
                ${tokens.logoutIcon} group-hover:scale-110
              `}
            />

            {isExpanded && (
              <span className="text-sm font-medium flex-1 text-left transition-all duration-300">
                Cerrar sesion
              </span>
            )}
          </button>
        </div>

        <div
          className={`
            px-4 pb-4 transition-all duration-500 ease-out
            ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
          `}
        >
          <div className={`text-[10px] ${tokens.footerVersion}`}>
            Tema {themeLabels[resolvedTheme]} | v2.0.0
          </div>
        </div>
      </aside>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-0.5rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  )
}

export default Sidebar
