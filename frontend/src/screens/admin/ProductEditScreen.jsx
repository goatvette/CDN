import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [priceM, setPriceM] = useState(0);
  const [priceL, setPriceL] = useState(0);
  const [image, setImage] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [pType, setPType] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        pType === 'Canvas' &&
        (price !== priceM || priceM !== priceL || priceM !== priceL)
      ) {
        toast.error('Please ensure same price for Canvas accross all sizes');
      } else {
        await updateProduct({
          productId,
          name,
          price,
          priceM,
          priceL,
          pType,
          image,
          image2,
          image3,
          brand,
          category,
          description,
          countInStock,
        });
        toast.success('Product updated');
        refetch();
        navigate('/admin/productlist');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setPriceM(product.priceM);
      setPriceL(product.priceL);
      setPType(product.pType);
      setImage(product.image);
      setImage2(product.image2);
      setImage3(product.image3);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const uploadFileHandler2 = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage2(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const uploadFileHandler3 = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage3(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-black'>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label className='text-black'>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='pType'>
              <Form.Label className='text-black'> Product Type</Form.Label>
              <Form.Control
                as='select' // Set the input type to 'select' for a dropdown
                value={pType}
                onChange={(e) => setPType(e.target.value)}
              >
                <option value=''>Select Type</option>
                <option value='Canvas'>Canvas</option>
                <option value='Print'>Print</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label className='text-black'>Price (Small / A3)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='priceM'>
              <Form.Label className='text-black'>
                Price (Medium / A2)
              </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price (Medium)'
                value={priceM}
                onChange={(e) => setPriceM(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='priceL'>
              <Form.Label className='text-black'>
                Price (Large / Canvas)
              </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price(Large)'
                value={priceL}
                onChange={(e) => setPriceL(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label className='text-black'>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>
            <Form.Group controlId='image2'>
              <Form.Label className='text-black'>Second Image </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image2}
                onChange={(e) => setImage2(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler2}
                type='file'
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>
            <Form.Group controlId='image3'>
              <Form.Label className='text-black'>Third Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image3}
                onChange={(e) => setImage3(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler3}
                type='file'
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label className='text-black'>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label className='text-black'>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label className='text-black'>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

           <Form.Group controlId='description'>
              <Form.Label className='text-black'>Description (Type // to create a new para)</Form.Label>
              <Form.Control as='textarea' rows={10} placeholder='Enter description' value={description} onChange={e => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <div className='d-grid'>
              <Button
                type='submit'
                variant='primary'
                className='bg-black mt-3 mb-5'
              >
                Update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
