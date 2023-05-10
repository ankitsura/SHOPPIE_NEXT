import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { fetchProduct, fetchProducts } from "@/helpers/use-apis/product";

export default function HomePage({featuredProduct, newProducts}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts newProducts={newProducts} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const featuredProductId = '64539a54edbf6f71b646a48d';
  const featuredProduct = await fetchProduct(featuredProductId);
  const newProducts = await fetchProducts();
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct?.data)),
      newProducts: JSON.parse(JSON.stringify(newProducts?.data))
    },
  }
}