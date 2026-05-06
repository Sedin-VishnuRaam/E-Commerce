import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <h3>E-Commerce</h3>

      <div className="navbar-links">
        <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>
          Home
        </Link>
        <Link to="/cart" style={{ color: "#fff" }}>
          Cart
        </Link>
      </div>
    </nav>
  );
}