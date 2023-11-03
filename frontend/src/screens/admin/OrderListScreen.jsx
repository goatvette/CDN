import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
} from '../../slices/ordersApiSlice';
import { toast } from 'react-toastify';

const OrderListScreen = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const deliverHandler = async (paymentDone, orderId) => {
    if (paymentDone) {
      await deliverOrder(orderId);
      refetch();
    } else {
      toast.error('Update payment status first');
    }
  };

  return (
    <>
      <h1 className='text-black'>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th className='text-black'>ID</th>
              <th className='text-black'>USER</th>
              <th className='text-black'>DATE</th>
              <th className='text-black'>TOTAL</th>
              <th className='text-black'>PAID</th>
              <th className='text-black'>DELIVERED</th>
              <th className='text-black'>INFO</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice} AED</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <span>
                      <FaTimes style={{ color: 'red' }} /> |
                      <Button
                        variant='light'
                        onClick={() => deliverHandler(order.isPaid, order._id)}
                        className='btn-sm mx-2'
                      >
                        Update
                      </Button>
                    </span>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
