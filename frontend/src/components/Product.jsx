import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title text-center'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        {/* <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text> */}

        <Card.Text as='h3' className='text-black text-center'>
          {product.price} AED
        </Card.Text>
        <Card.Text className='text-black text-center'>
          {product.pType === 'Canvas'
            ? 'Limited Edition Canvas'
            : 'Framed Print'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
