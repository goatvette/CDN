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

const PrintsScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />

          <section id='latest_art' className='m-3'>
            <h1 className='text-black'>Prints</h1>
            <p className='my-3 text-black'>
              Welcome to ConanDuneArt Prints, where affordability meets
              artistry. Explore our impressive collection of wall painting
              prints in A2 and A3 sizes, designed to add a touch of elegance to
              your space without breaking the bank. Whether you're seeking
              classic masterpieces, contemporary expressions, or landscapes, our
              A2 and A3 prints cater to your every artistic need.
            </p>
            <Row>
              {data.products.map((product) => {
                if (product.pType !== 'Canvas') {
                  return (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  );
                }
                return null; // Return null for products with pType === 'Canvas'
              })}
            </Row>
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ''}
            />
            {/* Features  */}
          </section>
        </>
      )}
    </>
  );
};

export default PrintsScreen;
