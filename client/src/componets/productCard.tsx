import { Card, Button } from 'react-bootstrap';

interface ProductCardProps {
  title: string;
  oldPrice: number;
  price: number;
  imageUrl: string;
}

function ProductCard({ title, oldPrice, price, imageUrl }: ProductCardProps) {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={title}
        className="img-fluid" 
        style={{ height: '250px', objectFit: 'cover' }} 
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <span className="text-danger me-2" style={{ textDecoration: 'line-through' }}>
            Ksh {oldPrice.toLocaleString()}
          </span>
          <span className="fw-bold text-success">Ksh {price.toLocaleString()}</span>
        </Card.Text>
        <Button className="btn btn-primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
