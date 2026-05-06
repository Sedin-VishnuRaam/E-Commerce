import {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteScroll from "../../hooks/useInfiniteScroll.js";
import { fetchProducts } from "./ProductSlice.js";
import useDebounce from "../../hooks/useDebounce.js";
import ProductCard from "./ProductCard.jsx";
import Navbar from "../../components/Navbar.jsx";
import SearchBar from "../../components/SearchBar.jsx";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const categories = ["All", ...new Set(items.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visible, setVisible] = useState(6);
  const loadMore = () => {
  if (visible < items.length) {
    setVisible((prev) => prev + 6);
  }
};

const loaderRef = useInfiniteScroll(loadMore);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = items.filter((product) => {
    const matchesSearch = product.title
    .toLowerCase()
    .includes(debouncedSearch.toLowerCase());

    const matchesCategory =
    selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }
  );

  return (
        <>
      <Navbar />
      <SearchBar onSearch={setSearchQuery} />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ marginBottom: "10px" }}
        >
        {categories.map((cat) => (
            <option key={cat} value={cat}>
            {cat}
            </option>
        ))}
        </select>

        <div className="filters" style={{ marginBottom: "10px" }}>
            <button onClick={() => setView("grid")}>Grid</button>
            <button onClick={() => setView("list")}>List</button>
        </div>
      {/* Products */}
<div
  style={{
    display: "grid",
    gridTemplateColumns:
      view === "grid" ? "repeat(3, 1fr)" : "1fr",
    gap: "10px",
  }}
>
  {filteredProducts.slice(0, visible).map((p) => (
    <ProductCard key={p.id} product={p} view={view} />
  ))}
</div>

{/* Infinite Scroll */}
{visible < filteredProducts.length ? (
  <div ref={loaderRef} style={{ height: "50px", textAlign: "center" }}>
    Loading more...
  </div>
) : (
  <p style={{ textAlign: "center" }}>No more products</p>
)}

      </>
  );
}