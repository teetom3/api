import { useEffect, useState } from "react";
import { Button, Card, CardFooter, Col, Container, Row } from "react-bootstrap";
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

  async function createProduct() {
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Nouveau produit",
        price: 29.99,
        description: "Un super produit ajouté via API",
        image: "https://via.placeholder.com/150",
        category: "electronics",
      }),
    });
    const datas = await res.json();
    alert(`le produite avec l'id ${datas.id} a bien été ajouté`);
  }

  return (
    products && (
      <Container className="my-4">
        <Button onClick={createProduct}>Ajouter un produit</Button>
        <Row xs={1} md={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="h-100">
                <Card.Img
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
