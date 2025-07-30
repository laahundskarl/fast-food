export interface CreateProductDto {
    name: string;
    description?: string;
    value: number;
    categoryId: string;
}
