import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  console.log(cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      if (cart.paymentMethod === 'Card') {
        navigate(`/order/${res._id}/pay-online`);
      } else {
        dispatch(clearCartItems());
        navigate(`/order/${res._id}`);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  function getPriceForSize(item) {
    let itemPrice = 0;

    // Check the selected size (e.g., assuming item.size represents the selected size)
    switch (item.size) {
      case 'Small':
        itemPrice = item.price;
        break;
      case 'Medium':
        itemPrice = item.priceM;
        break;
      case 'Large':
        itemPrice = item.priceL;
        break;
      default:
        // Handle other cases or errors as needed
        break;
    }

    return `${itemPrice}`;
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='text-black'>Shipping</h2>
              <p>
                <strong>Address : </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
              <p>
                <strong>Contact Number : </strong>
                {cart.shippingAddress.phone}{' '}
              </p>
              <p>
                <strong>Email : </strong>
                {cart.shippingAddress.email}{' '}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className='text-black'>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className='text-black'>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name} - ({item.size}, {item.frame})
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {getPriceForSize(item)} AED ={' '}
                          {item.qty * getPriceForSize(item)} AED
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='text-black'>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-black'>Items</Col>
                  <Col className='text-black'>{cart.itemsPrice} AED</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-black'>Shipping</Col>
                  <Col className='bg-success text-light border-rounded text-center'>
                    FREE
                    {/* {cart.shippingPrice} AED */}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-black'>VAT</Col>
                  <Col className='text-black'>{cart.taxPrice} AED</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-black'>Total</Col>
                  <Col className='text-black'>{cart.totalPrice} AED</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <Message variant='danger'>{error.data.message}</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-grid'>
                  <Button
                    type='button'
                    className='btn-block bg-black'
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </div>

                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
