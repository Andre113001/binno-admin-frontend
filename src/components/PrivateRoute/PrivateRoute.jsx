import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

function PrivateRoute({ path, element }) {
  const { authenticated } = useAuth();

  return authenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/missing" replace />
  );
}

export default PrivateRoute;