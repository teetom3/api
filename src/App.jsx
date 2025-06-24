import { useEffect, useState } from "react";
import { Button, Card, CardFooter, Col, Container, Row } from "react-bootstrap";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(
            `Erreur HTTP: ${
              response.statusText ? response.statusText + " - " : ""
            }${response.status}`
          );
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        // Capture et stockage de l'erreur dans le state
        setError(
          "Une erreur est survenue lors de la récupération des produits."
        ); // Client
        console.error(err.message); // Développeur
      } finally {
        // Désactive l'état de chargement, qu'il y ait une erreur ou non
        setLoading(false);
      }
    }
    fetchProduct();
  }, []);

  async function createProduct() {
    try {
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
      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }
      const datas = await res.json();
      alert(`le produit avec l'id ${datas.id} a bien été ajouté`);
    } catch (err) {
      alert("Une erreur est survenue lors de l'ajout du produit'."); // Client
      console.error(err.message); // Développeur
    }
  }

  async function updateProduct(product) {
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/${product.id}`,
        {
          method: "PUT",
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
        }
      );
      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }
      const datas = await res.json();
      alert(`le produit avec l'id ${datas.id} a bien été modifié`);
    } catch (err) {
      alert("Une erreur est survenue lors de la modification du produit'."); // Client
      console.error(err.message); // Développeur
    }
  }

  async function updatePriceProduct(product) {
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: 29.99,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }
      const datas = await res.json();
      alert(`le prix du produit avec l'id ${datas.id} a bien été modifié`);
    } catch (err) {
      alert(
        "Une erreur est survenue lors de la modification du prix du produit'."
      ); // Client
      console.error(err.message); // Développeur
    }
  }

  async function deleteProduct(product) {
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/${product.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }
      const datas = await res.json();
      alert(`le produit avec l'id ${datas.id} a bien été supprimé`);
    } catch (err) {
      alert("Une erreur est survenue lors de la suppression du produit");
      console.error(err.message);
    }
  }

  // Affichage du message d'erreur si une erreur est survenue
  if (error) return <p>Erreur : {error}</p>;
  // Affichage d'un message de chargement tant que les données ne sont pas disponibles
  if (loading) return <p>Chargement...</p>;

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
                <CardFooter>
                  <Button onClick={() => updateProduct(product)}>
                    Modifier le produit complet
                  </Button>
                  <Button
                    className="my-1"
                    onClick={() => updatePriceProduct(product)}
                  >
                    Modifier le prix du produit
                  </Button>
                  <Button
                    className="my-1"
                    variant="danger"
                    onClick={() => deleteProduct(product)}
                  >
                    Supprimer le produit
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    )
  );
}

export default App;
