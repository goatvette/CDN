import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import Dp from '../assets/dp.jpeg';
import Ab1 from '../assets/about1.jpeg';
import Ab2 from '../assets/about2.jpg';
import Ab3 from '../assets/about3.jpg';
import Ab5 from '../assets/ab5.JPG';
// import Ab4 from '../assets/about4.jpg';

const AboutScreen = () => {
  const painterInfo = {
    name: 'Conan',
    bio: 'Conan Dune is a German – Singaporean artist who has a vast knowledge of the art world having traveled to over 50 countries while also having studied in Singapore and Taiwan as well as New Zealand. Conan has now settled in Dubai where he continues his hobby of creating paintings with the hopes of capturing the beauty of the local landscapes as well as the culture surrounding it.',
    profileImage: Dp,
    galleryImages: [
      Ab1,
      Ab5,
      Ab2,
      Ab3,
      // Add more gallery images as needed
    ],
  };
  return (
    <Container className='text-black'>
      <Row className='p-4'>
        <Col xs={12} md={6} className='mt-3'>
          <Image
            src={Dp}
            alt={painterInfo.name}
            fluid
            className='w-75 rounded'
          />
        </Col>
        <Col xs={12} md={6} className='mt-3'>
          <h2 className='mb-4'>About {painterInfo.name}</h2>
          <p>{painterInfo.bio}</p>
          <p>
            Conan's extraordinary artistry has garnered the spotlight, earning
            recognition and acclaim from esteemed platforms such as LovinDubai.
            His creativity shines brightly, not only in the virtual world but
            also in the heart of Dubai, as he unveiled a captivating pop-up
            store in the bustling Global Village. In a spectacular fusion of the
            contemporary and the historic, Conan's works were prominently
            showcased in an art exhibition dedicated to capturing the essence of
            Old Dubai.
          </p>
        </Col>
      </Row>
      {/* <h2 className='mt-5 mb-3'>Gallery</h2> */}
      <Row className='mb-4'>
        {painterInfo.galleryImages.map((image, index) => (
          <Col key={index} xs={6} md={4} lg={6}>
            <Card className='m-4'>
              <Card.Img src={image} alt={`Image ${index}`} />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AboutScreen;
