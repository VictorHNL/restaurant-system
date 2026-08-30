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

        </Routes>

      </BrowserRouter>

    </CartProvider>
  );
}

export default App;