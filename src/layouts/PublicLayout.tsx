import Footer from "@/components/Footer"
import AuthHandler from "@/components/handlers/AuthHandler"
import Header from "@/components/Header"
import { Outlet } from "react-router-dom"

const PublicLayout = () => {
    return (
        <div className="w-full">
            <AuthHandler />
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default PublicLayout