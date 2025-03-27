import { useAuth, UserButton } from "@clerk/clerk-react"

import { Loader } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

const ProfileContainer = () => {
    const { isLoaded, isSignedIn } = useAuth()
    if (!isLoaded) {
        return (
            <div className="flex items-center ">
                <Loader className="min-w-6 min-h-6 animate-spin text-blue-500" />
            </div >
        )
    }
    return (
        <div className="flex items-center gap-6">
            {isSignedIn ? <UserButton afterSignOutUrl="/" /> : <Link to="/signin"><Button className="bg-sky-400 hover:bg-sky-600" size={"sm"}>Get Started</Button ></Link>}
        </div >
    )
}

export default ProfileContainer