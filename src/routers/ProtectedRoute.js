import { Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';

function ProtectedRoute({ element: Component, role, path, exact }) {
  console.log('role', role);
  return (
    <Route
      exact={exact}
      path={path}
      element={() => {
        if (role === 'admin') return Component;
        else return <NotFound />;
      }}
    />
  );
}

export default ProtectedRoute;
