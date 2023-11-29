import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddProductForm from "./AddProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getProductById from "@/actions/getProductById";
export const dynamic = "force-dynamic";
interface IPrams {
  productId?: string;
}
const AddProducts = async ({ params }: { params: IPrams }) => {
  const currentUser = await getCurrentUser();
  const product = await getProductById(params);
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }
  if (!product)
    return <NullData title="Oops! Product with the given id does not exist" />;
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm product={product} id={params.productId} />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
