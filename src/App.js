import AppLayout from './components/AppLayout';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from './Context/AuthProvider';
import ProductManagementProvider from './Context/ProductManagementProvider';
import CartsProvider from './Context/CartsProvider';
import OrderProvider from './Context/OrderProvider';

function App(props) {
  return (
    <Router>
      <AuthContextProvider>
        <ProductManagementProvider>
          <CartsProvider>
            <OrderProvider>
              <AppLayout />
            </OrderProvider>
          </CartsProvider>
        </ProductManagementProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
