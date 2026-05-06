import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty} from "./cartSlice.js";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const gst = total * 0.1;

  return (
  <div>
      <h2>Cart</h2>

      {items.map((item) => (
        <div key={item.id}>
          {item.title} x {item.quantity}

          <button onClick={() => dispatch(decreaseQty(item.id))}>
            -
          </button>

          <button onClick={() => dispatch(increaseQty(item.id))}>
            +
          </button>

          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{(total + gst).toFixed(2)}</h3>
    </div>
  );
}