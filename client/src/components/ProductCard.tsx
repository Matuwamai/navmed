import { Card, Button } from 'react-bootstrap'

interface ProductCardProps {
  title: string
  oldPrice: string
  price: string
  imageUrl: string
}

function ProductCard({ title, oldPrice, price, imageUrl }: ProductCardProps) {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img variant="top" src={imageUrl} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <span className="text-danger me-2" style={{ textDecoration: 'line-through' }}>
            {oldPrice}
          </span>
          <span className="fw-bold text-success">{price}</span>
        </Card.Text>
        <Button className="navmed-secondary">Add to Cart</Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
