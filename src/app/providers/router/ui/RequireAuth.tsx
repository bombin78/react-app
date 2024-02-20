import { UserRole, getUserAuthData, getUserRoles } from 'entities/User';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRole[];
}

// https://github.com/remix-run/react-router/tree/dev/examples/auth
export function RequireAuth(props: RequireAuthProps) {
    const {
        children,
        roles,
    } = props;
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            // Если roles = undefined (массив не передан),
            // то считаем, что все необходимы роли уже есть
            return true;
        }

        // Если массив ролей есть, то делаем проверку
        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRoles]);

    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }

    return children;
}
