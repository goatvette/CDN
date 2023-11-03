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

const CanvasScreen = () => {
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
            <h1 className='text-black'>Canvas</h1>
            <p className='my-3 text-black'>
              Discover a world of artistry, elegance, and luxury as you explore
              our collection of fine art canvases. Whether you're seeking
              classic masterpieces or contemporary expressions, we offer a
              curated selection of hand-painted canvases that capture the
              essence of Dubai's thriving art scene.Each canvas is a testament
              to our passion for art and our dedication to offering you the
              finest hand-painted pieces. Each canvas is a unique masterpiece
              that perfectly complements your space. We invite you to explore
              our collection and experience the beauty of hand-painted canvases
              in the heart of Dubai.
            </p>
            <Row>
              {data.products.map((product) => {
                if (product.pType === 'Canvas') {
                  return (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  );
                }
                return null; // Return null if the product's pType is not 'Canvas'
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

export default CanvasScreen;
