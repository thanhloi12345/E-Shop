import ConvertToUSD from "@/app/utils/ConvertToUSD";
import prisma from "@/libs/prismadb";

export default async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDate: "desc",
      },
    });

    const convertedOrders = await Promise.all(
      orders.map(async (order) => {
        return {
          ...order,
          amount: Number(await ConvertToUSD(order.amount, "USD", "VND")),
        };
      })
    );
    return convertedOrders;
  } catch (error: any) {
    throw new Error(error);
  }
}
