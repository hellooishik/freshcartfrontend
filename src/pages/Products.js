import { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then(({ data }) => setProducts(data));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Products</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <button className="btn btn-success">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
