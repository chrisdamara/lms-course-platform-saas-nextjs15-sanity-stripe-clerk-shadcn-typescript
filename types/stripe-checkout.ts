export interface ProductData {
    name: string;
    description: string | undefined;
    image: string | undefined;
}

export interface PriceData {
    currency: string;
    product_data: ProductData;
    unit_amount_in_cents: number;
}

export interface LineItem {
    quantity: number;
    price_data: PriceData;
}