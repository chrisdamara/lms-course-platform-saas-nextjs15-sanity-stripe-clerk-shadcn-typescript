export interface ProductData {
    name: string;
    description: string | undefined;
    images: string[] | undefined;
}

export interface PriceData {
    currency: string;
    product_data: ProductData;
    unit_amount: number;
}

export interface LineItem {
    quantity: number;
    price_data: PriceData;
}