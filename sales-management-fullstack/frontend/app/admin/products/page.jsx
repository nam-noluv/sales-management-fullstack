import ProductClient from "../../features/products/components/ProductClient";
import { getProducts } from "../../../services/api";

export default async function ProductsPage() {
    const data = await getProducts();

    return (
        <ProductClient
            initialProducts={data.items || []}
        />
    );
}