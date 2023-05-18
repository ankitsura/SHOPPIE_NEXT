import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import axios from "axios";
import { useSelector } from "react-redux";


export default function HomePage({featuredProduct, newProducts}) {
  const cartItems = useSelector((state) => state?.user?.data?.cartItems);
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} cartItems={cartItems} />
      <NewProducts newProducts={newProducts} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const featuredProductId = '64539a54edbf6f71b646a48d';
  const featuredProduct = await axios.get(`http://localhost:5000/products/${featuredProductId}`);
  const newProducts = await axios.get('http://localhost:5000/products/featuredProducts');
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct?.data)),
      newProducts: JSON.parse(JSON.stringify(newProducts?.data))
    }
  }
}