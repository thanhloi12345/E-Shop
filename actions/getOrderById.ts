import ConvertToUSD from "@/app/utils/ConvertToUSD";
import prisma from "@/libs/prismadb";
import { Order } from "@prisma/client";

export interface IParams {
  orderId?: string;
}

export default async function getOrderById(params: IParams) {
  try {
    const { orderId } = params;

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) return null;
    const newOrder = await processOrder(order);
    return newOrder;
  } catch (error: any) {
    throw new Error(error);
  }
}

async function processOrder(order: Order) {
  const convertedAmount = await ConvertToUSD(order.amount, "USD", "VND");

  return {
    ...order,
    amount: Number(convertedAmount),
  };
}
