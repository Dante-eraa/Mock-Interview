import { Outlet } from "react-router-dom"
import Bg from "../assets/img/bg.png"

const AuthLayout = () => {
    return (
        <div className="w-screen h-screen overflow-hidden flex items-center justify-center relative">
            <img src={Bg} className="absolute w-full object-cover opacity-20" alt="Background" />
            <Outlet />
        </div>
    )
}

export default AuthLayout