import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
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
      <Container className="my-4">
        <Row xs={1} md={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="h-100">
                <Card.Img
                  className="w-100"
                  variant="top"
                  src={product.image}
                  alt={`Image du produit ${product.title}`}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>{product.price}€</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    )
  );
}

export default App;
