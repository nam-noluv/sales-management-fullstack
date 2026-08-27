import PublicProductClient from "./features/products/components/PublicProductClient";
import { getProducts } from "../services/api";

export const metadata = {
  title: "Sales Manager",
  description: "Trang chủ hệ thống Sales Manager",
};

export default async function HomePage() {
  const data = await getProducts();

  const products = Array.isArray(data)
    ? data
    : data?.items || [];

  return <PublicProductClient initialProducts={products} />;
}