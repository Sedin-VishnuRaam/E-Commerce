import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../features/products/ProductSlice";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { items, status } = useSelector(state => state.products);

  // ✅ FIXED
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, []);

  const product = items.find(p => p.id === Number(id));

  if (status === "loading") return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className = "product-details" style = {{padding: "20px"}}>
      <img 
        src = {product.image}
        alt = {product.title}
        style={{ width: "200px", height: "200px", objectFit: "contain" }} 
      />
      <h2>{product.title}</h2>
      <p>₹{product.price}</p>

      <p>
        {product.stock > 5 && `In Stock - ${product.stock} items`}
        {product.stock >= 2 && product.stock <= 5 && `Only ${product.stock} left`}
        {product.stock === 1 && "Only 1 left"}
        {product.stock === 0 && "Out of stock"}
      </p>

      {/* Quantity Controls */}
      <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
      <span>{quantity}</span>
      <button
        onClick={() =>
          setQuantity(q => (q < product.stock ? q + 1 : q))
        }
      >
        +
      </button>

      {/* Add to Cart */}
      <button
        disabled={product.stock === 0}
        onClick={() =>
          dispatch(addToCart({ ...product, quantity }))
        }
      >
        Add to Cart
      </button>
    </div>
  );
}