import { Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import Accordion from 'react-bootstrap/Accordion';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <section className='m-5'>
            <Container className='rounded'>
              <Row>
                <Col
                  className='bg-black text-white mb-4 mb-lg-0'
                  md={6}
                  sm={12}
                >
                  <div className='p-5'>
                    <h2>Explore Our Collection</h2>
                    <p className='mb-4'>
                      Elevate your living spaces with our exquisite collection
                      of handcrafted wall paintings and art.
                    </p>
                    <a className='btn bg-white text-black' href='#latest_art'>
                      Shop Now
                    </a>
                  </div>
                </Col>
                <Col md={6} sm={12} className='px-0'>
                  <img
                    src='https://images.unsplash.com/photo-1509805225007-73e8ba4b5be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                    className='w-100'
                  />
                </Col>
              </Row>
            </Container>
          </section>
          <section className='m-5'>
            <Row>
              <Col md={6} lg={4} sm={12} className='my-3'>
                <Card>
                  <Card.Img
                    variant='top'
                    src='https://plus.unsplash.com/premium_photo-1663089993922-5d4601e1127b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaXZlcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60'
                  />
                  <Card.Body className='bg-black'>
                    <Card.Title className='text-center text-white'>
                      Free Delivery
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={4} sm={12} className='my-3'>
                <Card>
                  <Card.Img
                    variant='top'
                    src='https://images.unsplash.com/photo-1533208087231-c3618eab623c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vZGVybiUyMGFydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60'
                  />
                  <Card.Body className='bg-black'>
                    <Card.Title className='text-center text-white'>
                      Limited Edition Art
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={4} sm={12} className='my-3'>
                <Card>
                  <Card.Img
                    variant='top'
                    src='https://images.unsplash.com/photo-1553775282-20af80779df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VzdG9tZXIlMjBzdXBwb3J0fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60'
                  />
                  <Card.Body className='bg-black'>
                    <Card.Title className='text-center text-white'>
                      24*7 Customer Support
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>

          <section id='latest_art'>
            <h1 className='text-black'>Latest Art</h1>
            <Row>
              {data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ''}
            />
            {/* Features  */}
          </section>

          <section className='my-5 text-black d-none d-lg-block'>
            <Row>
              <Col>
                <div className='bg-black text-white rounded p-3 text-center'>
                  <h2>1000</h2>
                  <div>Happy Customers</div>
                </div>
              </Col>
              <Col>
                <div className='bg-black text-white rounded p-3 text-center'>
                  <h2>1500</h2>
                  <div>Art Works Sold</div>
                </div>
              </Col>
              <Col>
                <div className='bg-black text-white rounded p-3 text-center'>
                  <h2>96 %</h2>
                  <div>Average Rating</div>
                </div>
              </Col>
              <Col>
                <div className='bg-black text-white rounded p-3 text-center'>
                  <h2>1</h2>
                  <div>Artist</div>
                </div>
              </Col>
            </Row>
          </section>

          <section className='my-5'>
            <h1 className='text-black'>FAQ'S</h1>
            <Accordion flush>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>
                  <span className='text-black'>
                    {' '}
                    What types of artwork do you offer on your website?
                  </span>
                </Accordion.Header>
                <Accordion.Body className='text-black'>
                  We offer a diverse range of artwork, including paintings,
                  prints, canvas art, posters, and wall decals. Our collection
                  features various styles, from contemporary and abstract to
                  classic and traditional, ensuring there's something for every
                  taste.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>
                  <span className='text-black'>
                    {' '}
                    How can I determine the right size of artwork for my space?
                  </span>
                </Accordion.Header>
                <Accordion.Body className='text-black'>
                  Finding the right size artwork for your space is essential. We
                  provide detailed product descriptions with dimensions to help
                  you make an informed choice. Additionally, you can use our
                  virtual room visualization tool to see how the artwork will
                  look in your space before making a purchase. We have images of
                  how our paintings will look in real life
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='2'>
                <Accordion.Header>
                  <span className='text-black'>
                    {' '}
                    What materials are used in your artwork, and are they of
                    high quality?
                  </span>
                </Accordion.Header>
                <Accordion.Body className='text-black'>
                  We take pride in offering high-quality artwork. Our pieces are
                  crafted using premium materials such as archival-quality
                  canvas, professional-grade pigments, and durable frames. Each
                  artwork is designed to stand the test of time and maintain its
                  vibrant colors.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='3'>
                <Accordion.Header>
                  <span className='text-black'>
                    {' '}
                    What is your return and exchange policy?
                  </span>
                </Accordion.Header>
                <Accordion.Body className='text-black'>
                  We want you to be completely satisfied with your purchase. If
                  you receive an artwork that doesn't meet your expectations or
                  if it arrives damaged, please contact our customer support
                  team within 30 days of delivery. We will assist you with
                  returns, exchanges, or refunds, following our hassle-free
                  return policy.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </section>
        </>
      )}
    </>
  );
};

export default HomeScreen;
