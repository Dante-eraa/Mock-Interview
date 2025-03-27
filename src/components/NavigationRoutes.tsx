import { MainRoutes } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface NavigationRoutesProps {
    isMobile?: boolean;

}

const NavigationRoutes = ({ isMobile = false }: NavigationRoutesProps) => {
    return <ul className={cn("flex items-center gap-4", isMobile && "items-start flex-col gap-8")}>
        {MainRoutes.map((eachRoute) => (<NavLink key={eachRoute.path} to={eachRoute.path} className={({ isActive }) => cn("text-base text-neutral-600 ", isActive && "text-neutral-900 font-semibold")}>{eachRoute.label}</NavLink>))}
    </ul >
}

export default NavigationRoutes