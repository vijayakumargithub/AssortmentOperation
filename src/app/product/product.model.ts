export interface Product {
    productId: number;
    productName: string;
    productType: string;
    price: number;
    imageSrc: string;
    quantity: number;
    isShippingPassEligible: boolean;
    availabilityStatus: string;
}
