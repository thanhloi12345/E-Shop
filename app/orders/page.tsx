import { getCurrentUser } from "@/actions/getCurrentUser";
import getOrders from "@/actions/getOrders";
import Container from "@/app/components/Container";
import OrdersClient from "./OrderClient";
import NullData from "@/app/components/NullData";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
export const dynamic = "force-dynamic";
const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! Access denied" />;
  }
  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No order yet..." />;
  }

  return (
    <div className="pt-8">
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
