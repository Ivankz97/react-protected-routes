import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = ({ children, redirectTo="/", isAllowed=false }) => {
    if (!isAllowed) {
        return <Navigate to={redirectTo} />
    }

    return children ? children : <Outlet />
}

export default ProtectedRoutes