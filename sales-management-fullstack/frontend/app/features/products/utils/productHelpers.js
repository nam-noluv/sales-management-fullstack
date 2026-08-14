export function filterProducts(products, search) {
    const term = search.toLowerCase();
    return products.filter(p =>
        p.name?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
    );
}

export function getQtyStyle(quantity) {
    if (quantity === 0) return 'qtyEmpty';
    if (quantity < 10) return 'qtyLow';
    return 'qtyOk';
}