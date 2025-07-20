import type { JSX } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


interface PublicRouteProps {
    children: JSX.Element
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const token = useSelector((state: any) => state.jwt)
    if (token) {
        return <Navigate to="/" />
    }
    return children;
}

export default PublicRoute;