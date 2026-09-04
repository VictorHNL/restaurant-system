import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { CartProvider } from "./contexts/CartContext";

import CartNotification from "./components/CartNotification/CartNotification";

import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/OrderDetails/OrderDetails";

function App() {
  return (
    <CartProvider>

      <BrowserRouter>

        <CartNotification />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/cardapio"
            element={<Menu />}
          />

          <Route
            path="/carrinho"
            element={<Cart />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/pedidos"
            element={<Orders />}
          />

          <Route
            path="/pedidos/:id"
            element={<OrderDetails />}
          />

        </Routes>

      </BrowserRouter>

    </CartProvider>
  );
}

export default App;