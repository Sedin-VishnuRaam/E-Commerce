import { useDispatch } from "react-redux";
import { addToCart} from "../cart/cartSlice";
import { decreaseStock } from "./ProductSlice";
import { Link } from "react-router-dom";


const getStockLabel = (stock) => {
  if (stock > 5) {
    return `In Stock - ${stock} items`;
  }
  if (stock >= 2) {
    return "Few left";
  }
  if (stock === 1) {
    return "Only 1 left";
  }
  return "Unavailable";
};

export default function ProductCard({ product, view }) {
  const dispatch = useDispatch();
  return (
    
    <div
    style={{
        display: view === "list" ? "flex" : "block",
        gap: "10px",
        border: "1px solid #ccc",
        padding: "10px",
    }}
    >        
      <img src={product.image} width="100" />
      <h4>{product.title}</h4>
      <p>₹{product.price}</p>
      <p>{getStockLabel(product.stock)}</p>
      <Link to={`/product/${product.id}`}>
        <button>View Details</button>
      </Link>
      <button onClick={() => {
  dispatch(addToCart(product));
  dispatch(decreaseStock(product.id));  
} }>
        Add to Cart
      </button>
    </div>
  );
}