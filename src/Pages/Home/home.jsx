import React, { useState } from "react"
import bgImage from "../../assets/gym.jpg"
import Login from "../../components/login"
import Register from "../../components/Register"
import useLockScrollDesktop from "../../hooks/useLockScrollDesktop"

const Home = () => {
  const [isLogin, setIsLogin] = useState(true)

  // Bloquea scroll solo en desktop
  useLockScrollDesktop()

  return (
    <div
      className="
        min-h-screen
        md:h-screen md:overflow-hidden
        flex
        items-start md:items-center
        justify-center
        relative
        pt-16 sm:pt-20 md:pt-0
        pb-10 md:pb-0
      "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 w-full max-w-md px-6 text-center">

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight">
            <span className="block tracking-[0.15em]">GYM</span>

            <span className="block text-2xl md:text-3xl lg:text-4xl font-light text-purple-300/90 mt-2 tracking-[0.3em]">
              MANAGEMENT SYSTEM
            </span>
          </h1>

          <div className="w-16 h-px bg-purple-400/30 mx-auto mt-6"></div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-8 text-left">

          <div className="relative min-h-[350px]">
            <div
              className={`absolute inset-0 transition-all duration-300 ${
                isLogin
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-5 pointer-events-none"
              }`}
            >
              <Login onSwitch={() => setIsLogin(false)} />
            </div>

            <div
              className={`absolute inset-0 transition-all duration-300 ${
                !isLogin
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-5 pointer-events-none"
              }`}
            >
              <Register onSwitch={() => setIsLogin(true)} />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Home