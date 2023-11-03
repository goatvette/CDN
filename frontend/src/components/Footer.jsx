import { Container, Row, Col } from 'react-bootstrap';
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillFacebook,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <section className='bg-black text-white p-5'>
        <Row>
          <Col xs={12} sm={6} md={3}>
            <h5>
              <Link
                to='/about'
                className='text-white'
                style={{ textDecoration: 'none' }}
              >
                About
              </Link>
            </h5>
            <p>
              Connecting Art Lovers with Extraordinary Paintings and elevating
              spaces with Artistry. Discover & Collect Today.
            </p>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <h5>
              <Link
                to='/contact-us'
                className='text-white'
                style={{ textDecoration: 'none' }}
              >
                Customer Service
              </Link>
            </h5>
            <ul className='list-unstyled'>
              <li>
                <Link
                  to='/contact-us'
                  className='text-white'
                  style={{ textDecoration: 'none' }}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to='/contact-us'
                  className='text-white'
                  style={{ textDecoration: 'none' }}
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-white'
                  style={{ textDecoration: 'none' }}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <h5>Categories</h5>
            <ul className='list-unstyled'>
              <li>Classic</li>
              <li>Contemporary</li>
              <li>Landscapes</li>
            </ul>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <h5>Follow Us</h5>
            <ul className='list-unstyled'>
              <li>
                <a
                  href='https://www.facebook.com/people/Conan-Dune-Dubai-Art-Gallery/100087887231977/'
                  target='new'
                  className='text-white'
                  style={{ textDecoration: 'none' }}
                >
                  <AiFillFacebook className='mx-1' />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href='https://twitter.com/ConanDuneArt'
                  target='new'
                  className='text-white'
                  style={{ textDecoration: 'none' }}
                >
                  <AiOutlineTwitter className='mx-1' />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href='https://www.instagram.com/conan_dune_art/'
                  target='new'
                  className='text-white'
                  style={{ textDecoration: 'none' }}
                >
                  <AiFillInstagram className='mx-1' />
                  Instagram
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className='text-center mt-5 pt-3'>
            <p>ConanDuneArt &copy; {currentYear}</p>
          </Col>
        </Row>
      </section>
    </footer>
  );
};
export default Footer;
