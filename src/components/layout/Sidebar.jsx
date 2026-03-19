import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline"
import CardMembershipIcon from "@mui/icons-material/CardMembership"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import InventoryIcon from "@mui/icons-material/Inventory"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ThemeToggle from "../theme/ThemeToggle"
import { useTheme } from "../../hooks/useTheme"

const DESKTOP_BREAKPOINT = 1024
const EXPANDED_WIDTH = "280px"
const COLLAPSED_WIDTH = "92px"

const navigationItems = [
  { 
    id: "dashboard", 
    label: "Dashboard", 
    icon: DashboardOutlinedIcon, 
    path: "/dashboard" 
  },
  { 
    id: "clientes", 
    label: "Clientes", 
    icon: PeopleOutlineIcon,
    subItems: [
      { id: "clientes-lista", label: "Lista", path: "/clientes/lista" },
      { id: "clientes-registrar", label: "Registrar", path: "/clientes/registrar" },
      { id: "clientes-inactivos", label: "Inactivos", path: "/clientes/inactivos" }
    ]
  },
  { 
    id: "membresias", 
    label: "Membresías", 
    icon: CardMembershipIcon,
    subItems: [
      { id: "membresias-planes", label: "Planes", path: "/membresias/planes" },
      { id: "membresias-activas", label: "Activas", path: "/membresias/activas" },
      { id: "membresias-vencidas", label: "Vencidas", path: "/membresias/vencidas" }
    ]
  },
  { 
    id: "finanzas", 
    label: "Finanzas", 
    icon: AttachMoneyIcon,
    subItems: [
      { id: "finanzas-caja", label: "Caja", path: "/finanzas/caja" },
      { id: "finanzas-ingresos", label: "Ingresos", path: "/finanzas/ingresos" },
      { id: "finanzas-egresos", label: "Egresos", path: "/finanzas/egresos" }
    ]
  },
  { 
    id: "asistencias", 
    label: "Asistencias", 
    icon: FitnessCenterIcon,
    subItems: [
      { id: "asistencias-checkin", label: "Check-in", path: "/asistencias/checkin" },
      { id: "asistencias-historial", label: "Historial", path: "/asistencias/historial" }
    ]
  },
  { 
    id: "ventas", 
    label: "Ventas", 
    icon: ShoppingCartIcon,
    subItems: [
      { id: "ventas-nueva", label: "Nueva venta", path: "/ventas/nueva" },
      { id: "ventas-historial", label: "Historial", path: "/ventas/historial" }
    ]
  },
  { 
    id: "inventario", 
    label: "Inventario", 
    icon: InventoryIcon,
    subItems: [
      { id: "inventario-productos", label: "Productos", path: "/inventario/productos" },
      { id: "inventario-stock", label: "Stock", path: "/inventario/stock" }
    ]
  }
]

const themeLabels = {
  light: "claro",
  dark: "oscuro",
}

const Sidebar = ({ onLogout }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { resolvedTheme, tokens } = useTheme()
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= DESKTOP_BREAKPOINT : true
  )
  const [isExpanded, setIsExpanded] = useState(
    typeof window !== "undefined" ? window.innerWidth >= DESKTOP_BREAKPOINT : true
  )
  const [hoveredItem, setHoveredItem] = useState(null)
  const [expandedMenus, setExpandedMenus] = useState({})

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

  // Inicializar menú abierto basado en la ruta actual (solo uno)
  useEffect(() => {
    const activeMenu = navigationItems.find(item => 
      item.subItems?.some(subItem => 
        location.pathname === subItem.path || location.pathname.startsWith(subItem.path)
      )
    )
    
    if (activeMenu) {
      setExpandedMenus({ [activeMenu.id]: true })
    } else {
      setExpandedMenus({})
    }
  }, [location.pathname])

  // 🧠 ACCORDION LIMPIO - Solo un menú abierto a la vez
  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) => {
      if (prev[menuId]) {
        return {}
      }
      return { [menuId]: true }
    })
  }

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev)
  }

  const handleCollapsedClick = (e, item) => {
    if (!isExpanded && isDesktop) {
      e.preventDefault()
      setIsExpanded(true)
      if (item.subItems) {
        setTimeout(() => {
          toggleMenu(item.id)
        }, 150)
      }
    }
  }

  const sidebarWidth = isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH

  const handleNavigation = () => {
    if (!isDesktop) {
      setIsExpanded(false)
    }
  }

  const isSubItemActive = (path) => location.pathname === path

  const isParentActive = (item) => {
    if (item.subItems) {
      return item.subItems.some(subItem => location.pathname === subItem.path)
    }
    return location.pathname === item.path
  }

  return (
    <>
      {!isDesktop && !isExpanded && (
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Abrir sidebar"
          className={`dashboard-mobile-sidebar-trigger flex items-center justify-center rounded-xl border ${tokens.toggleButton}`}
        >
          <MenuIcon />
        </button>
      )}

      {!isDesktop && isExpanded && (
        <div
          className={`fixed inset-0 z-30 transition-opacity duration-300 ${tokens.overlay}`}
          onClick={() => setIsExpanded(false)}
        />
      )}

      <aside
        className={`fixed lg:relative z-40 h-screen border-r transition-all duration-300 ease-out flex flex-col overflow-hidden will-change-transform ${tokens.sidebar}`}
        style={{
          width: isDesktop ? sidebarWidth : EXPANDED_WIDTH,
          transform: !isDesktop && !isExpanded ? "translateX(-100%)" : "translateX(0)",
        }}
      >
        {/* Indicador sutil de que el sidebar está colapsado */}
        {!isExpanded && isDesktop && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent pointer-events-none" />
        )}

        <div className={`relative flex items-center h-20 border-b px-4 ${tokens.footerBorder}`}>
          <div className={`absolute inset-0 bg-gradient-to-b ${tokens.sidebarTopGlow}`} />

          <div className="flex items-center justify-between w-full relative">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 ${tokens.brandBadge} ${!isExpanded ? 'scale-110' : ''}`}
                >
                  <span className="text-white font-bold text-xl">G</span>
                </div>

                {isExpanded && (
                  <span className={`font-semibold tracking-wide text-lg transition-opacity duration-300 ${tokens.brandText}`}>
                    GYM<span className={tokens.brandAccent}>ADMIN</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={toggleSidebar}
                className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-transform duration-300 hover:scale-110 ${tokens.toggleButton}`}
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
            const isActive = isParentActive(item)
            const hasSubItems = item.subItems && item.subItems.length > 0
            const isMenuExpanded = expandedMenus[item.id]

            return (
              <div key={item.id} className="space-y-1">
                {hasSubItems ? (
                  <div
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`
                      w-full relative flex items-center rounded-xl
                      transition-colors duration-300
                      ${isExpanded ? "px-4 py-3" : "px-0 py-3 justify-center"}
                      ${isActive ? tokens.navActive : tokens.navInactive}
                      ${!isExpanded && 'hover:bg-opacity-60'}
                    `}
                  >
                    {isActive && (
                      <div
                        className={`absolute left-0 w-1 h-8 rounded-r-full bg-gradient-to-b ${tokens.navIndicator}`}
                      />
                    )}

                    {!isExpanded && isHovered && (
                      <div
                        className={`absolute left-full ml-2 px-3 py-1.5 text-sm rounded-lg whitespace-nowrap z-50 animate-fadeIn ${tokens.tooltip}`}
                      >
                        {item.label}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 h-2 w-2 rotate-45 border-l border-t border-inherit bg-inherit" />
                      </div>
                    )}

                    {/* 🎯 ZONAS DE INTERACCIÓN SEPARADAS */}
                    {isExpanded ? (
                      <div className="flex items-center justify-between w-full">
                        {/* ZONA 1: CLICK EN LABEL → NAVEGA */}
                        <div
                          onClick={() => {
                            navigate(item.subItems[0].path)
                            handleNavigation()
                          }}
                          className="flex items-center gap-4 flex-1 cursor-pointer"
                        >
                          <Icon
                            fontSize="small"
                            className={`transition-opacity duration-300 ${
                              isActive ? tokens.activeIcon : `${tokens.inactiveIcon} group-hover:opacity-80`
                            }`}
                          />

                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </div>

                        {/* ZONA 2: CLICK EN FLECHA → ABRE/CIERRA */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleMenu(item.id)
                          }}
                          className="p-1 rounded-md hover:bg-opacity-60 transition-colors duration-200"
                        >
                          {isMenuExpanded ? (
                            <ExpandLessIcon fontSize="small" className={tokens.inactiveIcon} />
                          ) : (
                            <ExpandMoreIcon fontSize="small" className={tokens.inactiveIcon} />
                          )}
                        </button>
                      </div>
                    ) : (
                      /* Versión colapsada - solo icono */
                      <Icon
                        fontSize="small"
                        className={`transition-opacity duration-300 ${
                          isActive ? tokens.activeIcon : `${tokens.inactiveIcon} group-hover:opacity-80`
                        }`}
                      />
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      if (!isExpanded) {
                        handleCollapsedClick(e, item)
                      } else {
                        handleNavigation()
                      }
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`
                      relative group flex items-center rounded-xl cursor-pointer no-underline
                      transition-colors duration-300
                      ${isExpanded ? "px-4 py-3 gap-4" : "px-0 py-3 justify-center"}
                      ${isActive ? tokens.navActive : tokens.navInactive}
                      ${!isExpanded && 'hover:bg-opacity-60'}
                    `}
                  >
                    {isActive && (
                      <div
                        className={`absolute left-0 w-1 h-8 rounded-r-full bg-gradient-to-b ${tokens.navIndicator}`}
                      />
                    )}

                    {!isExpanded && isHovered && (
                      <div
                        className={`absolute left-full ml-2 px-3 py-1.5 text-sm rounded-lg whitespace-nowrap z-50 animate-fadeIn ${tokens.tooltip}`}
                      >
                        {item.label}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 h-2 w-2 rotate-45 border-l border-t border-inherit bg-inherit" />
                      </div>
                    )}

                    <Icon
                      fontSize="small"
                      className={`
                        transition-opacity duration-300
                        ${isActive ? tokens.activeIcon : `${tokens.inactiveIcon} group-hover:opacity-80`}
                      `}
                    />

                    {isExpanded && (
                      <span className="text-sm font-medium flex-1">
                        {item.label}
                      </span>
                    )}
                  </Link>
                )}

                {/* Submenús - Estilo minimalista tipo Notion/Linear */}
                {hasSubItems && isExpanded && isMenuExpanded && (
                  <div className="ml-6 space-y-1 overflow-hidden">
                    {item.subItems.map((subItem) => {
                      const isSubActive = isSubItemActive(subItem.path)
                      
                      return (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          onClick={handleNavigation}
                          className={`
                            flex items-center rounded-lg cursor-pointer no-underline
                            transition-colors duration-200 py-2.5 px-4 gap-3
                            ${isSubActive 
                              ? `${tokens.navActive} font-medium` 
                              : `${tokens.navInactive} hover:bg-opacity-60`
                            }
                          `}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                            isSubActive ? tokens.activeIcon : tokens.inactiveIcon
                          }`} />
                          
                          <span className={`text-sm transition-colors duration-200 ${
                            isSubActive ? "font-medium" : ""
                          }`}>
                            {subItem.label}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
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
              transition-colors duration-300
              ${isExpanded
                ? `px-4 py-3 gap-4 ${tokens.navInactive} ${tokens.logoutHover}`
                : `px-0 py-3 justify-center ${tokens.navInactive} ${tokens.logoutHover}`}
              ${!isExpanded && 'hover:bg-opacity-60'}
            `}
            aria-label="Cerrar sesion"
          >
            {!isExpanded && (
              <div
                className={`absolute left-full ml-2 px-3 py-1.5 text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${tokens.tooltip}`}
              >
                Cerrar sesion
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 h-2 w-2 rotate-45 border-l border-t border-inherit bg-inherit" />
              </div>
            )}

            <LogoutOutlinedIcon
              fontSize="small"
              className={`
                transition-opacity duration-300
                ${tokens.logoutIcon} group-hover:opacity-80
              `}
            />

            {isExpanded && (
              <span className="text-sm font-medium flex-1 text-left">
                Cerrar sesion
              </span>
            )}
          </button>
        </div>

        <div
          className={`
            px-4 pb-4 transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}
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

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  )
}

export default Sidebar