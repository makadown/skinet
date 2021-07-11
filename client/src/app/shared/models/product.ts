/**
 * Interface that represents the backend model
 */
export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    productType: string;
    productBrand: string;
}
