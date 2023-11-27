import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";
export const dynamic = "force-dynamic";
interface IPrams {
  orderId?: string;
}
const Order = async ({ params }: { params: IPrams }) => {
  const order = await getOrderById(params);

  if (!order) return <NullData title="No order"></NullData>;

  return (
    <div>
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
