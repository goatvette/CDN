import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [frame, setFrame] = useState('NA');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [activePrice, setActivePrice] = useState(0);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  // Add to DB

  const addToCartHandler = () => {
    console.log(product);
    if (product.pType.length > 0 && product.pType === 'Canvas') {
      setFrame('NA');
      if (size) {
        dispatch(addToCart({ ...product, qty, size, frame }));
        navigate('/cart');
      } else {
        toast.error('Please confirm size.');
      }
    } else {
      if (size && frame !== 'NA') {
        dispatch(addToCart({ ...product, qty, size, frame }));
        navigate('/cart');
      } else {
        toast.error('Please select size and frame.');
      }
    }
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  useEffect(() => {
    priceCalculator();
  }, [size]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const priceCalculator = () => {
    if (size) {
      if (size === 'Small') {
        const p = Number(product.price);

        setActivePrice(p);
      }
      if (size === 'Medium') {
        setActivePrice(product.priceM);
      }
      if (size === 'Large') {
        const p = Number(product.price) + 600;

        setActivePrice(product.priceL);
      }
    }
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col md={6}>
              <Row>
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  className='my-3'
                  onClick={handleShow}
                />
              </Row>
              <Row>
                <Col md={6}>
                  <Image
                    src={product.image2}
                    alt={product.name}
                    fluid
                    onClick={handleShow2}
                  />
                </Col>
                <Col md={6}>
                  <Image
                    src={product.image3}
                    alt={product.name}
                    fluid
                    onClick={handleShow3}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3 className='text-black'>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className='text-black'>
                  Price: {activePrice > 0 ? activePrice : product.price} AED
                </ListGroup.Item>
                <ListGroup.Item className='text-black'>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col className='text-black'>Price:</Col>
                      <Col>
                        <strong className='text-black'>
                          {activePrice > 0 ? activePrice : product.price} AED
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className='text-black'>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <span className='text-white bg-success p-1 rounded'>
                            In Stock
                          </span>
                        ) : (
                          <span className='text-danger'>Out of Stock</span>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Qty Select */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className='text-black'>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            className='text-black'
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  {
                    <ListGroup.Item>
                      <Row>
                        <Col className='text-black'>Size Here</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className='text-black'
                          >
                            <option className='text-black' key={0} value={''}>
                              Size
                            </option>
                            {product.pType && product.pType === 'Canvas' ? (
                              <option
                                className='text-black'
                                key={3}
                                value={'Large'}
                              >
                                Large(90*60 cm)
                              </option>
                            ) : (
                              <>
                                <option
                                  className='text-black'
                                  key={1}
                                  value={'Small'}
                                >
                                  A3(30*42 cm)
                                </option>
                                <option
                                  className='text-black'
                                  key={2}
                                  value={'Medium'}
                                >
                                  A2(42*60 cm)
                                </option>
                              </>
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  }
                  {product.pType && product.pType === 'Canvas' ? (
                    <></>
                  ) : (
                    <ListGroup.Item>
                      <Row>
                        <Col className='text-black'>Frame</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={frame}
                            onChange={(e) => setFrame(e.target.value)}
                            className='text-black'
                          >
                            <option className='text-black' key={1} value={''}>
                              Frame
                            </option>
                            <option
                              className='text-black'
                              value={'Black'}
                              key={2}
                            >
                              Black
                            </option>
                            <option
                              className='text-black'
                              value={'White'}
                              key={3}
                            >
                              White
                            </option>
                            <option
                              className='text-black'
                              value={'Wood'}
                              key={3}
                            >
                              Wood
                            </option>
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button
                        className='btn-block bg-black'
                        type='button'
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row className='review'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='my-2' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='my-2' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                        className='bg-black'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Modal show={show} onHide={handleClose} fullscreen={true}>
            <Modal.Header closeButton>
              <Modal.Title className='text-black text-center'>
                Preview
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className='m-1'
              />
            </Modal.Body>
          </Modal>
          <Modal show={show2} onHide={handleClose2} fullscreen={true}>
            <Modal.Header closeButton>
              <Modal.Title className='text-black text-center'>
                Preview
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                src={product.image2}
                alt={product.name}
                fluid
                className='m-1'
              />
            </Modal.Body>
          </Modal>
          <Modal show={show3} onHide={handleClose3} fullscreen={true}>
            <Modal.Header closeButton>
              <Modal.Title className='text-black text-center'>
                Preview
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                src={product.image3}
                alt={product.name}
                fluid
                className='m-1'
              />
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductScreen;
