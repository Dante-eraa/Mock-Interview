import { cn } from "@/lib/utils";

interface NavigationRoutesProps {
    isMobile?: boolean;

}

const NavigationRoutes = ({ isMobile = false }: NavigationRoutesProps) => {
    return <ul className={cn("flex items-center gap4")}>

    </ul>
}

export default NavigationRoutes