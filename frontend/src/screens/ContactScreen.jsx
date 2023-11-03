import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MapComponent from '../components/MapComponent';

const ContactScreen = (props) => {
  return (
    <>
      <Container className='text-black'>
        <Row className='mt-4'>
          <Col xs={12} md={6}>
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Feel free to reach out via phone or
              email. If you need any assistance regarding your order or have
              queries about paintings, do not hesitate.
            </p>
            <p>
              Phone: <a href='tel:+971525683833'>+971 525683833</a>
            </p>
            <p>
              Email:{' '}
              <a href='mailto:support@conandune.ae'>support@conandune.ae</a>
            </p>
            <Row className='mt-4'>
              <Col>
                <div className='d-grid'>
                  <Button
                    className='bg-black text-white'
                    href='tel:+971525683833'
                  >
                    Call Us
                  </Button>
                </div>
              </Col>
              <Col>
                <div className='d-grid'>
                  <Button
                    className='bg-black text-white'
                    href='mailto:support@conandune.ae'
                  >
                    Email Us
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>

          <Col xs={12} md={6}>
            <div className='px-3 pb-3 rounded w-100 mt-3'>
              <MapComponent />
            </div>
            {/* You can add a map or contact form here if needed */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactScreen;
