import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart } = useCart();

  return (
    <div className="container mt-5">
      <h1>Checkout</h1>
      {cart.length === 0 ? <p>Your cart is empty.</p> : cart.map((p) => <p key={p._id}>{p.name}</p>)}
      <button className="btn btn-success mt-3">Place Order</button>
    </div>
  );
}
