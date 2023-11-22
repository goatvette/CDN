import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useLoginMutation, useLoginSSOMutation } from '../slices/usersApiSlice';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [loginSSO] = useLoginSSOMutation();
  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const responseMessage = (response) => {
    const res = jwt_decode(response.credential);
    if (res.email) {
      registerHandler(res.name, res.email, res.jti);
      // Check user exists in db then login
      // Else Register then login
    }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const registerHandler = async (name, email, password) => {
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      if (err.status === 409) {
        const res = await loginSSO({ email }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } else {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 className='text-black my-4'>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label className='text-black'>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label className='text-black'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className='d-grid my-3'>
          <Button
            disabled={isLoading}
            type='submit'
            variant='primary'
            className='bg-black'
          >
            Sign In
          </Button>
        </div>

        {isLoading && <Loader />}
      </Form>

      {/* <Button
        disabled={isLoading}
        type='submit'
        variant='primary'
        className='my-2'
      >
        Log in With Google
      </Button> */}

      {/*<Row className='my-3'>
        <h4 className='text-center text-black'>Or</h4>
        <div className='d-grid'>
          <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
            auto_select
            className='my-5'
          />
        </div>
      </Row>*/}

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
