import { useEffect } from "react"

const useLockScrollDesktop = (breakpoint = 768) => {
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`)

    const handleChange = () => {
      document.body.style.overflow = mediaQuery.matches
        ? "hidden" // PC → bloquear scroll
        : "auto"   // móvil → permitir scroll
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      document.body.style.overflow = "auto"
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [breakpoint])
}

export default useLockScrollDesktop