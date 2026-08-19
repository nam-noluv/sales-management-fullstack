import { getProducts } from "../../../services/api";
import ProductClient from "../../features/products/components/ProductClient";

export default async function ProductsPage() {
    const products = await getProducts();

    return <ProductClient initialProducts={products} />;
}