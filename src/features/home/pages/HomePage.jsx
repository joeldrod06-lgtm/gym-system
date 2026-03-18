import { useState } from "react"
import bgImage from "../../../assets/gym.jpg"
import LoginForm from "../../auth/components/LoginForm"
import RegisterForm from "../../auth/components/RegisterForm"
import useLockScrollDesktop from "../../../hooks/useLockScrollDesktop"

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true)

  useLockScrollDesktop()

  return (
    <div
      className="
        relative flex min-h-screen items-start justify-center
        pt-16 pb-10
        sm:pt-20
        md:h-screen md:items-center md:overflow-hidden md:pt-0 md:pb-0
      "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-md px-6 text-center">
        <div className="mb-10">
          <h1 className="text-4xl leading-tight font-normal text-white md:text-5xl lg:text-6xl">
            <span className="block tracking-[0.15em]">GYM</span>
            <span className="mt-2 block text-2xl font-light tracking-[0.3em] text-purple-300/90 md:text-3xl lg:text-4xl">
              MANAGEMENT SYSTEM
            </span>
          </h1>

          <div className="mx-auto mt-6 h-px w-16 bg-purple-400/30" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left shadow-xl backdrop-blur-xl">
          <div className="relative min-h-[350px]">
            <div
              className={`absolute inset-0 transition-all duration-300 ${
                isLogin
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-5 opacity-0 pointer-events-none"
              }`}
            >
              <LoginForm onSwitch={() => setIsLogin(false)} />
            </div>

            <div
              className={`absolute inset-0 transition-all duration-300 ${
                !isLogin
                  ? "translate-x-0 opacity-100"
                  : "translate-x-5 opacity-0 pointer-events-none"
              }`}
            >
              <RegisterForm onSwitch={() => setIsLogin(true)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
