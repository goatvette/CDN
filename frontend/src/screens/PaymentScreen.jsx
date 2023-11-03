import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('Card');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className='text-black'>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend' className='text-black'>
            Select Method
          </Form.Label>
          <Col>
            {/* <Form.Check
              className='my-2'
              type='radio'
              label='Credit Card/Debit Card'
              id='Card'
              name='paymentMethod'
              value='Card'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
            <Form.Check
              className='my-2'
              type='radio'
              label='Cash on Delivery'
              id='Cash'
              name='paymentMethod'
              value='Cash'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <div className='d-grid'>
          <Button type='submit' variant='primary' className='bg-black my-3  '>
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
