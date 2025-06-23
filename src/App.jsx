import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch("https://fakestoreapi.com/products");

      const data = await response.json();

      setProducts(data);
    }
    fetchProduct();
  }, []);

  return (
    products && (
      <div className="product_grid">
        {products.map((product) => (
          <Card style={{ width: "auto" }}>
            <Card.Img
              variant="top"
              style={{ height: "350px" }}
              src={product.image}
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    )
  );
}

export default App;
