import { getCurrentUser } from "@/actions/getCurrentUser";
import getProducts from "@/actions/getProducts";
import Container from "@/app/components/Container";
import ManageProductsClient from "./ManageProductsClient";
import NullData from "@/app/components/NullData";
export const dynamic = "force-dynamic";
const ManageProducts = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;
