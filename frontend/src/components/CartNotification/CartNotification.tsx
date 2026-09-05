import { useCart } from "../../contexts/cart";

import "./CartNotification.css";

function CartNotification() {
  const { notification } = useCart();

  if (!notification) {
    return null;
  }

  return (
    <div className="cart-notification">
      <span className="notification-icon">
        ✓
      </span>

      <span>
        {notification}
      </span>
    </div>
  );
}

export default CartNotification;
